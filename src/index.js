'use strict';

import api from './api';

export default {
  comparedGeo: api('interest by region'),
  relatedQueries: api('related queries'),
  relatedTopics: api('related topics'),
  trends: api('interest over time'),
};
