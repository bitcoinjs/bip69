var bip69 = require('../')
var fixtures = require('./fixtures')
var test = require('tape')

function augment (array) {
  return array.map((x, i) => Object.assign({}, x, { i }))
}

function fInputs (inputs) {
  return inputs.map(x => Object.assign({}, x, {
    txId: [].reverse.call(new Buffer(x.txId, 'hex'))
  }))
}

function fOutputs (outputs) {
  return outputs.map(x => Object.assign({}, x, {
    script: new Buffer(x.script, 'hex')
  }))
}

fixtures.inputs.forEach((f) => {
  test('sortInputs ' + f.description, (t) => {
    t.plan(1)

    var inputs = augment(f.inputs)
    var actual = bip69.sortInputs(inputs)

    t.same(actual.map(x => x.i), f.expected)
  })

  test('sortInputs (w/ txHash Buffers) ' + f.description, (t) => {
    t.plan(1)

    var inputs = augment(fInputs(f.inputs))
    var actual = bip69.sortInputs(inputs)

    t.same(actual.map(x => x.i), f.expected)
  })
})

fixtures.outputs.forEach((f) => {
  test('sortOutputs ' + f.description, (t) => {
    t.plan(1)

    var outputs = augment(fOutputs(f.outputs))
    var actual = bip69.sortOutputs(outputs)

    t.same(actual.map(x => x.i), f.expected)
  })
})
