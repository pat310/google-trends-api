'use strict';

import { constructObj, getResults } from './utilities';

export default (searchType, cookie) => {
  return (reqObj, cb) => {
    const {
      cbFunc,
      obj,
    } = constructObj(reqObj, cb);

    if (obj instanceof Error) return Promise.reject(cbFunc(obj));

    return getResults(searchType, obj, cookie)
    .then(res => cbFunc(null, res))
    .catch(err => Promise.reject(cbFunc(err)));
  };
};
