'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var hotTrendsDetail = require('../../lib/utils/hotTrendsDetail.js');

module.exports = 
describe('hotTrendsDetail.js', function(){
	it('should reject if country is invalid', function(){
		return hotTrendsDetail('ZZ').should.be.rejectedWith('Could not locate country');
	});
});