'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var categoryTopCharts = require('./../../lib/utils/categoryTopCharts.js');

module.exports =
describe('categoryTopCharts.js', function(){
	it('should reject if category is not provided', function(){
		return categoryTopCharts().should.be.rejectedWith('Category must be provided');
	});
	it('should reject if date is invalid', function(){
		return categoryTopCharts('dogs','201413').should.be.rejectedWith('Date is invalid');
	});
	it('should reject if country is invalid', function(){
		return categoryTopCharts('dogs','201401', 'ZZ').should.be.rejectedWith('Could not locate country');
	});
	it('should resolve without a date or country', function(){
		return categoryTopCharts('actors').should.be.fulfilled;
	});
	it('should resolve without a date', function(){
		return categoryTopCharts({category: 'actors', geo: 'US'}).should.be.fulfilled;
	});
	it('should resolve without a country', function(){
		return categoryTopCharts('actors','201401').should.be.fulfilled;
	});
	it('should resolve with a valid country code and date', function(){
		return categoryTopCharts('actors','201401', 'US').should.be.fulfilled;
	});
	it('should resolve with a valid country name', function(){
		return categoryTopCharts('actors','201401', 'united states').should.be.fulfilled;
	});
});