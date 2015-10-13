/* global describe, it */

var assert = require('assert')
var fixtures = require('./fixtures')

// returns index-based order of sorted against original
function getIndexOrder (original, sorted) {
  return sorted.map(function (value) {
    return original.indexOf(value)
  })
}

describe('bip69', function () {
  function runTests (bip69, fixtures) {
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
          var actual = bip69.sortOutputs(f.outputs)
          assert.deepEqual(getIndexOrder(f.outputs, actual), f.expected)
        })
      })
    })
  }

  describe('bitcoinjs', function () {
    var bitcoinjsFixtures = {
      inputs: fixtures.inputs,
      outputs: fixtures.outputs.map(function (fixture) {
        return {
          description: fixture.description,
          outputs: fixture.outputs.map(function (output) {
            return {
              value: output.value,
              script: new Buffer(output.script)
            }
          }),
          expected: fixture.expected
        }
      })
    }

    runTests(require('../bitcoinjs'), bitcoinjsFixtures)
  })

  describe('bitcore', function () {
    var bitcoreFixtures = {
      inputs: fixtures.inputs.map(function (fixture) {
        return {
          description: fixture.description,
          inputs: fixture.inputs.map(function (input) {
            return {
              prevTxId: new Buffer(input.txId, 'hex'),
              outputIndex: input.vout
            }
          }),
          expected: fixture.expected
        }
      }),
      outputs: fixtures.outputs.map(function (fixture) {
        return {
          description: fixture.description,
          outputs: fixture.outputs.map(function (output) {
            return {
              satoshis: output.value,
              script: {
                toBuffer: function () {
                  return new Buffer(output.script)
                }
              }
            }
          }),
          expected: fixture.expected
        }
      })
    }

    runTests(require('../bitcore'), bitcoreFixtures)
  })
})
