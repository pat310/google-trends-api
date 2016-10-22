'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var trendData = require(__dirname + '/../../lib/utils/trendData.js');

module.exports = 
describe('trendData.js', function(){
	it('should reject if no keyword is provided', function(){
		return trendData().should.be.rejectedWith('Keywords must be provided');
	});
	it('should reject if timePeriod is not provided correctly', function(){
		return trendData('swimming', {type: 'something', value: 5}).should.be.rejectedWith('type must be one of the specified enumerated types');
	});
	it('should run analysis for keywords', function(){
		return trendData('swimming').should.be.resolved;
	});
	it('should run analysis for keywords with timePeriod object', function(){
		return trendData('swimming', {type: 'hour', value: 5}).should.be.resolved;
	});
});