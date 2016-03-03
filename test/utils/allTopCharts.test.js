'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var allTopCharts = require(__dirname + '/../../lib/utils/allTopCharts.js');

module.exports = 
describe('allTopCharts.js', function(){
	it('should reject if date is invalid', function(){
		return allTopCharts('201413').should.be.rejectedWith('Date is invalid');
	});
	it('should reject if country is invalid', function(){
		return allTopCharts('201401', 'ZZ').should.be.rejectedWith('Could not locate country');
	});
});