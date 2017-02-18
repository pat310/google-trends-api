'use strict';
import https from 'https';
import querystring from 'querystring';

export default function request({method, host, path, qs, cookie}) {
  const options = {
    cookie,
    host,
    method,
    path: `${path}?${querystring.stringify(qs)}`,
  };

  console.log('here are options', options);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunk = '';

      res.on('data', (data) => {
        chunk += data;
      });

      res.on('end', () => {
        // console.log('this is chunk', chunk)
        resolve(chunk.toString('utf8'));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};
