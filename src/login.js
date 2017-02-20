'use strict';
import https from 'https';
import querystring from 'querystring';

export default function request({method, host, path, qs, form, headers}) {
  const options = {
    headers,
    host,
    method,
    path: `${path}?${querystring.stringify(qs)}`,
  };

  console.log('path', options.path)
  console.log('form', form);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunk = '';

      const setCookie = res.headers['set-cookie'];

      console.log('did i set the cookie?', setCookie);
      res.on('data', (data) => {
        chunk += data;
      });

      res.on('end', () => {
        resolve({
          data: chunk.toString('utf8'),
          cookies: setCookie,
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    console.log('check queryString', `data=${querystring.stringify(form)}`)
    if (form) req.write(`data=${querystring.stringify(form)}`);
    req.end();
  });
};

export function login({email, password}) {
  const options = {
    host: 'accounts.google.com',
    method: 'GET',
    path: '/ServiceLogin',
  };

  const authOptions = {
    host: 'accounts.google.com',
    method: 'POST',
    path: '/ServiceLoginAuth',
  };

  return request(options)
  .then((results) => {
    const inputs = results.match(/<input\b[^>]*>(.*?)/g);
    const form = inputs.reduce((acc, curr) => {
      if (curr.match(/name="(.*?)"/g)) {
        acc[curr.match(/name="(.*?)"/g)[0].split('"')[1]] =
          curr.match(/value="(.*?)"/g)[0].split('"')[1];
      }
      return acc;
    }, {});

    form.Email = email;
    form.Passwd = password;
    authOptions.form = form;

    // const cookies = results.cookies.map((cookie) => {
    //   return cookie.split(';').reduce((acc, curr) => {
    //     acc[curr.split('=')[0]] = curr.split('=')[1];
    //     return acc;
    //   }, {});
    // });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(form),
      // 'cookie': `${results.cookies[0].split(';')[0]}; ${results.cookies[1].split(';')[0]}`
    };

    authOptions.headers = headers;

    console.log('cookie', headers['cookie'])
    return request(authOptions);
  })
  .then((results) => {
    console.log('rejecting?', results.cookies[0].split(';')[0]);
    this.cookie = results.cookies[0].split(';')[0];
  });

};
