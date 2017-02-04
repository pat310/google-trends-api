'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var allTopCharts = require('./../../lib/utils/allTopCharts.js');

module.exports =
describe('allTopCharts.js', function(){
	it('should reject if date is invalid', function(){
		return allTopCharts('201413').should.be.rejectedWith('Date is invalid');
	});
	it('should reject if country is invalid', function(){
		return allTopCharts('201401', 'ZZ').should.be.rejectedWith('Could not locate country');
	});
	it('should resolve without a date or country', function(){
		return allTopCharts().should.be.fulfilled;
	});
	it('should resolve without a country', function(){
		return allTopCharts('201401').should.be.fulfilled;
	});
	it('should resolve with a country code', function(){
		return allTopCharts('201401', 'US').should.be.fulfilled;
	});
	it('should resolve with a country name', function(){
		return allTopCharts('201401', 'united states').should.be.fulfilled;
	});
});