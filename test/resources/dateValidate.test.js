'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

const DATE = require('../../lib/resources/dateValidate.js');

module.exports =
describe('dateValidate.test.js', function(){

	describe('getToday method', function(){	
		it('gets the correct default date (1 month behind) and formats it properly (yyyymm)', function(){
			var today = new Date();
			var month = today.getMonth();
			var year = today.getFullYear();
			var day = today.getDate();
			var date = "";

			month = day < 7 ? month - 1 : month;
			
			if(month === 0){
				year -= 1;
				month = 12;
			}
			date += year;
			if(month < 10) date += "0";
			date += month;

			expect(DATE.getToday()).to.equal(date);
		});
	});

	describe('isValid method', function(){
		it('returns true if a valid date is provided', function(){
			expect(DATE.isValid('201401')).to.equal(true);
		});
		it('returns false if an invalid date is provided', function(){
			expect(DATE.isValid('201400')).to.equal(false);
			expect(DATE.isValid('201413')).to.equal(false);
			expect(DATE.isValid('a01413')).to.equal(false);
		});
	});

});