'use strict';
import chai from 'chai';
import api from '../src/api';

const expect = chai.expect;

describe('api', () => {
  let count = 0;

  function request(counter) {
    return new Promise((resolve, reject) => {
      const fakeReqObj = {
        widgets: [{
          request: {
            requestOptions: {},
          },
          title: 'Interest over time',
          id: 'TIMESERIES',
          token: 'dogman',
        }],
      };

      setTimeout(() => {
        if (count === 0) {
          count += 1;
          resolve(`1234${JSON.stringify(fakeReqObj)}`);
        } else {
          resolve(`12345${JSON.stringify(fakeReqObj)}`);
        }
      }, 0);
    });
  }

  const newFunc = api(request, 'Interest over time');

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
    /** reset counter */
    count = 0;

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
    /** reset counter */
    count = 0;

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

  it('should be able to catch an error in catch block', (done) => {
    function errorPromise() {
      return Promise.reject('error on purpose');
    }
    const errorFunc = api(errorPromise, 'Interest over time');

    errorFunc({keyword: 'Brooklyn'})
    .then((e) => {
      expect(e).to.not.exist;
      done();
    })
    .catch((e) => {
      expect(e).to.exist;
      done();
    });
  });
});
