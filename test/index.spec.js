import chai from 'chai';
import google from '../src';

const expect = chai.expect;

describe('index', () => {
  describe('should have the following methods:', () => {
    it('interestByRegion', () => {
      expect(google.interestByRegion).to.exist;
      expect(google.interestByRegion).to.be.a('function');
    });

    it('interestOverTime', () => {
      expect(google.interestOverTime).to.exist;
      expect(google.interestOverTime).to.be.a('function');
    });

    it('relatedQueries', () => {
      expect(google.relatedQueries).to.exist;
      expect(google.relatedQueries).to.be.a('function');
    });

    it('relatedTopics', () => {
      expect(google.relatedTopics).to.exist;
      expect(google.relatedTopics).to.be.a('function');
    });
  });
});
