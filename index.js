module.exports = function() {

	/**
	* Take a number of arrays and execute a callback on all possible permutations
	* @param {Array} sets At least two arrays to calculation permutations on
	* @param {function} callback The callback to execute on each permutations with the values (setValues, index, maxItems)
	* @return {Object} This chainable object
	* Credit to http://phrogz.net/lazy-cartesian-product for making this so easy to understand
	*/
	this.product = function() {
		var sets = arguments[0];
		var maxLength = 1;
		var l;
		var dm = [];
		for (var i = sets.length; i--; maxLength *= l){
			dm[i] = [maxLength, l = sets[i].length];
		}

		this._struct.push({
			type: 'forEachRange',
			min: 0,
			max: maxLength - 1,
			callback: arguments[1],
			translate: function(v, n, max) {

				for (var c = [], i = sets.length; i--;) {
					c[i] = sets[i][(n / dm[i][0] << 0) % dm[i][1]];
				}

				return c;
			},
		});

		return this;
	};


	/**
	* Take a single array and execute a callback on all possible permutations
	* Unlike `product()` this function assumes that the result is symmetric allowing it to make optimizations to reduce the overall number of loops required
	* @param {Array|string} set The set to calculate the comparisons of. If this is a string the set is taken from the context
	* @param {function} callback The callback to execute on each permutations with the values (item, index, maxItems)
	* @return {Object} This chainable object
	*/
	this.compare = function() {
		this._struct.push({
			type: 'compare',
			set: arguments[0],
			callback: arguments[1],
		});

		return this;
	};

	this._plugins['compare'] = function(params) {
		var parentAsync = this;
		var set = (typeof params.set == 'string') ? parentAsync._context[params.set] : params.set;

		var maxLength = set.reduce(function(total, s, i) {
			return total + set.length - i - 1;
		}, 0);

		var a = 0;
		var b = 0;

		this.runWhile(function(next, index) {
			// Increment iterators
			if (index >= maxLength) {
				return parentAsync._execute();
			} else if (++b > set.length - 1) {
				a++;
				b = a + 1;
			}

			params.callback.call(this._context, function(err) {
				if (err) return next(err);
				next(null, true); // Have to return true to keep iterating
			}, [set[a], set[b]], index, maxLength);
		}, parentAsync._options.limit, parentAsync._execute);

		return this;
	};
};
