'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var hotTrendsDetail = require('./../../lib/utils/hotTrendsDetail.js');

module.exports =
describe('hotTrendsDetail.js', function(){
	it('should reject if country is invalid', function(){
		return hotTrendsDetail('ZZ').should.be.rejectedWith('Could not locate country');
	});
	it('should resolve without a country', function(){
		return hotTrendsDetail().should.be.fulfilled;
	});
	it('should resolve with a country code', function(){
		return hotTrendsDetail('US').should.be.fulfilled;
	});
	it('should resolve with a country name', function(){
		return hotTrendsDetail('united states').should.be.fulfilled;
	});
});