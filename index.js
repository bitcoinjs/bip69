var Buffer = require('safe-buffer').Buffer

// Previous transaction hashes (in reversed byte-order) are to be sorted in ascending order, lexicographically.
// In the event of two matching transaction hashes, the respective previous output indices will be compared by their integer value, in ascending order.
// If the previous output indices match, the inputs are considered equal.
function inputComparator (aHash, aVout, bHash, bVout) {
  if (typeof aVout !== 'number' || typeof bVout !== 'number') throw new TypeError('Expected vouts of type Number')
  if (typeof aHash === 'string' && typeof bHash === 'string') {
    return aHash.localeCompare(bHash) || aVout - bVout
  }

  if (!Buffer.isBuffer(aHash) ||
      !Buffer.isBuffer(bHash)) throw new TypeError('Expected hashes of type Buffer')

  var aHashR = [].reverse.call(Buffer.from(aHash))
  var bHashR = [].reverse.call(Buffer.from(bHash))
  return aHashR.compare(bHashR) || aVout - bVout
}

// Transaction output amounts (as 64-bit unsigned integers) are to be sorted in ascending order.
// In the event of two matching output amounts, the respective output scriptPubKeys (as a byte-array) will be compared lexicographically, in ascending order.
// If the scriptPubKeys match, the outputs are considered equal.
function outputComparator (aScript, aValue, bScript, bValue) {
  if (typeof aValue !== 'number' || typeof bValue !== 'number') throw new TypeError('Expected values of type Number')
  return aValue - bValue || aScript.compare(bScript)
}

function sortInputs (inputs) {
  return inputs.concat().sort(function (a, b) {
    return inputComparator(a.txId, a.vout, b.txId, b.vout)
  })
}

function sortOutputs (outputs) {
  return outputs.concat().sort(function (a, b) {
    return outputComparator(a.script, a.value, b.script, b.value)
  })
}

module.exports = {
  inputComparator: inputComparator,
  outputComparator: outputComparator,

  sortInputs: sortInputs,
  sortOutputs: sortOutputs
}
