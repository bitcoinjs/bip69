var bip69 = require('../')
var fixtures = require('./fixtures')
var test = require('tape')

function augment (array) {
  return array.map(function (x, i) {
    return Object.assign({}, x, { i })
  })
}

function fInputs (inputs) {
  return inputs.map(function (x) {
    return Object.assign({}, x, {
      txId: [].reverse.call(new Buffer(x.txId, 'hex'))
    })
  })
}

function fOutputs (outputs) {
  return outputs.map(function (x) {
    return Object.assign({}, x, {
      script: new Buffer(x.script, 'hex')
    })
  })
}

fixtures.inputs.forEach(function (f) {
  test('sortInputs ' + f.description, function (t) {
    t.plan(1)

    var inputs = augment(f.inputs)
    var actual = bip69.sortInputs(inputs)

    t.same(actual.map(function (x) { return x.i }), f.expected)
  })

  test('sortInputs (w/ txHash Buffers) ' + f.description, function (t) {
    t.plan(1)

    var inputs = augment(fInputs(f.inputs))
    var actual = bip69.sortInputs(inputs)

    t.same(actual.map(function (x) { return x.i }), f.expected)
  })
})

fixtures.outputs.forEach(function (f) {
  test('sortOutputs ' + f.description, function (t) {
    t.plan(1)

    var outputs = augment(fOutputs(f.outputs))
    var actual = bip69.sortOutputs(outputs)

    t.same(actual.map(function (x) { return x.i }), f.expected)
  })
})
