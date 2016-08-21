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
                expect(htmlParser.parseJSON(exampleJSON)).to.deep.equal(expectedJSONOutput);
            });
            it('correctly parses JSON for multiple fields', function() {
                expect(htmlParser.parseJSON(exampleJSONTwoFields).length).to.equal(2);
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[0].query).to.deep.equal(expectedJSONTwoFieldsOutput[0].query);
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[0].values).to.deep.equal(expectedJSONTwoFieldsOutput[0].values);
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[1].query).to.deep.equal(expectedJSONTwoFieldsOutput[1].query);
                expect(htmlParser.parseJSON(exampleJSONTwoFields)[1].values).to.deep.equal(expectedJSONTwoFieldsOutput[1].values);
            })
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

var expectedJSONOutput = [{
    "query": "oj simpson",
    "values": [{
        "date": "Thu, 01 Jan 2004 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Feb 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Mar 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Apr 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 May 2004 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Jun 2004 05:00:00 GMT",
        "value": 7
    }, {
        "date": "Thu, 01 Jul 2004 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Aug 2004 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Sep 2004 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Oct 2004 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Nov 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Dec 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Jan 2005 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Feb 2005 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Mar 2005 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Apr 2005 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 May 2005 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Jun 2005 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Jul 2005 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 Aug 2005 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Sep 2005 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Oct 2005 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Nov 2005 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Dec 2005 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Jan 2006 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Feb 2006 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Mar 2006 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Apr 2006 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 May 2006 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Jun 2006 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Jul 2006 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Aug 2006 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Sep 2006 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Oct 2006 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Nov 2006 06:00:00 GMT",
        "value": 19
    }, {
        "date": "Fri, 01 Dec 2006 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Jan 2007 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Feb 2007 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Mar 2007 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Apr 2007 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 May 2007 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Jun 2007 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Jul 2007 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Aug 2007 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Sep 2007 05:00:00 GMT",
        "value": 26
    }, {
        "date": "Mon, 01 Oct 2007 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Nov 2007 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Sat, 01 Dec 2007 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Jan 2008 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Feb 2008 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Mar 2008 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Apr 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 May 2008 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Jun 2008 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Jul 2008 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Aug 2008 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 Sep 2008 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Wed, 01 Oct 2008 05:00:00 GMT",
        "value": 17
    }, {
        "date": "Sat, 01 Nov 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Dec 2008 06:00:00 GMT",
        "value": 18
    }, {
        "date": "Thu, 01 Jan 2009 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Feb 2009 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Mar 2009 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Apr 2009 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 May 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Jun 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Jul 2009 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Aug 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Sep 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Oct 2009 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Nov 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Dec 2009 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Jan 2010 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Feb 2010 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Mar 2010 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Apr 2010 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 May 2010 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Jun 2010 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Jul 2010 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Aug 2010 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Sep 2010 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Oct 2010 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Nov 2010 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Dec 2010 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Jan 2011 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Feb 2011 06:00:00 GMT",
        "value": 6
    }, {
        "date": "Tue, 01 Mar 2011 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Apr 2011 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 May 2011 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Jun 2011 05:00:00 GMT",
        "value": 9
    }, {
        "date": "Fri, 01 Jul 2011 05:00:00 GMT",
        "value": 12
    }, {
        "date": "Mon, 01 Aug 2011 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Sep 2011 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Oct 2011 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Nov 2011 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Dec 2011 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Jan 2012 06:00:00 GMT",
        "value": 8
    }, {
        "date": "Wed, 01 Feb 2012 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Mar 2012 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Apr 2012 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 May 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Jun 2012 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Jul 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Aug 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Sep 2012 05:00:00 GMT",
        "value": 7
    }, {
        "date": "Mon, 01 Oct 2012 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Nov 2012 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Sat, 01 Dec 2012 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Jan 2013 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 Feb 2013 06:00:00 GMT",
        "value": 6
    }, {
        "date": "Fri, 01 Mar 2013 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Apr 2013 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 May 2013 05:00:00 GMT",
        "value": 11
    }, {
        "date": "Sat, 01 Jun 2013 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Mon, 01 Jul 2013 05:00:00 GMT",
        "value": 10
    }, {
        "date": "Thu, 01 Aug 2013 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Sep 2013 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Oct 2013 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Nov 2013 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Dec 2013 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Jan 2014 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Sat, 01 Feb 2014 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Mar 2014 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Apr 2014 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 May 2014 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Jun 2014 05:00:00 GMT",
        "value": 15
    }, {
        "date": "Tue, 01 Jul 2014 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 Aug 2014 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Sep 2014 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Wed, 01 Oct 2014 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Sat, 01 Nov 2014 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Mon, 01 Dec 2014 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Jan 2015 06:00:00 GMT",
        "value": 6
    }, {
        "date": "Sun, 01 Feb 2015 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Mar 2015 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Apr 2015 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 May 2015 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Mon, 01 Jun 2015 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Wed, 01 Jul 2015 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Aug 2015 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Sep 2015 05:00:00 GMT",
        "value": 10
    }, {
        "date": "Thu, 01 Oct 2015 05:00:00 GMT",
        "value": 17
    }, {
        "date": "Sun, 01 Nov 2015 05:00:00 GMT",
        "value": 7
    }, {
        "date": "Tue, 01 Dec 2015 06:00:00 GMT",
        "value": 9
    }, {
        "date": "Fri, 01 Jan 2016 06:00:00 GMT",
        "value": 19
    }, {
        "date": "Mon, 01 Feb 2016 06:00:00 GMT",
        "value": 100
    }, {
        "date": "Tue, 01 Mar 2016 06:00:00 GMT",
        "value": 74
    }, {
        "date": "Fri, 01 Apr 2016 05:00:00 GMT",
        "value": 41
    }, {
        "date": "Sun, 01 May 2016 05:00:00 GMT",
        "value": 17
    }, {
        "date": "Wed, 01 Jun 2016 05:00:00 GMT",
        "value": 40
    }, {
        "date": "Fri, 01 Jul 2016 05:00:00 GMT",
        "value": 16
    }, {
        "date": "Mon, 01 Aug 2016 05:00:00 GMT",
        "value": 9
    }]
}];

