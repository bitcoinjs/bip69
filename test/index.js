var test = require('tape').test
var bip69 = require('../')
var fixtures = require('./fixtures')

// returns index-based order of sorted against original
function getIndexOrder (original, sorted) {
  return sorted.map(function (value) {
    return original.indexOf(value)
  })
}

fixtures.inputs.forEach(function (f) {
  test('sortInputs: is ' + f.description, function (t) {
    var actual = bip69.sortInputs(f.inputs)
    t.same(getIndexOrder(f.inputs, actual), f.expected)
    t.end()
  })
})

fixtures.outputs.forEach(function (f) {
  test('sortOutputs: is ' + f.description, function (t) {
    var outputs = f.outputs.map(function (fo) {
      return {
        script: new Buffer(fo.script),
        value: fo.value
      }
    })
    var actual = bip69.sortOutputs(outputs)
    t.same(getIndexOrder(outputs, actual), f.expected)
    t.end()
  })
})
