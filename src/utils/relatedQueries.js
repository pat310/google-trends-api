'use strict';

const {
  constructObj,
  getResults,
} = require('../resources/utilities');

export default function request(...args) {
  const {
    cbFunc,
    obj,
  } = constructObj(args);

  if (obj instanceof Error) return Promise.reject(cbFunc(obj));

  return getResults('related queries', obj)
  .then(res => cbFunc(null, res))
  .catch(err => Promise.reject(cbFunc(err)));
};
