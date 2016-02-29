'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var topRelated = require('../../lib/utils/topRelated.js');

module.exports = 
describe('topRelated.js', function(){
	it('should reject if country is invalid', function(){
		return topRelated('dogs', 'ZZ').should.be.rejectedWith('Could not locate country');
	});
});