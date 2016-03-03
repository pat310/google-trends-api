'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;

var parseArguments = require(__dirname + '/../../lib/resources/callbacks.js');

module.exports = 
describe('callbacks.test.js', function(){
	function testFunc(arg1, arg2, arg3){}

	function cbFunc(err, result){
		if(err) return err;
		return result;
	}

	var testArgs = ['this is for arg1', 'this is for arg2'];

	var testArgsWCb = ['this is for arg1', 'this is for arg2', cbFunc];

	describe('parseArguments', function(){
		it('returns an object with the function parameters as keys and adds a cbFunc', function(){
			assert(Object.keys(parseArguments(testArgs, testFunc)), ['arg1', 'arg2', 'arg3', 'cbFunc'], 'same members');
		});
		it('cbFunc is equal to a function even if not provided', function(){
			expect(parseArguments(testArgs, testFunc).cbFunc).to.be.an('function');
		});
		it('cbFunc is equal to the provided function', function(){
			expect(parseArguments(testArgsWCb, testFunc).cbFunc).to.equal(cbFunc);
		});
		it('values of object assigned correctly', function(){
			expect(parseArguments(testArgsWCb, testFunc).arg1).to.equal('this is for arg1');
			expect(parseArguments(testArgsWCb, testFunc).arg2).to.equal('this is for arg2');
			expect(parseArguments(testArgsWCb, testFunc).arg3).to.be.an('undefined');
		});
	});
});