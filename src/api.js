'use strict';

export default (request, searchType, resultsHandler) => {
  const resultsPromise = resultsHandler.processor(request);

  return (reqObj, cb) => {
    const {
      cbFunc,
      obj,
    } = resultsHandler.objectConstructor(reqObj, cb);

    if (obj instanceof Error) return Promise.reject(cbFunc(obj));

    return resultsPromise(searchType, obj)
    .then(res => cbFunc(null, res))
    .catch(err => Promise.reject(cbFunc(err)));
  };
};
