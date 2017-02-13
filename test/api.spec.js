import chai from 'chai';
import api from '../src/api';

const expect = chai.expect;

describe('api', () => {
  const newFunc = api('interest over time');
  it('should return a function', () => {
    expect(newFunc).to.be.a('function');
  });

  it('should reject if request object is not provided', (done) => {
    newFunc()
    .then((res) => {
      expect(res).to.not.exist;
      done();
    })
    .catch((e) => {
      expect(e).to.exist;
      done();
    });
  });

  it('should work without a callback function', (done) => {
    newFunc({keyword: 'Brooklyn'})
    .then((res) => {
      expect(res).to.exist;
      done();
    })
    .catch((e) => {
      expect(e).to.not.exist;
      done();
    });

  });

  it('should accept a callback function', (done) => {
    newFunc({keyword: 'Brooklyn'}, (err, res) => {
      expect(err).to.not.exist;
      expect(res).to.exist;
      newFunc({}, (err, res) => {
        expect(res).to.not.exist;
        expect(err).to.exist;
        done();
      });
    });
  });
});
