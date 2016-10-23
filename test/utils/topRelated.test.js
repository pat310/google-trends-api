'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var topRelated = require(__dirname + '/../../lib/utils/topRelated.js');

module.exports = 
describe('topRelated.js', function(){
	it('should reject if country is invalid', function(){
		return topRelated('dogs', {type: 'hour', value: 5}, 'ZZ').should.be.rejectedWith('Could not locate country');
	});
	it('should reject if timePeriod is invalid', function(){
		return topRelated('dogs', {type: 'hours', value: 5}, 'US').should.be.rejectedWith('type must be one of the specified enumerated types');
	});
	it('should resolve if no keyword is provided', function(){
		return topRelated().should.be.fulfilled;
	});
	it('should resolve without a country or timePeriod object', function(){
		return topRelated('dogs').should.be.fulfilled;
	});
	it('should resolve without a country', function(){
		return topRelated('dogs', {type: 'hour', value: 5}).should.be.fulfilled;
	});
	it('should resolve with a country code', function(){
		return topRelated('dogs', {type: 'hour', value: 5}, 'US').should.be.fulfilled;
	});
	it('should resolve with a country name', function(){
		return topRelated('dogs', {type: 'hour', value: 5}, 'united states').should.be.fulfilled;
	});
	it('should resolve without a a timePeriod object', function(){
		return topRelated('dogs', '', 'united states').should.be.fulfilled;
	});
});