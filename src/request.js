'use strict';
import https from 'https';
import querystring from 'querystring';

// cache of the cookie - avoid re-requesting on subsequent requests.
let cookieVal;

// simpler request method for avoiding double-promise confusion
function rereq(options, done) {
  let req;

  req = https.request(options, (res) => {
    let chunk = '';

    res.on('data', (data) => {
      chunk += data;
    });
    res.on('end', () => {
      done(null, chunk.toString('utf8'));
    });
  });
  req.on('error', (e) => {
    done(e);
  });
  req.end();
}

export default function request({method, host, path, qs, agent}) {
  const options = {
    host,
    method,
    path: `${path}?${querystring.stringify(qs)}`,
  };

  if (agent) options.agent = agent;
  // will use cached cookieVal if set on 429 error
  if (cookieVal) options.headers = {'cookie': cookieVal};

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunk = '';

      res.on('data', (data) => {
        chunk += data;
      });

      res.on('end', () => {
        if (res.statusCode === 429 && res.headers['set-cookie']) {
          // Fix for the "too many requests" issue
          // Look for the set-cookie header and re-request
          cookieVal = res.headers['set-cookie'][0].split(';')[0];
          options.headers = {'cookie': cookieVal};
          rereq(options, function(err, response) {
            if (err) return reject(err);
            resolve(response);
          });
        } else {
          resolve(chunk.toString('utf8'));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}
