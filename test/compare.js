var async = require('async-chainable');
var asyncCartesian = require('..');
var expect = require('chai').expect;

describe('asyncChainableCartesian.compare(set)', function() {

	var vals = [];
	var length;

	before(function(done) {
		var s = ['foo', 'bar', 'baz', 'quz', 'flarp'];

		async()
			.use(asyncCartesian)
			.compare(s, function(next, value, index, max) {
				if (length === undefined) length = max;
				vals.push({v: value, i: index, m: max});
				next();
			})
			.end(done);
	});

	it('should have calculated the length correctly', function() {
		expect(length).to.be.equal(10);
	});

	it('should have calculated the product correctly', function() {
		expect(vals).to.deep.equal([
			{v: ['foo', 'bar'], i: 0, m: 10},
			{v: ['foo', 'baz'], i: 1, m: 10},
			{v: ['foo', 'quz'], i: 2, m: 10},
			{v: ['foo', 'flarp'], i: 3, m: 10},
			{v: ['bar', 'baz'], i: 4, m: 10},
			{v: ['bar', 'quz'], i: 5, m: 10},
			{v: ['bar', 'flarp'], i: 6, m: 10},
			{v: ['baz', 'quz'], i: 7, m: 10},
			{v: ['baz', 'flarp'], i: 8, m: 10},
			{v: ['quz', 'flarp'], i: 9, m: 10},
		]);
	});
});
