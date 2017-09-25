'use strict';
import https from 'https';
import querystring from 'querystring';
import HttpsProxyAgent from 'https-proxy-agent';

export default function request({method, host, proxy, path, qs}) {
  const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

  const options = {
    host,
    method,
    path: `${path}?${querystring.stringify(qs)}`,
    agent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunk = '';

      res.on('data', (data) => {
        chunk += data;
      });

      res.on('end', () => {
        resolve(chunk.toString('utf8'));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};
