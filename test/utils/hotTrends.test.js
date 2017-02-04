'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var hotTrends = require('./../../lib/utils/hotTrends.js');

module.exports =
describe('hotTrends.js', function(){
	it('should reject if country is invalid', function(){
		return hotTrends('ZZ').should.be.rejectedWith('Could not locate country');
	});
	it('should resolve without a country', function(){
		return hotTrends().should.be.fulfilled;
	});
	it('should resolve with a valid country code', function(){
		return hotTrends('US').should.be.fulfilled;
	});
	it('should resolve with a valid country name', function(){
		return hotTrends('united states').should.be.fulfilled;
	});
});