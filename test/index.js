/* global describe, it */

var assert = require('assert')
var bip69 = require('../')
var fixtures = require('./fixtures')

describe('bip69', function () {
  fixtures.forEach(function (f) {
    it('returns ' + f.expected + ' for ' + f.arguments, function () {
      var actual = bip69.apply(null, f.arguments)

      assert.strictEqual(actual, f.expected)
    })
  })
})
