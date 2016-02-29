'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

const COUNTRY = require('../../lib/resources/countryCodes.js');

module.exports = 
describe('countryCodes.test.js', function(){
	describe('getCountryCode method', function(){
		it('returns the correct country code for US', function(){
			expect(COUNTRY.getCode('US')).to.equal('1');
		});
		it('returns the correct country code for UniTeD StATEs', function(){
			expect(COUNTRY.getCode('UniTeD StATEs')).to.equal('1');
		});
		it('returns undefined if country code does not exist', function(){
			expect(COUNTRY.getCode('ZZ')).to.be.undefined;
		});
	});

	describe('getAbbreviation method', function(){
		it('returns the correct country abbreviation', function(){
			expect(COUNTRY.getAbbreviation('united states')).to.equal('US');
		});
		it('returns the undefined if country does not exist', function(){
			expect(COUNTRY.getAbbreviation('The best country in the world')).to.be.undefined;
		});
	});
});