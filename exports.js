module.exports = function (inputComparator, outputComparator) {
  return {
    sortInputs: function (inputs) {
      return inputs.concat().sort(inputComparator)
    },
    sortOutputs: function (outputs) {
      return outputs.concat().sort(outputComparator)
    }
  }
}
