'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var risingSearches = require(__dirname + '/../../lib/utils/risingSearches.js');

module.exports = 
describe('risingSearches.js', function(){
	it('should reject if country is invalid', function(){
		return risingSearches('dogs', 'ZZ').should.be.rejectedWith('Could not locate country');
	});
	it('should resolve if no keyword is provided', function(){
		return risingSearches().should.be.fulfilled;
	});
	it('should resolve without a country', function(){
		return risingSearches('dogs').should.be.fulfilled;
	});
	it('should resolve with a country code', function(){
		return risingSearches('dogs', 'US').should.be.fulfilled;
	});
	it('should resolve with a country name', function(){
		return risingSearches('dogs', 'united states').should.be.fulfilled;
	});
});