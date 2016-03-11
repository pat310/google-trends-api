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
});