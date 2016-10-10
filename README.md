async-chainable-cartesian
=========================
Plugin for [async-chainable](https://github.com/hash-bang/async-chainable) to provide Cartesian iteration (all combinations of multiple arrays).


```javascript
var asyncChainable = require('async-chainable');
var asyncChainableCartesian = require('async-chainable-cartesian');

asyncChainable()
	.use(asyncChainableCartesian)

	.set('a', ['foo', 'bar', 'baz'])
	.set('b', ['alpha', 'beta', 'gamma'])

	.product([a, b], function(next, value, index, max) {
		console.log('Product', index + '/' + max, '=', value);
		next();
	})

	.end();
```
