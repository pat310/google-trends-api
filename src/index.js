'use strict';
import api from './api';
import request from './request';

const apiRequest = api.bind(this, request);

export default {
  autoComplete: apiRequest('Auto complete'),
  interestByRegion: apiRequest('Interest by region'),
  interestOverTime: apiRequest('Interest over time'),
  relatedQueries: apiRequest('Related queries'),
  relatedTopics: apiRequest('Related topics'),
};
