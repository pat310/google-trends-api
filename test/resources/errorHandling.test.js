'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var checkErrors = require('../../lib/resources/errorHandling.js');

module.exports = 
describe('errorHandling.test.js', function(){

	var objNoCID = {
		cid: undefined,
	};
	var objNoKEYWORDS = {
		keywords: undefined,
	};
	var objInvalidDate = {
		date: '201613'
	};
	var objInvalidGeo = {
		geo: 'ZZ'
	};
	var objNoDateGeo = {
		date: undefined,
		geo: undefined
	};

	describe('checkErrors', function(){
		it('will return error if cid is a key and no category provided', function(){
			expect(checkErrors(objNoCID)).to.be.an('error').and.have.property('message', 'Category must be provided');
		});
		it('will return error if keywords is a key and no keyword provided', function(){
			expect(checkErrors(objNoKEYWORDS)).to.be.an('error').and.have.property('message', 'Keywords must be provided');
		});
		it('will return error if date is invalid', function(){
			expect(checkErrors(objInvalidDate)).to.be.an('error').and.have.property('message', 'Date is invalid');
		});
		it('will return error if geo is invalid', function(){
			expect(checkErrors(objInvalidGeo)).to.be.an('error').and.have.property('message', 'Could not locate country');
		});
		it('will complete an incomplete object', function(){
			checkErrors(objNoDateGeo);
			expect(objNoDateGeo.geo).to.equal('US');
			expect(objNoDateGeo.date).to.exist;
			expect(objNoDateGeo.countryDomain).to.equal('google.us');
			expect(objNoDateGeo.countryCode).to.equal('1');
		});
	});
});