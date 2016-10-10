// Credit to http://phrogz.net/lazy-cartesian-product for making this so easy to understand

module.exports = function() {
	this.product = function() {
		var sets = arguments[0];
		var maxLength;
		for (var dm=[], maxLength=1 ,l ,i = sets.length; i--; maxLength *= l){
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
};
