# bip69

[![TRAVIS](https://secure.travis-ci.org/bitcoinjs/bip69.png)](http://travis-ci.org/dcousens/bip69)
[![NPM](http://img.shields.io/npm/v/bip69.svg)](https://www.npmjs.org/package/bip69)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Lexicographical Indexing of Transaction Inputs and Outputs.

See [BIP69](https://github.com/kristovatlas/bips/blob/master/bip-0069.mediawiki) (draft PR).
~~See [BIP69](https://github.com/bitcoin/bips/blob/master/bip-0069.mediawiki).~~


## Example

``` javascript
var bitcoinjs = require('bitcoinjs-lib')
var bip69 = require('bip69')

var inputs = [{
	"txId": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
	"vout": 0
}, ...]
var outputs = [{
	"script": new Buffer("76a9145be32612930b8323add2212a4ec03c1562084f8488ac", "hex"),
	"value": 40000000000
}, ...]

// ...

var sorted = bip69(inputs, outputs)
var txb = new bitcoinjs.TransactionBuilder()

sorted.inputs.forEach(function (input) {
	txb.addInput(input.txId, input.vout)
})

sorted.outputs.forEach(function (output) {
	txb.addOutput(bitcoinjs.Script.fromBuffer(output.script), output.value)
})

// ... and so on
```

## LICENSE [MIT](LICENSE)
