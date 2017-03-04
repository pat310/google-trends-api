'use strict';
import https from 'https';
import querystring from 'querystring';
var r = require('./../node_modules/request');

export default function request({method, host, path, qs, cookie}) {

  const options = {
    cookie,
    host,
    method,
    path: `${path}?${querystring.stringify(qs)}`,
    followAllRedirects: true,
    headers: {
        'Cookie': cookie.join('; ')
    }
  };


  // console.log('here are options', options);

  return new Promise((resolve, reject) => {
      console.log("THE REQUEST");
      console.log({
          method: options.method,
          url: 'https://' + options.host + options.path,
          followAllRedirects: true,
          headers: options.headers,
          //form: `data=${querystring.stringify(form)}`
      });

    const req = r({
        method: options.method,
        url: 'https://' + options.host + options.path,
        followAllRedirects: true,
        headers: options.headers,
        //form: `data=${querystring.stringify(form)}`
    }, function(error, res, body ) {
        if ( error ) {
            reject(error);
        }
        else {
            resolve(body);
        }
    });


  });
};
