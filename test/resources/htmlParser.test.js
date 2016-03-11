'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;

var htmlParser = require(__dirname + '/../../lib/resources/htmlParser.js');

module.exports = 
describe('htmlParser.test.js', function(){

	describe('htmlParser.parseHtml', function(){
		it('has method', function(){
			assert.isFunction(htmlParser.parseHtml);
		});
	});

	describe('htmlParse.parseJSON', function(){
		it('has method', function(){
			assert.isFunction(htmlParser.parseJSON);
		});
	});
});