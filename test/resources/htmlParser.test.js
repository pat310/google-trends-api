'use strict';
var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;

var exampleHtml = fs.readFileSync(__dirname + '/examples/exampleHtml.html', 'utf8');
var exampleJSON = fs.readFileSync(__dirname + '/examples/exampleJSON.json', 'utf8');

var htmlParser = require(__dirname + '/../../lib/resources/htmlParser.js');

module.exports = 
describe('htmlParser.test.js', function(){
	
	describe('htmlParser.parseHtml', function(){
		it('has method', function(){
			assert.isFunction(htmlParser.parseHtml);
		});
		it('correctly parses htmlstrings', function(){
			expect(htmlParser.parseHtml(exampleHtml)).to.deep.equal(expectedHTMLOutput);
		});
	});

	describe('htmlParse.parseJSON', function(){
		it('has method', function(){
			assert.isFunction(htmlParser.parseJSON);
		});
		it('correctly parses JSON', function(){
			expect(htmlParser.parseJSON(exampleJSON)).to.deep.equal(expectedJSONOutput);
		});
	});
});

var expectedHTMLOutput = { 'dog house grill': '+550%',
    'the dog house': '+160%',
    'large dog house': '+150%',
    'best house dog': '+120%',
    'house of dog': '+100%',
    'animal house': '+90%',
    'house train dog': '+90%',
    'small dog house': '+60%',
    'big dog house': '+40%',
    'build dog house': '+40%' };

  var expectedJSONOutput = [ { 'December 2003': '2' },
    { 'January 2004': '3' },
    { 'February 2004': '2' },
    { 'March 2004': '2' },
    { 'April 2004': '3' },
    { 'May 2004': '5' },
    { 'June 2004': '1' },
    { 'July 2004': '1' },
    { 'August 2004': '2' },
    { 'September 2004': '2' },
    { 'October 2004': '3' },
    { 'November 2004': '2' },
    { 'December 2004': '2' },
    { 'January 2005': '2' },
    { 'February 2005': '3' },
    { 'March 2005': '3' },
    { 'April 2005': '2' },
    { 'May 2005': '3' },
    { 'June 2005': '2' },
    { 'July 2005': '2' },
    { 'August 2005': '2' },
    { 'September 2005': '3' },
    { 'October 2005': '2' },
    { 'November 2005': '2' },
    { 'December 2005': '2' },
    { 'January 2006': '2' },
    { 'February 2006': '2' },
    { 'March 2006': '2' },
    { 'April 2006': '3' },
    { 'May 2006': '2' },
    { 'June 2006': '1' },
    { 'July 2006': '2' },
    { 'August 2006': '2' },
    { 'September 2006': '2' },
    { 'October 2006': '14' },
    { 'November 2006': '3' },
    { 'December 2006': '2' },
    { 'January 2007': '2' },
    { 'February 2007': '2' },
    { 'March 2007': '2' },
    { 'April 2007': '3' },
    { 'May 2007': '2' },
    { 'June 2007': '2' },
    { 'July 2007': '3' },
    { 'August 2007': '19' },
    { 'September 2007': '3' },
    { 'October 2007': '4' },
    { 'November 2007': '2' },
    { 'December 2007': '3' },
    { 'January 2008': '2' },
    { 'February 2008': '2' },
    { 'March 2008': '2' },
    { 'April 2008': '3' },
    { 'May 2008': '2' },
    { 'June 2008': '2' },
    { 'July 2008': '1' },
    { 'August 2008': '4' },
    { 'September 2008': '12' },
    { 'October 2008': '3' },
    { 'November 2008': '13' },
    { 'December 2008': '2' },
    { 'January 2009': '2' },
    { 'February 2009': '3' },
    { 'March 2009': '3' },
    { 'April 2009': '2' },
    { 'May 2009': '3' },
    { 'June 2009': '3' },
    { 'July 2009': '2' },
    { 'August 2009': '2' },
    { 'September 2009': '2' },
    { 'October 2009': '2' },
    { 'November 2009': '2' },
    { 'December 2009': '2' },
    { 'January 2010': '2' },
    { 'February 2010': '2' },
    { 'March 2010': '2' },
    { 'April 2010': '2' },
    { 'May 2010': '3' },
    { 'June 2010': '3' },
    { 'July 2010': '2' },
    { 'August 2010': '3' },
    { 'September 2010': '3' },
    { 'October 2010': '3' },
    { 'November 2010': '3' },
    { 'December 2010': '3' },
    { 'January 2011': '4' },
    { 'February 2011': '2' },
    { 'March 2011': '2' },
    { 'April 2011': '3' },
    { 'May 2011': '7' },
    { 'June 2011': '9' },
    { 'July 2011': '3' },
    { 'August 2011': '3' },
    { 'September 2011': '3' },
    { 'October 2011': '3' },
    { 'November 2011': '3' },
    { 'December 2011': '6' },
    { 'January 2012': '3' },
    { 'February 2012': '3' },
    { 'March 2012': '4' },
    { 'April 2012': '3' },
    { 'May 2012': '4' },
    { 'June 2012': '3' },
    { 'July 2012': '3' },
    { 'August 2012': '5' },
    { 'September 2012': '4' },
    { 'October 2012': '4' },
    { 'November 2012': '3' },
    { 'December 2012': '4' },
    { 'January 2013': '5' },
    { 'February 2013': '3' },
    { 'March 2013': '3' },
    { 'April 2013': '8' },
    { 'May 2013': '4' },
    { 'June 2013': '8' },
    { 'July 2013': '3' },
    { 'August 2013': '3' },
    { 'September 2013': '3' },
    { 'October 2013': '4' },
    { 'November 2013': '3' },
    { 'December 2013': '4' },
    { 'January 2014': '3' },
    { 'February 2014': '3' },
    { 'March 2014': '3' },
    { 'April 2014': '3' },
    { 'May 2014': '10' },
    { 'June 2014': '4' },
    { 'July 2014': '3' },
    { 'August 2014': '4' },
    { 'September 2014': '5' },
    { 'October 2014': '4' },
    { 'November 2014': '3' },
    { 'December 2014': '4' },
    { 'January 2015': '4' },
    { 'February 2015': '3' },
    { 'March 2015': '4' },
    { 'April 2015': '4' },
    { 'May 2015': '4' },
    { 'June 2015': '3' },
    { 'July 2015': '3' },
    { 'August 2015': '8' },
    { 'September 2015': '12' },
    { 'October 2015': '5' },
    { 'November 2015': '7' },
    { 'December 2015': '14' },
    { 'January 2016': '71' },
    { 'February 2016': '100' } ];