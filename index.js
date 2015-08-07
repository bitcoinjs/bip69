function inputComparator (a, b) {
  return a.txId.localeCompare(b.txId) || a.vout - b.vout
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
