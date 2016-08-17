'use strict';
var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;

var trendDataHelper = require(__dirname + '/../../lib/resources/trendDataHelper.js');

module.exports = 
describe('trendDataHelper.test.js', function(){
	
	describe('trendDataHelper.groupKeywords', function(){
		it('has method', function(){
			assert.isFunction(trendDataHelper.groupKeywords);
		});
		it('correctly groups an array less than limit of 5', function(){
			expect(trendDataHelper.groupKeywords(['dog', 'cat'])).to.deep.equal(['dog,cat']);
		});
		it('correctly groups an array greater limit of 5', function(){
            expect(trendDataHelper.groupKeywords(['dog', 'cat', 'giraffe', 'bear', 'sloth', 'pig'])).to.deep.equal(['dog,cat,giraffe,bear,sloth', 'pig']);
            expect(trendDataHelper.groupKeywords(['dog', 'cat', 'giraffe', 'bear', 'sloth', 'pig', 'donkey', 'horse', 'crane', 'wolf', 'lion'])).to.deep.equal(['dog,cat,giraffe,bear,sloth', 'pig,donkey,horse,crane,wolf', 'lion']);
		});
	});

	describe('trendDataHelper.reduceArrayDimensions', function(){
		it('has method', function(){
			assert.isFunction(trendDataHelper.reduceArrayDimensions);
		});
		it('correctly reduces array dimensions', function(){
			expect(trendDataHelper.reduceArrayDimensions([[['cat', 'dog'], ['bear', 'pig']], ['sloth', 'horse']])).to.deep.equal([['cat', 'dog',], ['bear', 'pig',], 'sloth', 'horse']);
		});
	});
});