'use strict';

import { constructObj, getResults } from './utilities';

export default (searchType) => {
  return (...args) => {
    const {
      cbFunc,
      obj,
    } = constructObj(args);

    if (obj instanceof Error) return Promise.reject(cbFunc(obj));

    return getResults(searchType, obj)
    .then(res => cbFunc(null, res))
    .catch(err => Promise.reject(cbFunc(err)));
  };
};