var expectedJSONTwoFieldsOutput = [{
    "query": "swimming",
    "values": [{
        "date": "Thu, 01 Jan 2004 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Feb 2004 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Mon, 01 Mar 2004 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Apr 2004 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Sat, 01 May 2004 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Jun 2004 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Thu, 01 Jul 2004 05:00:00 GMT",
        "value": 7
    }, {
        "date": "Sun, 01 Aug 2004 05:00:00 GMT",
        "value": 8
    }, {
        "date": "Wed, 01 Sep 2004 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 Oct 2004 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Nov 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Dec 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Jan 2005 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Feb 2005 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Mar 2005 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Apr 2005 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 May 2005 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Wed, 01 Jun 2005 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Fri, 01 Jul 2005 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Mon, 01 Aug 2005 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Sep 2005 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Oct 2005 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Nov 2005 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Dec 2005 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Jan 2006 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Feb 2006 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Mar 2006 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Apr 2006 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 May 2006 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Jun 2006 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sat, 01 Jul 2006 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Tue, 01 Aug 2006 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Sep 2006 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Oct 2006 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Nov 2006 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Dec 2006 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Jan 2007 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Feb 2007 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Mar 2007 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Apr 2007 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 May 2007 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Jun 2007 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Jul 2007 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Wed, 01 Aug 2007 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Sep 2007 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Oct 2007 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Nov 2007 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Dec 2007 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Jan 2008 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Feb 2008 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Mar 2008 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Apr 2008 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 May 2008 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Jun 2008 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Jul 2008 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 Aug 2008 05:00:00 GMT",
        "value": 7
    }, {
        "date": "Mon, 01 Sep 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Oct 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Nov 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Dec 2008 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Jan 2009 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Feb 2009 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Mar 2009 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Apr 2009 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 May 2009 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Jun 2009 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Wed, 01 Jul 2009 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sat, 01 Aug 2009 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Sep 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Oct 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Nov 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Dec 2009 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Jan 2010 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Feb 2010 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Mar 2010 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Apr 2010 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 May 2010 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Jun 2010 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Jul 2010 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Aug 2010 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Wed, 01 Sep 2010 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Oct 2010 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Nov 2010 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Dec 2010 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Jan 2011 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Feb 2011 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Mar 2011 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Apr 2011 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 May 2011 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Jun 2011 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 Jul 2011 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Mon, 01 Aug 2011 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Sep 2011 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Oct 2011 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Nov 2011 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Dec 2011 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Jan 2012 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Feb 2012 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Mar 2012 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Apr 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 May 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Jun 2012 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sun, 01 Jul 2012 05:00:00 GMT",
        "value": 7
    }, {
        "date": "Wed, 01 Aug 2012 05:00:00 GMT",
        "value": 7
    }, {
        "date": "Sat, 01 Sep 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Oct 2012 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Nov 2012 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Dec 2012 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Jan 2013 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Feb 2013 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Mar 2013 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Apr 2013 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 May 2013 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Jun 2013 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Mon, 01 Jul 2013 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Thu, 01 Aug 2013 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Sep 2013 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Oct 2013 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Nov 2013 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Dec 2013 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Jan 2014 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Feb 2014 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Mar 2014 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Apr 2014 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 May 2014 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 Jun 2014 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Jul 2014 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 Aug 2014 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Sep 2014 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Oct 2014 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Nov 2014 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Dec 2014 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Jan 2015 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Feb 2015 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Mar 2015 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Wed, 01 Apr 2015 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 May 2015 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Jun 2015 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Wed, 01 Jul 2015 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Sat, 01 Aug 2015 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Tue, 01 Sep 2015 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Oct 2015 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Nov 2015 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Dec 2015 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Jan 2016 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Feb 2016 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Mar 2016 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Apr 2016 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Sun, 01 May 2016 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Jun 2016 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Fri, 01 Jul 2016 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Mon, 01 Aug 2016 05:00:00 GMT",
        "value": 10
    }]
}, {
    "query": "olympics",
    "values": [{
        "date": "Thu, 01 Jan 2004 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Feb 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Mon, 01 Mar 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 Apr 2004 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 May 2004 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Tue, 01 Jun 2004 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Thu, 01 Jul 2004 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Sun, 01 Aug 2004 05:00:00 GMT",
        "value": 47
    }, {
        "date": "Wed, 01 Sep 2004 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Fri, 01 Oct 2004 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 Nov 2004 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Dec 2004 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Jan 2005 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Feb 2005 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Mar 2005 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Apr 2005 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 May 2005 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Jun 2005 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Jul 2005 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Aug 2005 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Sep 2005 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Oct 2005 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Nov 2005 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Dec 2005 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Jan 2006 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Feb 2006 06:00:00 GMT",
        "value": 27
    }, {
        "date": "Wed, 01 Mar 2006 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Apr 2006 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 May 2006 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Jun 2006 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sat, 01 Jul 2006 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Aug 2006 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Sep 2006 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Oct 2006 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Nov 2006 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Dec 2006 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Jan 2007 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Feb 2007 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Mar 2007 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Apr 2007 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 May 2007 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Jun 2007 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Jul 2007 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Aug 2007 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sat, 01 Sep 2007 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Oct 2007 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Nov 2007 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Dec 2007 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Jan 2008 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Feb 2008 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sat, 01 Mar 2008 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Apr 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Thu, 01 May 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Jun 2008 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 Jul 2008 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Fri, 01 Aug 2008 05:00:00 GMT",
        "value": 60
    }, {
        "date": "Mon, 01 Sep 2008 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Wed, 01 Oct 2008 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Nov 2008 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 Dec 2008 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Jan 2009 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Feb 2009 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 Mar 2009 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Apr 2009 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 May 2009 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 Jun 2009 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Jul 2009 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sat, 01 Aug 2009 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Sep 2009 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Oct 2009 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Nov 2009 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Dec 2009 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Jan 2010 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Feb 2010 06:00:00 GMT",
        "value": 37
    }, {
        "date": "Mon, 01 Mar 2010 06:00:00 GMT",
        "value": 5
    }, {
        "date": "Thu, 01 Apr 2010 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 May 2010 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Jun 2010 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Jul 2010 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Aug 2010 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Sep 2010 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Oct 2010 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Nov 2010 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Dec 2010 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Sat, 01 Jan 2011 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Feb 2011 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Mar 2011 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Apr 2011 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 May 2011 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Jun 2011 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Fri, 01 Jul 2011 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Mon, 01 Aug 2011 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Sep 2011 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sat, 01 Oct 2011 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Nov 2011 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Dec 2011 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Jan 2012 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Feb 2012 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Mar 2012 06:00:00 GMT",
        "value": 3
    }, {
        "date": "Sun, 01 Apr 2012 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Tue, 01 May 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Fri, 01 Jun 2012 05:00:00 GMT",
        "value": 6
    }, {
        "date": "Sun, 01 Jul 2012 05:00:00 GMT",
        "value": 40
    }, {
        "date": "Wed, 01 Aug 2012 05:00:00 GMT",
        "value": 59
    }, {
        "date": "Sat, 01 Sep 2012 05:00:00 GMT",
        "value": 4
    }, {
        "date": "Mon, 01 Oct 2012 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Thu, 01 Nov 2012 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Dec 2012 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Jan 2013 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Feb 2013 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Mar 2013 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Apr 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 May 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sat, 01 Jun 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Jul 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Aug 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Sep 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Oct 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Nov 2013 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Dec 2013 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Jan 2014 06:00:00 GMT",
        "value": 4
    }, {
        "date": "Sat, 01 Feb 2014 06:00:00 GMT",
        "value": 32
    }, {
        "date": "Sat, 01 Mar 2014 06:00:00 GMT",
        "value": 2
    }, {
        "date": "Tue, 01 Apr 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 May 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Jun 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Jul 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Aug 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Sep 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Oct 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sat, 01 Nov 2014 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Dec 2014 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Jan 2015 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Feb 2015 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Mar 2015 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Apr 2015 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 May 2015 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Jun 2015 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Wed, 01 Jul 2015 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sat, 01 Aug 2015 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Sep 2015 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Thu, 01 Oct 2015 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Sun, 01 Nov 2015 05:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Dec 2015 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Jan 2016 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Mon, 01 Feb 2016 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Tue, 01 Mar 2016 06:00:00 GMT",
        "value": 1
    }, {
        "date": "Fri, 01 Apr 2016 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Sun, 01 May 2016 05:00:00 GMT",
        "value": 2
    }, {
        "date": "Wed, 01 Jun 2016 05:00:00 GMT",
        "value": 3
    }, {
        "date": "Fri, 01 Jul 2016 05:00:00 GMT",
        "value": 5
    }, {
        "date": "Mon, 01 Aug 2016 05:00:00 GMT",
        "value": 100
    }]
}];
