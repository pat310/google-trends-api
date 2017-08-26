'use strict';
import api from './api';
import request from './request';

const apiRequest = api.bind(this, request);

export default {
  autoComplete: apiRequest('auto complete'),
  interestByRegion: apiRequest('interest by region'),
  interestOverTime: apiRequest('interest over time'),
  relatedQueries: apiRequest('related queries'),
  relatedTopics: apiRequest('related topics'),
};
