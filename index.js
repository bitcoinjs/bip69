function inputComparator (a, b) {
  return a.txId.localeCompare(b.txId) || a.vout - b.vout
}

function outputComparator (a, b) {
  return a.value - b.value || a.script.compare(b.script)
}

function sortInputs (inputs) {
  return inputs.concat().sort(inputComparator)
}

function sortOutputs (outputs) {
  return outputs.concat().sort(outputComparator)
}

module.exports = {
  sortInputs: sortInputs,
  sortOutputs: sortOutputs
}
