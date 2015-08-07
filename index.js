function sortInputs (inputs) {
  return inputs.sort()
}

function sortOutputs (outputs) {
  return outputs.sort()
}

module.exports = function bip69 (inputs, outputs) {
  return {
    inputs: sortInputs(inputs),
    outputs: sortOutputs(outputs)
  }
}

module.exports.sortInputs = sortInputs
module.exports.sortOutputs = sortOutputs
