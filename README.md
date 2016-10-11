async-chainable-cartesian
=========================
Plugin for [async-chainable](https://github.com/hash-bang/async-chainable) to provide Cartesian iteration (all combinations of multiple arrays).


API
===

product([sets...], callback)
----------------------------
Execute a callback for all permutations of sets.


```javascript
var asyncChainable = require('async-chainable');
var asyncChainableCartesian = require('async-chainable-cartesian');

var a = ['foo', 'bar', 'baz'];
var b = ['alpha', 'beta', 'gamma'];

asyncChainable()
	.use(asyncChainableCartesian)

	.product([a, b], function(next, value, index, max) {
		console.log('Product', index + '/' + max, '=', value);
		next();
	})

	.end();
```
