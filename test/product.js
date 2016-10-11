var async = require('async-chainable');
var asyncCartesian = require('..');
var expect = require('chai').expect;

describe('asyncChainableCartesian.product(set1, set2)', function() {

	var vals = [];
	var length;

	before(function(done) {
		var a = ['foo', 'bar', 'baz'];
		var b = ['alpha', 'beta', 'gamma'];

		async()
			.use(asyncCartesian)
			.product([a, b], function(next, value, index, max) {
				if (length === undefined) length = max;
				vals.push({v: value, i: index, m: max});
				next();
			})

			.end(done);
	});

	it('should have calculated the length correctly', function() {
		expect(length).to.be.equal(9);
	});

	it('should have calculated the product correctly', function() {
		expect(vals).to.deep.equal([
			{v: ['foo', 'alpha'], i: 0, m: 9},
			{v: ['foo', 'beta'], i: 1, m: 9},
			{v: ['foo', 'gamma'], i: 2, m: 9},
			{v: ['bar', 'alpha'], i: 3, m: 9},
			{v: ['bar', 'beta'], i: 4, m: 9},
			{v: ['bar', 'gamma'], i: 5, m: 9},
			{v: ['baz', 'alpha'], i: 6, m: 9},
			{v: ['baz', 'beta'], i: 7, m: 9},
			{v: ['baz', 'gamma'], i: 8, m: 9},
		]);
	});
});
