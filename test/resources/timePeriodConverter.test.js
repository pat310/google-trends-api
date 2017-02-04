'use strict';
var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;

var timePeriodConverter = require('./../../lib/resources/timePeriodConverter.js');

module.exports =
describe('timePeriodConverter.test.js', function(){

	describe('timePeriodConverter', function(){
		it('exists', function(){
			assert.isFunction(timePeriodConverter);
		});
		it('returns empty string if receives undefined value', function(){
			expect(timePeriodConverter(undefined)).to.deep.equal('');
		});
		it('returns an error if it receives anything but an object', function(){
			expect(timePeriodConverter('5-years')).to.be.an('error').and.have.property('message', 'timePeriod must be an object of type {type: enum, value: number}');
			expect(timePeriodConverter(5)).to.be.an('error').and.have.property('message', 'timePeriod must be an object of type {type: enum, value: number}');
		});
		it('returns an error if type is not one of the enumerated values', function(){
			expect(timePeriodConverter({type: 5, value: 5})).to.be.an('error').and.have.property('message', 'type must be one of the specified enumerated types');
			expect(timePeriodConverter({type: 'hours', value: 5})).to.be.an('error').and.have.property('message', 'type must be one of the specified enumerated types');
			expect(timePeriodConverter({value: 5})).to.be.an('error').and.have.property('message', 'type must be one of the specified enumerated types');
		});
		it('returns an error if value is not a number', function(){
			expect(timePeriodConverter({type: 'hour', value: 'string'})).to.be.an('error').and.have.property('message', 'timePeriod value must be a number');
			expect(timePeriodConverter({type: 'hour', value: NaN})).to.be.an('error').and.have.property('message', 'timePeriod value must be a number');
			expect(timePeriodConverter({type: 'hour'})).to.be.an('error').and.have.property('message', 'timePeriod value must be a number');
		});
		it('returns properly formatted string', function(){
			expect(timePeriodConverter({type: 'HoUr', value: 5})).to.deep.equal('date=now 5-H');
			expect(timePeriodConverter({type: 'hour', value: 5})).to.deep.equal('date=now 5-H');
			expect(timePeriodConverter({type: 'day', value: 5})).to.deep.equal('date=now 5-d');
			expect(timePeriodConverter({type: 'month', value: 5})).to.deep.equal('date=today 5-m');
			expect(timePeriodConverter({type: 'year', value: 5})).to.deep.equal('date=today 60-m');
		});
	});

});