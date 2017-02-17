'use strict';

import api from './api';
import { login } from './login';

// export default {
//   cookie: null,
//   interestByRegion: api('interest by region'),
//   interestOverTime: api('interest over time'),
//   login: login,
//   relatedQueries: api('related queries'),
//   relatedTopics: api('related topics'),
// };

export default class GoogleTrends {
  constructor() {
    this.cookie = null;
    this.login = login;
    this.interestByRegion = api('interest by region');
    this.relatedQueries = api('related queries');
    this.relatedTopics = api('related topics');

  }

  interestOverTime(reqObj, cb) {
    console.log('calling this function?????????????', this.cookie);
    return api('interest over time', this.cookie)(reqObj, cb);
  }
};
