var bufferCompare = Buffer.compare || require('buffer-compare')

// Previous transaction hashes (in reversed byte-order) are to be sorted in ascending order, lexicographically.
// In the event of two matching transaction hashes, the respective previous output indices will be compared by their integer value, in ascending order.
// If the previous output indices match, the inputs are considered equal.
function inputComparator (a, b) {
  return bufferCompare(a.prevTxId, b.prevTxId) || a.outputIndex - b.outputIndex
}

// Transaction output amounts (as 64-bit unsigned integers) are to be sorted in ascending order.
// In the event of two matching output amounts, the respective output scriptPubKeys (as a byte-array) will be compared lexicographically, in ascending order.
// If the scriptPubKeys match, the outputs are considered equal.
function outputComparator (a, b) {
  return a.satoshis - b.satoshis || bufferCompare(a.script.toBuffer(), b.script.toBuffer())
}

module.exports = require('./exports')(inputComparator, outputComparator)
