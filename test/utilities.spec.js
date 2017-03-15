import chai from 'chai';
import {
  constructObj,
  convertDateToString,
  formatResolution,
  formatTime,
  formatKeywords,
  getResults,
  isLessThan7Days,
  parseResults,
} from '../src/utilities';

const expect = chai.expect;

describe('utilities', () => {

  describe('isLessThan7Days', () => {
    it('should return true if difference is less than 7 days', () => {
      const d1 = new Date('2017-02-04');
      const d2 = new Date('2017-02-10');
      const d3 = new Date('2017-02-01');

      expect(isLessThan7Days(d1, d2)).to.be.true;
      expect(isLessThan7Days(d2, d3)).to.be.false;
    });
  });

  describe('convertDateToString', () => {
    it('should be able to return a date formatted as YYYY-MM-DD', () => {
      const d = new Date('2017-02-04');

      expect(convertDateToString(d)).to.equal('2017-02-4');
    });

    it('should be able to return a date formatted as YYYY-MM-DDTHH\\:MM\\:SS',
        () => {
          const d = new Date('2017', '01', '04', '12', '43');
          const utcHour = d.getUTCHours();

          expect(convertDateToString(d, true)).to.equal(
            `2017-02-4T${utcHour}\\:43\\:00`);
        });
  });

  describe('formatTime', () => {
    it('should return an error if startTime is not a date object', () => {
      const obj = {startTime: '2017-02-04'};

      expect(formatTime(obj)).to.be.an('error');
    });

    it('should return an error if endTime is not a date object', () => {
      const obj = {endTime: '2017-02-04'};

      expect(formatTime(obj)).to.be.an('error');
    });

    it('should make endTime the current date if not provided', () => {
      const d = new Date();
      const endTime = convertDateToString(d);
      const time = formatTime({}).time.split(' ');

      expect(formatTime({}).time).to.exist;
      expect(time[1]).to.equal(endTime);
    });

    it('should make the startTime 2004-01-01 if not provided', () => {
      const time = formatTime({}).time.split(' ');

      expect(formatTime({}).time).to.exist;
      expect(time[0]).to.equal('2004-01-1');
    });

    it('should include time if dates are less than a week', () => {
      const endTime = new Date();
      const startTime = new Date(Date.now() - (5 * 24 * 60 * 60 * 1000));
      const startTime2 = new Date(Date.now() - (8 * 24 * 60 * 60 * 1000));

      expect(/T/.test(formatTime({endTime, startTime}).time)).to.be.true;
      expect(/T/.test(formatTime({
        endTime,
        startTime: startTime2,
      }).time)).to.be.false;
    });

    it('should switch startTime and endTime if startTime is after endTime',
        () => {
          const endTime = new Date();
          const startTime = new Date(Date.now() + (5 * 24 * 60 * 60 * 1000));
          const result = formatTime({startTime, endTime});

          expect(result.startTime).to.equal(endTime);
          expect(result.endTime).to.equal(startTime);
        });
  });

  describe('formatKeywords', () => {
    it('should return single comparisonItem', () => {
      let keywords = formatKeywords({ keyword: 'test' });

      expect(keywords).to.deep.equal([{ keyword: 'test' }]);
    });

    it('should return an array of comparisonItems', () => {
      let keywords = formatKeywords({
        keyword: ['test', 'test2'],
        startDate: '2017-01-01',
      });

      expect(keywords).to.deep.equal([
        {keyword: 'test', startDate: '2017-01-01'},
        {keyword: 'test2', startDate: '2017-01-01'},
      ]);
    });

  });

  describe('constructObj', () => {
    it('should return an error if first argument is not an object', () => {
      expect(constructObj('not an obj').obj).to.be.an('error');
    });

    it('should return an error if keyword is not provided', () => {
      expect(constructObj({endTime: new Date()}).obj).to.be.an('error');
      expect(constructObj({keywords: 'Brooklyn'}).obj).to.be.an('error');
    });

    it('should return an error if cbFunc is not a function', () => {
      expect(constructObj({keyword: 'Brooklyn'}, 'str').obj).to.be.an('error');
    });

    it('should not require a callback function', () => {
      expect(constructObj({keyword: 'Brooklyn'}).obj).to.not.be.an('error');
    });

    it('should create a callback if one is not provided', () => {
      expect(constructObj({keyword: 'Brooklyn'}).cbFunc).to.be.a('function');
    });
  });

  describe('formatResolution', () => {
    const resolutions = ['COUNTRY', 'REGION', 'CITY', 'DMA'];

    it('should accept all words on the enumerated list', () => {
      const isItTrue = resolutions.every(formatResolution);

      expect(isItTrue).to.be.true;
    });

    it('should return an empty string if word is not on list', () => {
      expect(formatResolution('random string')).to.equal('');
    });

    it('should capitalize a word on the list', () => {
      expect(formatResolution('country')).to.equal('COUNTRY');
    });
  });

  describe('getResults', () => {
    it('should eventually get results', (done) => {
      const { obj } = constructObj({keyword: 'Brooklyn'});

      getResults('interest over time', obj)
      .then((res) => {
        expect(res).to.exist;
        expect(JSON.parse(res)).to.not.be.an('error');
        done();
      })
      .catch((e) => {
        expect(e).to.not.exist();
        done();
      });

    });
  });

  describe('parseResults', () => {
    it('should return a javascript object', () => {
      // The 'abcd' is the 4 characters that are returned by the request
      let validJSON = parseResults('abcd{' +
          '"some": "valid json",' +
          '"widgets": ["a", "b", "c"]' +
      '}');

      expect(validJSON).to.deep.equal(['a', 'b', 'c']);
    });

    it('should throw an error on invalid JSON', () => {
      expect(() => parseResults('<!DOCTYPE html><html</html>')).to.throw(Error);
    });
  });

});
