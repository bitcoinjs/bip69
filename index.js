function inputComparator (a, b) {
  var aa = new Buffer(a.txId, 'hex')
  var bb = new Buffer(b.txId, 'hex')
  Array.prototype.reverse.call(aa)
  Array.prototype.reverse.call(bb)

  return aa.compare(bb) || a.vout - b.vout
}

function outputComparator (a, b) {
  return a.value - b.value
}

function sortInputs (inputs) {
  return inputs.concat().sort(inputComparator)
}

function sortOutputs (outputs) {
  return outputs.concat().sort(outputComparator)
}

module.exports = function bip69 (inputs, outputs) {
  return {
    inputs: sortInputs(inputs),
    outputs: sortOutputs(outputs)
  }
}

module.exports.sortInputs = sortInputs
module.exports.sortOutputs = sortOutputs
