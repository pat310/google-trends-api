'use strict';
var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;

var exampleHtml = fs.readFileSync(__dirname + '/examples/exampleHtml.html', 'utf8');
var exampleErrorHtml = fs.readFileSync(__dirname + '/examples/exampleErrorHtml.html', 'utf8');
var exampleJSON = fs.readFileSync(__dirname + '/examples/exampleJSON.json', 'utf8');
var exampleJSONTwoFields = fs.readFileSync(__dirname + '/examples/exampleJSONTwoFields.json', 'utf8');
var exampleJSONMultipleFields = fs.readFileSync(__dirname + '/examples/exampleJSONMultipleFields.json', 'utf8');
var exampleJSONEmpty = fs.readFileSync(__dirname + '/examples/exampleJSONEmpty.json', 'utf8');

var htmlParser = require(__dirname + '/../../lib/resources/htmlParser.js');

module.exports =
    describe('htmlParser.test.js', function() {

        describe('htmlParser.parseHtml', function() {
            it('has method', function() {
                assert.isFunction(htmlParser.parseHtml);
            });
            it('correctly parses htmlstrings', function() {
                expect(htmlParser.parseHtml(exampleHtml)).to.deep.equal(expectedHTMLOutput);
            });
            it('returns an error when quota limit reached', function() {
                expect(htmlParser.parseHtml(exampleErrorHtml)).to.be.an('error').and.have.property('message', 'Quota limit exceeded, try again later');
            });
        });

        describe('htmlParse.parseJSON', function() {
            it('has method', function() {
                assert.isFunction(htmlParser.parseJSON);
            });
            it('correctly parses JSON', function() {
                expect(htmlParser.parseJSON(exampleJSON)).to.have.lengthOf(1);
                expect(htmlParser.parseJSON(exampleJSON)[0]).to.have.property('query', 'oj simpson');
                expect(htmlParser.parseJSON(exampleJSON)[0]).to.have.property('values');
                expect(htmlParser.parseJSON(exampleJSON)[0].values).to.have.lengthOf(152);
                expect(htmlParser.parseJSON(exampleJSON)[0].values[0]).to.include.keys('date', 'value');
            });
            it('correctly parses JSON for multiple fields', function() {
                expect(htmlParser.parseJSON(exampleJSONTwoFields)).to.have.lengthOf(2);
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[0]).to.have.property('query', 'swimming');
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[0]).to.have.property('values');
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[0].values).to.have.lengthOf(152);
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[0].values[0]).to.include.keys('date', 'value');
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[1]).to.have.property('query', 'olympics');
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[1]).to.have.property('values');
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[1].values).to.have.lengthOf(152);
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[1].values[0]).to.include.keys('date', 'value');
            });
            it('runs successfully for multiple fields', function() {
                expect(htmlParser.parseJSON(exampleJSONMultipleFields)).to.be.instanceof(Array);
            });
            it('returns an error when quota limit reached', function() {
                expect(htmlParser.parseJSON(exampleErrorHtml)).to.be.an('error').and.have.property('message', 'Quota limit exceeded, try again later');
            });
            it('returns an error when Google Trends has no data', function() {
                expect(htmlParser.parseJSON(exampleJSONEmpty)).to.have.lengthOf(0);
            });
        });
    });

var expectedHTMLOutput = {
    'dog house grill': '+550%',
    'the dog house': '+160%',
    'large dog house': '+150%',
    'best house dog': '+120%',
    'house of dog': '+100%',
    'animal house': '+90%',
    'house train dog': '+90%',
    'small dog house': '+60%',
    'big dog house': '+40%',
    'build dog house': '+40%'
};
