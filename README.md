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

See [the test kit](test/product.js) for more examples.


compare(set, callback)
----------------------
Execute a callback for all permutations of items within one set.
Unlike `product()` this function assumes that the result is symmetric - i.e. comparing `set[0]` to `set[1]` would return the same result as comparing `set[1]` to `set[0]`. This allows the function to optimize and make fewer loops than `product()` as the number of comparisons decreases for each item rather than remaining linear as with `product()`.


```javascript
asyncChainable()
	.use(asyncChainableCartesian)

	.set('set', ['foo', 'bar', 'baz'])
	.compare('set', function(next, value, index, max) {
		// Will output for values [foo,bar], [foo,baz], [bar,baz]
		console.log('Comparison', index + '/' + max, value[0], value[1]);
		next();
	})

	.end();
```


See [the test kit](test/compare.js) for more examples.
