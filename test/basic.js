var async = require('async-chainable');
var expect = require('chai').expect;

describe('Basic test', function() {

	var vals = [];
	var length;

	before(function(done) {
		async()
			.set('a', ['foo', 'bar', 'baz'])
			.set('b', ['alpha', 'beta', 'gamma'])

			.product([a, b], function(next, value, index, max) {
				if (length === undefined) length = max;
				vals.push({value: value, index: index, max: max});
				next();
			})

			.end();
	});

	it('should have calculated the length correctly', function() {
		expect(length).to.be.equal(8);
	});

	it('should have calculated the product correctly', function() {
		expect(vals).to.deep.equal([
			['foo', 'alpha'],
			['foo', 'bar'],
			['foo', 'baz'],
			['bar', 'alpha'],
			['bar', 'beta'],
			['bar', 'gamma'],
			['baz', 'alpha'],
			['baz', 'beta'],
			['baz', 'gamma'],
		]);
	});
});
