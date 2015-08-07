/* global describe, it */

var assert = require('assert')
var bip69 = require('../')
var fixtures = require('./fixtures')

// returns index-based order of sorted against original
function getIndexOrder (original, sorted) {
  return sorted.map(function (value) {
    return original.indexOf(value)
  })
}

describe('bip69', function () {
  describe('sortInputs', function () {
    fixtures.inputs.forEach(function (f) {
      it('is ' + f.description, function () {
        var actual = bip69.sortInputs(f.inputs)

        assert.deepEqual(getIndexOrder(f.inputs, actual), f.expected)
      })
    })
  })

  describe('sortOutputs', function () {
    fixtures.outputs.forEach(function (f) {
      it('is ' + f.description, function () {
        var outputs = f.outputs.map(function (fo) {
          return {
            script: new Buffer(fo.script),
            value: fo.value
          }
        })
        var actual = bip69.sortOutputs(outputs)

        assert.deepEqual(getIndexOrder(outputs, actual), f.expected)
      })
    })
  })
})
