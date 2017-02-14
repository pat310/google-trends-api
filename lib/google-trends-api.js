(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("https"), require("querystring"));
	else if(typeof define === 'function' && define.amd)
		define("google-trends-api", ["https", "querystring"], factory);
	else if(typeof exports === 'object')
		exports["google-trends-api"] = factory(require("https"), require("querystring"));
	else
		root["google-trends-api"] = factory(root["https"], root["querystring"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_75__, __WEBPACK_EXTERNAL_MODULE_95__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _api = __webpack_require__(1);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  interestByRegion: (0, _api2.default)('interest by region'),
	  interestOverTime: (0, _api2.default)('interest over time'),
	  relatedQueries: (0, _api2.default)('related queries'),
	  relatedTopics: (0, _api2.default)('related topics')
	};
	module.exports = exports['default'];

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(2);
	
	exports.default = function (searchType) {
	  return function (reqObj, cb) {
	    var _constructObj = (0, _utilities.constructObj)(reqObj, cb),
	        cbFunc = _constructObj.cbFunc,
	        obj = _constructObj.obj;
	
	    if (obj instanceof Error) return Promise.reject(cbFunc(obj));
	
	    return (0, _utilities.getResults)(searchType, obj).then(function (res) {
	      return cbFunc(null, res);
	    }).catch(function (err) {
	      return Promise.reject(cbFunc(err));
	    });
	  };
	};
	
	module.exports = exports['default'];

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.isLessThan7Days = isLessThan7Days;
	exports.convertDateToString = convertDateToString;
	exports.formatTime = formatTime;
	exports.constructObj = constructObj;
	exports.formatResolution = formatResolution;
	exports.getResults = getResults;
	
	var _request = __webpack_require__(227);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isLessThan7Days(date1, date2) {
	  return Math.abs(date2 - date1) / (24 * 60 * 60 * 1000) < 7;
	};
	
	function convertDateToString(d, shouldIncludeTime) {
	  var month = (d.getUTCMonth() + 1).toString();
	
	  month = month.length < 2 ? '0' + month : month;
	  var day = d.getUTCDate().toString();
	  var year = d.getUTCFullYear().toString();
	  var hour = d.getUTCHours();
	  var minute = d.getUTCMinutes();
	
	  if (shouldIncludeTime) {
	    return year + '-' + month + '-' + day + 'T' + hour + '\\:' + minute + '\\:00';
	  }
	
	  return year + '-' + month + '-' + day;
	};
	
	function formatTime(obj) {
	  if (obj.startTime && !(obj.startTime instanceof Date)) {
	    return new Error('startTime must be a Date object');
	  }
	  if (obj.endTime && !(obj.endTime instanceof Date)) {
	    return new Error('endTime must be a Date object');
	  }
	
	  if (obj.startTime && obj.endTime && obj.startTime > obj.endTime) {
	    var temp = obj.startTime;
	
	    obj.startTime = obj.endTime;
	    obj.endTime = temp;
	  }
	
	  if (!obj.endTime) obj.endTime = new Date();
	  if (!obj.startTime) obj.startTime = new Date('2004-01-01');
	
	  var shouldIncludeTime = isLessThan7Days(obj.startTime, obj.endTime);
	
	  var startTime = convertDateToString(obj.startTime, shouldIncludeTime);
	  var endTime = convertDateToString(obj.endTime, shouldIncludeTime);
	
	  obj.time = startTime + ' ' + endTime;
	  return obj;
	};
	
	function constructObj(obj, cbFunc) {
	  if (typeof obj === 'function') cbFunc = obj;
	
	  if (!obj || !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || Array.isArray(obj)) {
	    obj = new Error('Must supply an object');
	  } else if (!obj.keyword) obj = new Error('Must have a keyword field');
	
	  if (!!cbFunc && typeof cbFunc !== 'function') {
	    obj = new Error('Callback function must be a function');
	  }
	
	  if (!obj.hl) obj.hl = 'en-US';
	
	  if (!cbFunc) {
	    cbFunc = function cbFunc(err, res) {
	      if (err) return err;
	      return res;
	    };
	  }
	
	  obj = formatTime(obj);
	
	  return {
	    cbFunc: cbFunc,
	    obj: obj
	  };
	};
	
	function formatResolution() {
	  var resolution = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  var resolutions = ['COUNTRY', 'REGION', 'CITY', 'DMA'];
	  var isResValid = resolutions.some(function (res) {
	    return res === resolution.toUpperCase();
	  });
	
	  if (isResValid) return resolution.toUpperCase();
	  return '';
	}
	
	function getResults(searchType, obj) {
	  var map = {
	    'interest over time': {
	      path: '/trends/api/widgetdata/multiline',
	      pos: 0
	    },
	    'interest by region': {
	      path: '/trends/api/widgetdata/comparedgeo',
	      pos: 1,
	      resolution: formatResolution(obj.resolution)
	    },
	    'related topics': {
	      path: '/trends/api/widgetdata/relatedsearches',
	      pos: 2
	    },
	    'related queries': {
	      path: '/trends/api/widgetdata/relatedsearches',
	      pos: 3
	    }
	  };
	
	  var options = {
	    method: 'GET',
	    host: 'www.google.com',
	    path: '/trends/api/explore',
	    qs: {
	      hl: obj.hl,
	      req: JSON.stringify({ comparisonItem: [obj], cat: 0 }),
	      tz: 300
	    }
	  };
	
	  var _map$searchType = map[searchType],
	      pos = _map$searchType.pos,
	      path = _map$searchType.path,
	      resolution = _map$searchType.resolution;
	
	
	  return (0, _request2.default)(options).then(function (results) {
	    var parsedResults = JSON.parse(results.slice(4)).widgets;
	    var req = parsedResults[pos].request;
	
	    if (resolution) req.resolution = resolution;
	    req = JSON.stringify(req);
	    var token = parsedResults[pos].token;
	    var nextOptions = {
	      path: path,
	      method: 'GET',
	      host: 'www.google.com',
	      qs: {
	        hl: obj.hl,
	        req: req,
	        token: token,
	        tz: 300
	      }
	    };
	
	    return (0, _request2.default)(nextOptions);
	  }).then(function (res) {
	    return res.slice(5);
	  });
	};

/***/ },

/***/ 75:
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },

/***/ 95:
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = request;
	
	var _https = __webpack_require__(75);
	
	var _https2 = _interopRequireDefault(_https);
	
	var _querystring = __webpack_require__(95);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function request(_ref) {
	  var method = _ref.method,
	      host = _ref.host,
	      path = _ref.path,
	      qs = _ref.qs;
	
	  var options = {
	    host: host,
	    method: method,
	    path: path + '?' + _querystring2.default.stringify(qs)
	  };
	
	  return new Promise(function (resolve, reject) {
	    var req = _https2.default.request(options, function (res) {
	      var chunk = '';
	
	      res.on('data', function (data) {
	        chunk += data;
	      });
	
	      res.on('end', function () {
	        resolve(chunk.toString('utf8'));
	      });
	    });
	
	    req.on('error', function (e) {
	      reject(e);
	    });
	
	    req.end();
	  });
	};
	module.exports = exports['default'];

/***/ }

/******/ })
});
;
//# sourceMappingURL=google-trends-api.js.map