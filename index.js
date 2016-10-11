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
	* @param {Array} set The set to calculate the comparisons of
	* @param {function} callback The callback to execute on each permutations with the values (item, index, maxItems)
	* @return {Object} This chainable object
	*/
	this.compare = function() {
		var set = arguments[0];
		var maxLength = set.reduce(function(total, s, i) {
			return total + set.length - i - 1;
		}, 0);

		var a = 0;
		var b = 0;

		this._struct.push({
			type: 'forEachRange',
			min: 0,
			max: maxLength - 1,
			callback: arguments[1],
			translate: function(v, i) {
				// Increment iterators
				if (++b > set.length - 1) {
					a++;
					b = a + 1;
				}

				return [set[a], set[b]];
			},
		});

		return this;
	};
};
