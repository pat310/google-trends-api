'use strict';

import api from './api';
import { login } from './utilities';

// export default {
//   interestByRegion: api('interest by region'),
//   interestOverTime: api('interest over time'),
//   relatedQueries: api('related queries'),
//   relatedTopics: api('related topics'),
// };

export default class GoogleTrends {
  constructor({email, password}) {

    if (email && password) {
      login(email, password);
    }

    this.interestByRegion = api('interestByRegion');
    this.interestOverTime = api('interestOverTime');
    this.relatedQueries = api('relatedQueries');
    this.relatedTopics = api('relatedTopics');
  }
};
