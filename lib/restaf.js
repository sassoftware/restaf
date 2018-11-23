(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("restaf", [], factory);
	else if(typeof exports === 'object')
		exports["restaf"] = factory();
	else
		root["restaf"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return VIYA_LOGON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return BEGIN_LOGON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return VIYA_LOGOFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return VIYA_LOGON_COMPLETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return VIYA_LOGON_SERVER; });
/* unused harmony export VIYA_LOGON_PROXY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return VIYA_LOGON_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return VIYA_LOGON_IMPLICIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_SERVICE; });
/* unused harmony export ADD_SERVICE_COMPLETE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return API_CALL; });
/* unused harmony export API_BEGIN */
/* unused harmony export API_COMPLETE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return API_CALL_PARALLEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return DELETE_RAF_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return API_POLL; });
/* unused harmony export API_POLL_BEGIN */
/* unused harmony export API_POLL_COMPLETE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return APP_DATA_ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return APP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return APP_DATA_SETSTATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return API_STATUS_ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return API_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return API_STATUS_SETSTATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return API_XSRF_ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return API_XSRF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return API_XSRF_SETSTATE; });
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

/*
 * Copyright (c) 2017 by SAS Institute Inc., Cary, NC USA 27513
 * Author          : K. Deva Kumar
 * Last Modified: 5/23/17 8:49 PM
 *
 */

var VIYA_LOGON = 'VIYA_LOGON';
var BEGIN_LOGON = 'BEGIN_LOGON';
var VIYA_LOGOFF = 'VIYA_LOGOFF';
var VIYA_LOGON_COMPLETE = 'VIYA_LOGON_COMPLETE';
var VIYA_LOGON_SERVER = 'server';
var VIYA_LOGON_PROXY = 'server';
var VIYA_LOGON_PASSWORD = 'password';
var VIYA_LOGON_IMPLICIT = 'implicit';
/* implies token */

var ADD_SERVICE = 'ADD_SERVICE';
var ADD_SERVICE_COMPLETE = 'ADD_SERVICE_COMPLETE';
var API_CALL = 'API_CALL';
var API_BEGIN = 'API_BEGIN';
var API_COMPLETE = 'API_COMPLETE';
var API_CALL_PARALLEL = 'API_PARALLEL';
var DELETE_RAF_OBJECT = 'DELETE_RAF_OBJECT';
var API_POLL = 'API_POLL';
var API_POLL_BEGIN = 'API_POLL_BEGIN';
var API_POLL_COMPLETE = 'API_POLL_COMPLETE';
var APP_DATA_ROOT = '_appdata';
var APP_DATA = 'APP_DATA';
var APP_DATA_SETSTATE = 'APP_DATA_SETSTATE';
var API_STATUS_ROOT = '_apistatus';
var API_STATUS = 'API_STATUS';
var API_STATUS_SETSTATE = 'API_STATUS_SETSTATE';
var API_XSRF_ROOT = '_xsrf';
var API_XSRF = 'API_XSRF';
var API_XSRF_SETSTATE = 'API_XSRF_SETSTATE';

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getResults2__ = __webpack_require__(51);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




function extendFolder(store, f) {
  var wrapper = function wrapper(prePath) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Object(__WEBPACK_IMPORTED_MODULE_0__getResults2__["a" /* default */])(store, f, prePath, args);
    };
  };

  var wrapperItemsCmd = function wrapperItemsCmd(prePath) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.splice(1, 0, 'cmds');
      return Object(__WEBPACK_IMPORTED_MODULE_0__getResults2__["a" /* default */])(store, f, prePath, args);
    };
  };

  return {
    results: wrapper(),
    items: wrapper(['items', 'data']),
    itemsCmd: wrapperItemsCmd(['items', 'data']),
    itemsList: wrapper(['itemsList']),
    links: wrapper(['links']),
    details: wrapper(['details']),
    scrollCmds: wrapper(['scrollCmds']),
    raw: wrapper(['raw']),
    headers: wrapper(['responseHeaders']),
    config: wrapper(['iconfig']),
    host: f.get('host'),
    resultType: f.get('resultType'),
    status: f.get('statusInfo').get('status'),
    statusInfo: f.get('statusInfo').toJS(),
    type: f.get('type'),
    route: f.get('route')
  };
}

/* harmony default export */ __webpack_exports__["a"] = (extendFolder);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = selectLogonInfo;
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


function selectLogonInfo(mainState) {
  var state = mainState.connections;
  var currentNo = state.get('currentConnection');
  return currentNo === -1 ? null : state.get('connections').get(currentNo).toJS().logonInfo;
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viyaLogon__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__responseReducer__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducer__ = __webpack_require__(50);
/* unused harmony reexport responseReducer */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__reducer__["a"]; });
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */








function createReducer(asyncReducers) {
  return Object(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({
    connections: __WEBPACK_IMPORTED_MODULE_2__viyaLogon__["a" /* viyaLogon */]
  }, asyncReducers));
}



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iGetResults__ = __webpack_require__(24);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




function getResults(store, iroute, path) {
  if (path != undefined) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__iGetResults__["a" /* default */])(store, iroute, false, path);
  } else {
    return Object(__WEBPACK_IMPORTED_MODULE_0__iGetResults__["a" /* default */])(store, iroute);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (getResults);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__statusFuncs__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__statusFuncs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__statusFuncs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SASLogonOauthLink__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routeOrFolder__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rootStruct__ = __webpack_require__(13);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__statusFuncs__, "setGoodStatus")) __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__statusFuncs__["setGoodStatus"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__statusFuncs__, "setBadStatus")) __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__statusFuncs__["setBadStatus"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__SASLogonOauthLink__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__rootStruct__["b"]; });
/* unused harmony reexport tLinkStruct */
/* unused harmony reexport itemsStruct */
/* unused harmony reexport routeOrFolder */
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */








/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return trustedGrant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return implicitGrant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return request; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_qs__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fixResponse__ = __webpack_require__(40);



/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/


 // axios.defaults.withCredentials = true

__WEBPACK_IMPORTED_MODULE_2_axios___default.a.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
/* X-Uaa-Csrf */

function trustedGrant(iconfig) {
  'use strict';

  var link = iconfig.link;
  var auth1 = Buffer.from(iconfig.clientID + ':' + iconfig.clientSecret).toString('base64');
  auth1 = 'Basic ' + auth1;
  var config = {
    method: link.method,
    url: iconfig.host + link.href,
    headers: {
      Accept: link.responseType,
      'Content-Type': link.type,

      /* Axios seems to be case sensitive */
      Authorization: auth1
    },
    withCredentials: false,
    data: {
      'grant_type': 'password',
      username: iconfig.user,
      password: iconfig.password
      /*
      client_id    : iconfig.clientID,
      client_secret: iconfig.clientSecret
      */

    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    transformResponse: function transformResponse(data) {
      return data;
    },
    transformRequest: function transformRequest(data) {
      return __WEBPACK_IMPORTED_MODULE_3_qs___default.a.stringify(data);
    }
  };
  return makeCall(config, iconfig);
}

function request(iconfig) {
  'use strict';

  var link = iconfig.link,
      logonInfo = iconfig.logonInfo;

  var iLink = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, link);

  var payload = iconfig.hasOwnProperty('payload') ? iconfig.payload : null;
  var iqs = null;
  var idata = null;
  var iheaders = null;
  var ixsrf = null;
  var casAction = null;

  if (payload !== null) {
    casAction = hasItem(payload, 'action');
    iqs = hasItem(payload, 'qs');
    idata = hasItem(payload, 'data');
    iheaders = hasItem(payload, 'headers');
    ixsrf = hasItem(payload, 'xsrf');
  }

  var url = "".concat(logonInfo.host).concat(iLink.href); // handle casaction upload

  casAction = casAction != null ? casAction.toLowerCase() : null;

  if (casAction === 'upload') {
    casAction = 'table.upload';
  }

  if (casAction !== null) {
    url = "".concat(url, "/").concat(casAction);
  }

  if (iLink.hasOwnProperty('customHandling') && casAction !== null) {
    // casAction = casAction.toLowerCase();
    if (casAction === 'table.upload') {
      iLink.method = 'PUT';
      iLink.type = 'application/octet-stream';
      iLink.responseType = 'application/json';
    }
  }

  var config = {
    method: iLink.method,
    url: url,
    transformResponse: function transformResponse(data) {
      return data;
    }
  };

  if (logonInfo.type !== 'server') {
    if (logonInfo.token !== null) {
      config.headers = {
        Authorization: logonInfo.tokenType + ' ' + logonInfo.token
      };
    } else {
      config.headers = {};
      config.withCredentials = true;
    }
  } else {
    config.headers = {};
    config.withCredentials = true;
  }

  var type = fullType(iLink.type);

  if (iLink.hasOwnProperty('responseType')) {
    config.headers['Content-Type'] = type;
    config.headers.Accept = fullType(iLink.responseType);
  } else if (type !== null) {
    config.headers.Accept = type;

    if (iLink.method === 'PUT' || iLink.method === 'POST' || iLink.method === 'PATCH') {
      config.headers['Content-Type'] = type;
    }
  }

  if (iheaders !== null) {
    for (var ih in iheaders) {
      //noinspection JSUnfilteredForInLoop
      if (ih.toLowerCase() === 'json-parameters') {
        //noinspection JSUnfilteredForInLoop
        config.headers[ih] = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof___default()(iheaders[ih]) === 'object' ? JSON.stringify(iheaders[ih]) : iheaders[ih];
      } else {
        //noinspection JSUnfilteredForInLoop
        config.headers[ih] = iheaders[ih];
      }
    }
  }

  if (ixsrf !== null) {
    var xsrfHeaderName = ixsrf['x-csrf-header'];
    config.xsrfHeaderName = xsrfHeaderName;
    config.headers[xsrfHeaderName] = ixsrf['x-csrf-token'];
  }

  if (iqs !== null) {
    config.params = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, iqs);
  }

  config.data = idata === null ? {} : idata; // console.log(config);

  config.maxContentLength = 2 * 10063256;
  return makeCall(config, iconfig);
}

function makeCall(config, iconfig) {
  return new Promise(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2_axios___default()(config).then(function (response) {
      parseJSON(response.data).then(function (data) {
        iconfig.data = null;
        /* get rid of the payload*/

        response.data = {
          results: data,
          iconfig: Object.assign({}, iconfig)
        };

        if (data.hasOwnProperty('errorCode')) {
          //noinspection JSUnresolvedVariable
          response.status = response.data.results.httpStatusCode;
          response.statusText = "errorCode: ".concat(response.data.results.errorCode);
          reject({
            response: response
          });
        } else {
          resolve(Object(__WEBPACK_IMPORTED_MODULE_4__fixResponse__["a" /* default */])(response));
        }
      }).catch(function () {
        iconfig.data = null;
        response.data = {
          results: response.data,
          iconfig: Object.assign({}, iconfig)
        };
        resolve(Object(__WEBPACK_IMPORTED_MODULE_4__fixResponse__["a" /* default */])(response));
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}

function parseJSON(data) {
  //noinspection JSUnusedLocalSymbols
  return new Promise(function (resolve, reject) {
    if (__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof___default()(data) === 'object') {
      resolve(data);
    } else {
      var temp = data.replace(/\r?\n|\r/g, ' ');

      try {
        var odata = JSON.parse(temp);
        resolve(odata);
      } catch (err) {
        resolve(data);
      }
    }
  });
}

function hasItem(payload, name) {
  var _arr = Object.keys(payload);

  for (var _i = 0; _i < _arr.length; _i++) {
    var k = _arr[_i];

    if (k.toUpperCase() === name.toUpperCase()) {
      return payload[k];
    }
  }

  return null;
}

function fullType(type) {
  var ntype = type;

  if (ntype === undefined || ntype === null) {
    ntype = null;
  } else {
    if (ntype.indexOf('application/vnd') !== -1) {
      if (ntype.indexOf('+json') === -1) {
        ntype = ntype + '+json';
      }
    }
  }

  return ntype;
} // Code below is for experimenting.


function implicitGrant(iconfig) {
  /* */
  var link = iconfig.link;
  window.location.href = "".concat(iconfig.host + link.href, "?response_type=").concat(link.responseType, "&client_id=").concat(iconfig.clientID);
  return new Promise.resolve();
}



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tLinkStruct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return itemsStruct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return statusInfoStruct; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(0);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




function tLinkStruct(name, type, service) {
  if (service === __WEBPACK_IMPORTED_MODULE_0__actionTypes__["l" /* APP_DATA_ROOT */] || service === __WEBPACK_IMPORTED_MODULE_0__actionTypes__["f" /* API_STATUS_ROOT */] || service === __WEBPACK_IMPORTED_MODULE_0__actionTypes__["i" /* API_XSRF_ROOT */]) {
    return {
      structType: service,
      type: service,
      route: service,
      routeList: [],
      userData: {}
    };
  }

  var relPath = {
    structType: type,
    type: type,
    title: name,
    method: 'GET',

    /* for cmd tLinks - useful in UI */
    iconfig: {},

    /* input config */
    payload: {},
    statusInfo: statusInfoStruct(),
    runStatus: 'idle',
    parentRoute: '',
    route: '',
    resultType: '',
    links: {},

    /* same structures */

    /*  cmds      : {}, */
    scrollCmds: {},

    /* same structure */
    paginator: false,
    itemsList: [],
    items: [],

    /* items Struct */
    details: {},
    stateEvent: null,
    responseHeaders: {},
    link: null,
    raw: {}
  };

  if (arguments.length === 3) {
    relPath.link = {
      method: 'GET',
      title: service,
      href: '/' + service + '/',
      rel: 'root',
      type: 'application/vnd.sas.api',
      uri: '/' + service + '/'
    };
    relPath.route = "".concat(service, ":/").concat(service);
    relPath.parentRoute = service;
  }

  return relPath;
}
/* also for info */


function itemsStruct() {
  return {
    name: '',
    type: '',
    resultType: '',
    cmds: null,
    data: null
  };
}

function statusInfoStruct() {
  return {
    status: 0,
    statusText: ' ',
    error: false,
    details: ' '
  };
}



/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reducers__ = __webpack_require__(9);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




var injectAsyncReducers = function injectAsyncReducers(store, name, asyncReducer) {
  if (store.asyncReducers.hasOwnProperty(name)) {
    delete store.asyncReducers[name];
  }

  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(Object(__WEBPACK_IMPORTED_MODULE_0__reducers__["a" /* createReducer */])(store.asyncReducers));
  return true;
};

/* harmony default export */ __webpack_exports__["a"] = (injectAsyncReducers);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iapiCall__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(0);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */





var apiCall = function apiCall(store, iroute, payload, delay) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__iapiCall__["a" /* default */])(store, iroute, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["b" /* API_CALL */], payload, delay, null);
};

/* harmony default export */ __webpack_exports__["a"] = (apiCall);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getResults__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extendFolder__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prepareAction__ = __webpack_require__(25);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


var _arguments = arguments;




var iapiCall = function iapiCall(store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext) {
  return new Promise(function (resolve, reject) {
    var route;
    var unSubscribe;
    var start = true; // create action

    var action = Object(__WEBPACK_IMPORTED_MODULE_2__prepareAction__["a" /* default */])(store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext);

    if (action === null) {
      reject({
        error: 'Bad route and/or rafLink',
        args: JSON.stringify(_arguments, null, 4)
      });
    } // save route
    //noinspection JSUnresolvedVariable


    route = action.route; // subscribe callback

    var nextE = function nextE() {
      if (start) {
        start = false;
        return;
      }

      var f = Object(__WEBPACK_IMPORTED_MODULE_0__getResults__["a" /* default */])(store, route);

      if (!f) {
        /* should never happen, hmmm! */
        unSubscribe();
        reject({
          error: 'Hmmm! Failed to resolve route in apiCall callback - should never happen. Call Programmer',
          route: route
        });
      } else {
        var runStatus = f.get('runStatus');

        if (runStatus === 'error') {
          unSubscribe();
          reject(f.get('statusInfo'));
        } else if (runStatus === 'ready') {
          unSubscribe();
          resolve(Object(__WEBPACK_IMPORTED_MODULE_1__extendFolder__["a" /* default */])(store, f));
        }
      }
    }; // subscribe to store


    unSubscribe = store.subscribe(nextE); // dispatch action

    store.dispatch(action);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (iapiCall);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getResults__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prepareAction__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__extendFolder__ = __webpack_require__(6);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */







var apiCallAll = function apiCallAll(store, allActions, delay) {
  return new Promise(function (resolve, reject) {
    //
    // create actionArray
    //
    var actionArray = allActions.map(function (acti) {
      //noinspection JSUnresolvedVariable
      var iroute = acti.rafLink;
      var payload = acti.hasOwnProperty('payload') === true ? acti.payload : null;
      var action = Object(__WEBPACK_IMPORTED_MODULE_2__prepareAction__["a" /* default */])(store, iroute, __WEBPACK_IMPORTED_MODULE_0__actionTypes__["b" /* API_CALL */], payload, delay, null, null, null);

      if (action === null) {
        reject({
          err: 'Invalid route and/or rafLink',
          args: JSON.stringify(acti, null, 4)
        });
      }

      return action;
    }); //
    // set start state
    //

    var start = true; //
    // subscribe callback
    //

    var nextE = function nextE() {
      if (start) {
        start = false;
        return;
      }

      var folders = []; //
      // check for completion
      //

      for (var i = 0; i < actionArray.length; i++) {
        //noinspection JSUnresolvedVariable
        var f = Object(__WEBPACK_IMPORTED_MODULE_1__getResults__["a" /* default */])(store, actionArray[i].route);

        if (f !== null) {
          var runStatus = f.get('runStatus');

          if (runStatus === 'error') {
            unSubscribe();
            var err = {
              jobNo: i,
              detail: f.get('statusInfo')
            };
            reject(err);
          } else if (runStatus === 'ready') {
            folders.push(Object(__WEBPACK_IMPORTED_MODULE_3__extendFolder__["a" /* default */])(store, f));
          }
        }
      } //
      // If all done the resolve promise
      //


      if (folders.length === actionArray.length) {
        resolve(folders);
      }
    }; //
    // subscribe to store
    //


    var unSubscribe = store.subscribe(nextE); //
    // dispatch array actions
    // interval is place holder - TBD
    //

    store.dispatch({
      type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["c" /* API_CALL_PARALLEL */],
      actionArray: actionArray
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = (apiCallAll);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serverCalls__ = __webpack_require__(12);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/




function httpCall(config) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__serverCalls__["b" /* request */])(config).then(function (response) {
    return httpDone(response, config, false);
  }).catch(function (error) {
    return httpDone(error, config, true);
  });
}

function httpDone(payload, config, error) {
  return {
    error: error,
    type: config.serviceName + '_' + config.type + '_COMPLETE',
    config: config,
    payload: payload
  };
}

/* harmony default export */ __webpack_exports__["a"] = (httpCall);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return responseReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__ = __webpack_require__(13);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */








var responseReducer = function responseReducer(action, parentPath) {
  var response = null;
  /* */

  if (action.error === true) {
    response = Object(__WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__["c" /* tLinkStruct */])('error', 'error');
    response.link = action.config.href;
    response.runStatus = 'error';
    response.statusInfo = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* setBadStatus */])(action.payload);
    return response;
  }

  var results = action.payload.data.results;
  var contentType = '';

  if (results.hasOwnProperty('accept') === true) {
    contentType = results.accept;
  } else if (action.payload.headers.hasOwnProperty('content-type') === true) {
    contentType = action.payload.headers['content-type'].split(';')[0].split('+json')[0];
  } else {
    if (action.payload.status === 204) {
      contentType = 'No Content';
    }
  } // results with a list of items


  if (results.hasOwnProperty('items')) {
    response = itemsReducer(results, parentPath);
    response.resultType = results.accept == undefined ? contentType : results.accept; // result has links and data
  } else if (results.hasOwnProperty('links')) {
    /* got just links */
    response = tLinkReducer(results.links, parentPath);

    var data = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread___default()({}, results);

    delete data.links; // Need to handle the cases as in vnd.sas.data.row.set which return data with no items array

    for (var key in data) {
      if (key !== 'version') {
        response.type = 'data'; // change type of link to data

        break;
      }
    }

    response.items = {
      resultType: 'data',
      data: data,
      cmds: null
    };
    response.resultType = contentType; // plain data case - no links at the top level
  } else {
    response = Object(__WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__["c" /* tLinkStruct */])('data', 'data');
    response.type = 'data';
    response.resultType = contentType;
    response.items = {
      resultType: contentType,
      data: typeof results === 'string' ? results : Object.assign({}, results),
      cmds: null
    };
  }
  /* response.raw = Object.assign( {}, results );*/
  //noinspection JSUnresolvedVariable


  response.link = action.config.link.href;
  response.runStatus = 'ready';
  response.statusInfo = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* setGoodStatus */])(action.payload);
  var c = action.config;
  var hc = action.payload.config;
  var temp = hc.url.split('/');
  response.host = "".concat(temp[0], "//").concat(temp[2]);
  response.iconfig = {
    input: {
      link: __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread___default()({}, c.link),
      payload: c.hasOwnProperty('payload') ? Object.assign({}, c.payload) : {}
    },
    http: {
      url: hc.url,
      payload: {
        headers: [].concat(hc.headers),
        data: hc.data == null ? {} : __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof___default()(hc.data) === 'object' ? Object.assign({}, hc.data) : hc.data,
        qs: hc.params == null ? {} : __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof___default()(hc.params) === 'object' ? Object.assign({}, hc.params) : hc.params
      }
    }
  };
  return response;
};

function tLinkReducer(iLinks, parentPath) {
  var r = Object(__WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__["c" /* tLinkStruct */])(parentPath[parentPath.length - 1], 'links');

  if (iLinks === null || iLinks.length === 0) {
    return r;
  }

  r.links = setupRelPaths(iLinks, parentPath, 'lcmds');
  r.type = 'links';
  r.scrollCmds = setupRelPaths(iLinks, parentPath, 'scrollCmds');
  return r;
}

function setupRelPaths(iLinks, parentPath, subType) {
  var subCmds = ['next', 'prev', 'first', 'last'];
  var tlinks;

  if (subType === 'links') {
    tlinks = iLinks;
  } else if (subType === 'cmds' || subType === 'lcmds') {
    tlinks = iLinks.filter(function (l) {
      return !subCmds.includes(l.rel);
    });
  } else if (subType === 'scrollCmds') {
    tlinks = iLinks.filter(function (l) {
      return subCmds.includes(l.rel);
    });
  } else {
    tlinks = iLinks;
  }

  if (subType === 'lcmds') {
    subType = 'links';
  }

  var tSearchPath = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default()(parentPath).concat([subType]);

  var linksMap = {};
  tlinks.map(function (l) {
    var ts = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default()(tSearchPath).concat([l.rel]);

    if (l.hasOwnProperty('title') === false) {
      l.title = l.rel;
    }

    var lx = {
      link: __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread___default()({}, l),
      method: l.method,
      route: ts.join(':/'),
      parentRoute: __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default()(parentPath).join(':/'),
      paginator: subCmds.includes(l.rel)
    };
    linksMap[l.rel] = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread___default()({}, Object(__WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__["c" /* tLinkStruct */])(l.title, subType), lx);
  });
  return linksMap;
}

function itemsReducer(results, parentPath) {
  var idList = [];
  var rows = {};
  var response = Object(__WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__["c" /* tLinkStruct */])(parentPath[parentPath.length - 1], 'links');
  var itemsResponse = Object(__WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__["a" /* itemsStruct */])();
  response.resultType = results.accept;
  response.details = setDetails(results);

  if (results.hasOwnProperty('name')) {
    itemsResponse.name = results.name;
  }

  if (results.hasOwnProperty('links')) {
    response.links = setupRelPaths(results.links, parentPath, 'lcmds');
    response.scrollCmds = setupRelPaths(results.links, parentPath, 'scrollCmds');
  }

  if (Array.isArray(results.items) === false) {
    itemsResponse.data = results.items;
    itemsResponse.resultType = results.accept;

    if (results.items.hasOwnProperty('customHandling')) {
      itemsResponse.type = results.items.customHandling;
      response.type = results.items.customHandling;
    } else {
      itemsResponse.type = 'items';
      response.type = 'items';
    }

    response.items = itemsResponse;
    return response;
  }

  if (results.items.length === 0) {
    itemsResponse.resultType = results.accept;
    itemsResponse.data = [];
    itemsResponse.type = 'itemsList';
    response.type = 'itemsList';
    response.items = itemsResponse;
    response.itemsList = [];
    return response;
  } else if (results.items[0].hasOwnProperty('links')) {
    var index = -1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = results.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        index++;
        var name = void 0;

        if (item.hasOwnProperty('name2')) {
          name = item.name2;
        } else {
          name = item.hasOwnProperty('name') ? item.name : item.hasOwnProperty('id') ? item.id : "".concat(index);
        }

        idList.push(name);

        var tRoute = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default()(parentPath).concat(['items', 'data', name]);

        var rowcmds = setupRelPaths(item.links, tRoute, 'cmds');

        var data = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread___default()({}, item);

        delete data.links;
        var row = Object(__WEBPACK_IMPORTED_MODULE_4__utils_rootStruct__["a" /* itemsStruct */])();
        row.type = 'itemRow';
        row.name = name;
        row.resultType = data.hasOwnProperty('contentType') === true ? data['contentType'] : 'unknown';
        row.cmds = rowcmds;
        row.data = data;
        rows[name] = row;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    itemsResponse.data = rows;
    itemsResponse.resultType = results.accept;
    itemsResponse.type = 'itemsList';
    response.itemsList = idList.concat();
    response.type = 'itemsList';
  } else {
    /**/
    itemsResponse.data = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default()(results.items);
    itemsResponse.resultType = results.accept;
    itemsResponse.type = 'itemsArray';
    response.type = 'itemsArray';
  }

  response.items = itemsResponse;
  return response;
}

function setDetails(results) {
  var r = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectSpread___default()({}, results);

  if (r.hasOwnProperty('links')) {
    delete r.links;
  }

  if (r.hasOwnProperty('items')) {
    delete r.items;
  }

  return r;
}



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray__);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




var Immutable = __webpack_require__(4);

function iGetResults(store, iroute, keyOnly) {
  var result;
  var route;
  var iquery = [];
  var q;
  var serviceName;
  var folder;
  var path = [];

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  if (args != null) {
    iquery = Array.isArray(args[0]) === true ? args[0] : args;
  }

  if (typeof iroute === 'string') {
    route = iroute;
    q = route.split(':/');
    serviceName = q.shift();
    folder = store.getState()[serviceName];
    path = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default()(q).concat(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toConsumableArray___default()(iquery));
  } else {
    path = iquery;

    if (Immutable.Iterable.isIterable(iroute)) {
      folder = iroute;
    } else {
      return null;
    }
  } // should never happen but...


  if (folder == null) {
    return null;
  }

  result = path.length > 0 ? folder.getIn(path, null) : folder;

  if (result !== null) {
    if (keyOnly === true && Immutable.Iterable.isIterable(result) === true) {
      result = result.keySeq();
    }
  }

  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (iGetResults);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getResults__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getXsrfData__ = __webpack_require__(26);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


var Immutable = __webpack_require__(4);




var prepareAction = function prepareAction(store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext) {
  var paginator;
  var route;
  var link;
  var serviceName;
  var current;

  if (typeof iroute === 'string') {
    current = Object(__WEBPACK_IMPORTED_MODULE_0__getResults__["a" /* default */])(store, iroute);
    route = iroute;
  } else {
    current = iroute;
    route = current.get('route');
  }

  if (current === null || Immutable.Iterable.isIterable(current) === false) {
    return null;
  }
  /* */


  paginator = current.get('paginator');
  link = current.get('link').toJS();

  if (paginator) {
    route = current.get('parentRoute');
    serviceName = route.split(':/')[0];
  } else {
    var searchPath = route.split(':/');
    serviceName = searchPath[0];
    searchPath.splice(1, 0, store.apiCallNo);
    route = searchPath.join(':/');
    store.apiCallNo++;
  }

  var action = {
    type: actionType,
    delay: delay == null ? 0 : delay,
    paginator: paginator,
    serviceName: serviceName,
    route: route,
    eventHandler: eventHandler,
    parentRoute: parentRoute,
    jobContext: jobContext,
    link: link
  };

  if (link.href.indexOf('casProxy') >= 0) {
    serviceName = 'casProxy';
  }

  var xsrfHeader = Object(__WEBPACK_IMPORTED_MODULE_1__getXsrfData__["a" /* default */])(store, serviceName);

  if (payload != null) {
    action.payload = payload;
  }

  if (xsrfHeader !== null) {
    if (payload != null) {
      action.payload.xsrf = xsrfHeader;
    } else {
      action.payload = {
        xsrf: xsrfHeader
      };
    }
  }

  return action;
};

/* harmony default export */ __webpack_exports__["a"] = (prepareAction);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(0);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




function getXsrfData(store) {
  var list = store.getState()[__WEBPACK_IMPORTED_MODULE_0__actionTypes__["i" /* API_XSRF_ROOT */]];

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var path = args.length > 0 ? ['userData'].concat(args) : ['userData'];
  var xsrf = list.getIn(path, null);
  return xsrf !== null ? xsrf.toJS() : null;
}

/* harmony default export */ __webpack_exports__["a"] = (getXsrfData);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ijobState__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiCall__ = __webpack_require__(16);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */







function jobState(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
  return _jobState.apply(this, arguments);
}

function _jobState() {
  _jobState = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(store, job, payload, maxTries, delay, progressHandler, jobContext) {
    var waitFlag, tries, status, failed;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            waitFlag = false;
            tries = 1;

            if (maxTries === 'wait') {
              tries = 1;
              waitFlag = true;
            } else {
              tries = !maxTries ? 1 : maxTries;
            }

          case 3:
            _context.next = 5;
            return Object(__WEBPACK_IMPORTED_MODULE_2__ijobState__["a" /* default */])(store, job, payload, delay, waitFlag, progressHandler, jobContext);

          case 5:
            status = _context.sent;
            failed = status.detail.hasOwnProperty('failed');

            if (!(status.running === 0)) {
              _context.next = 13;
              break;
            }

            tries = 0;

            if (!(failed === false)) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return Object(__WEBPACK_IMPORTED_MODULE_3__apiCall__["a" /* default */])(store, job.links('self'));

          case 12:
            status.jobState.job = _context.sent;

          case 13:
            if (--tries > 0) {
              _context.next = 3;
              break;
            }

          case 14:
            return _context.abrupt("return", status.jobState);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _jobState.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["a"] = (jobState);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
 // import {APP_DATA} from '../actionTypes';

function appData(store, type, route, payload) {
  var action = {
    type: type,
    route: route,
    payload: payload
  };
  store.dispatch(action);
}

/* harmony default export */ __webpack_exports__["a"] = (appData);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


var endStore = function endStore(store) {
  store.dispatch({
    type: 'END'
  });
};

/* harmony default export */ __webpack_exports__["a"] = (endStore);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(32);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "initStore", function() { return __WEBPACK_IMPORTED_MODULE_0__store__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "endStore", function() { return __WEBPACK_IMPORTED_MODULE_0__store__["a"]; });
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */



console.log(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* initStore */]);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__initStore__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__endStore__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__initStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__endStore__["a"]; });
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */






/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configureSagaStore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__injectAsyncReducers__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apiCall__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apiCallAll__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__runAction__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apiSubmit__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__jobState__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__jobStateAll__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__request__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__getServices__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__addServices__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__getServiceRoot__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__logon__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__logoff__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__endStore__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__routeToObj__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__selectLogonInfo__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__appData__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__getXsrfData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__deleteRafObject__ = __webpack_require__(66);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */












 // import jobStatus    from './jobStatus';













function initStore() {
  var store = Object(__WEBPACK_IMPORTED_MODULE_0__configureSagaStore__["a" /* default */])();
  Object(__WEBPACK_IMPORTED_MODULE_2__injectAsyncReducers__["a" /* default */])(store, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["f" /* API_STATUS_ROOT */], Object(__WEBPACK_IMPORTED_MODULE_3__reducers__["b" /* reducer */])(__WEBPACK_IMPORTED_MODULE_1__actionTypes__["f" /* API_STATUS_ROOT */]));
  Object(__WEBPACK_IMPORTED_MODULE_2__injectAsyncReducers__["a" /* default */])(store, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["l" /* APP_DATA_ROOT */], Object(__WEBPACK_IMPORTED_MODULE_3__reducers__["b" /* reducer */])(__WEBPACK_IMPORTED_MODULE_1__actionTypes__["l" /* APP_DATA_ROOT */]));
  Object(__WEBPACK_IMPORTED_MODULE_2__injectAsyncReducers__["a" /* default */])(store, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["i" /* API_XSRF_ROOT */], Object(__WEBPACK_IMPORTED_MODULE_3__reducers__["b" /* reducer */])(__WEBPACK_IMPORTED_MODULE_1__actionTypes__["i" /* API_XSRF_ROOT */]));
  return {
    logon: __WEBPACK_IMPORTED_MODULE_14__logon__["a" /* default */].bind(null, store),
    logoff: __WEBPACK_IMPORTED_MODULE_15__logoff__["a" /* default */].bind(null, store),
    connection: loggedOn.bind(null, store),
    addServices: __WEBPACK_IMPORTED_MODULE_12__addServices__["a" /* default */].bind(null, store),
    getServices: __WEBPACK_IMPORTED_MODULE_11__getServices__["a" /* default */].bind(null, store),
    apiCall: __WEBPACK_IMPORTED_MODULE_4__apiCall__["a" /* default */].bind(null, store),
    runAction: __WEBPACK_IMPORTED_MODULE_6__runAction__["a" /* default */].bind(null, store),
    apiCallAll: __WEBPACK_IMPORTED_MODULE_5__apiCallAll__["a" /* default */].bind(null, store),
    rafObject: __WEBPACK_IMPORTED_MODULE_17__routeToObj__["a" /* default */].bind(null, store),
    deleteRafObject: __WEBPACK_IMPORTED_MODULE_21__deleteRafObject__["a" /* default */].bind(null, store),
    jobState: __WEBPACK_IMPORTED_MODULE_8__jobState__["a" /* default */].bind(null, store),
    jobStateAll: __WEBPACK_IMPORTED_MODULE_9__jobStateAll__["a" /* default */].bind(null, store),
    submit: __WEBPACK_IMPORTED_MODULE_7__apiSubmit__["a" /* default */].bind(null, store),
    submitStatus: getApiStatus.bind(null, store),
    setAppData: __WEBPACK_IMPORTED_MODULE_19__appData__["a" /* default */].bind(null, store, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["k" /* APP_DATA */]),
    getAppData: getAppData.bind(null, store),
    setXsrfData: __WEBPACK_IMPORTED_MODULE_19__appData__["a" /* default */].bind(null, store, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["h" /* API_XSRF */]),
    getXsrfData: __WEBPACK_IMPORTED_MODULE_20__getXsrfData__["a" /* default */].bind(null, store),
    getState: store.getState,
    endStore: __WEBPACK_IMPORTED_MODULE_16__endStore__["a" /* default */].bind(null, store),
    store: store,
    getServiceRoot: __WEBPACK_IMPORTED_MODULE_13__getServiceRoot__["a" /* default */].bind(null, store),
    request: __WEBPACK_IMPORTED_MODULE_10__request__["a" /* default */]
  };
}

function loggedOn(store) {
  return Object(__WEBPACK_IMPORTED_MODULE_18__selectLogonInfo__["a" /* default */])(store.getState());
}

function getAppData(store) {
  var list = store.getState()[__WEBPACK_IMPORTED_MODULE_1__actionTypes__["l" /* APP_DATA_ROOT */]];

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var path = args.length > 0 ? ['userData'].concat(args) : ['userData'];
  return list.getIn(path, null);
}

function getApiStatus(store, jobContext) {
  var list = store.getState()[__WEBPACK_IMPORTED_MODULE_1__actionTypes__["f" /* API_STATUS_ROOT */]];
  var result = null;

  if (!jobContext) {
    result = list.get('routeList');
  } else {
    var r = list.getIn(['userData', jobContext], null);

    if (r !== null) {
      result = r.toJS();
      result.job = Object(__WEBPACK_IMPORTED_MODULE_17__routeToObj__["a" /* default */])(store, result.route);
    }
  }

  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (initStore);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureSagaStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sagas__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__injectAsyncReducers__ = __webpack_require__(15);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */







/**
 *
 * Configure the Redux store with redux-saga middleware. Store extended for SAS Viya
 * @constructor
 */

function configureSagaStore() {
  var sagaMiddleWare = __WEBPACK_IMPORTED_MODULE_1_redux_saga___default()();
  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(Object(__WEBPACK_IMPORTED_MODULE_3__reducers__["a" /* createReducer */])(), Object(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(sagaMiddleWare));
  store.asyncReducers = {};
  store.injectAsyncReducers = __WEBPACK_IMPORTED_MODULE_4__injectAsyncReducers__["a" /* default */];
  store.apiCallNo = 0; //noinspection JSUnresolvedFunction

  sagaMiddleWare.run(__WEBPACK_IMPORTED_MODULE_2__sagas__["a" /* default */]);
  return store;
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logonAction__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiCallAction__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiCallAllAction__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apiPollAction__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__appDataAction__ = __webpack_require__(48);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/




var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(rootSaga);







function rootSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return [Object(__WEBPACK_IMPORTED_MODULE_1__logonAction__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_2__apiCallAction__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_3__apiCallAllAction__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_4__apiPollAction__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_5__appDataAction__["a" /* default */])()];

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/* harmony default export */ __webpack_exports__["a"] = (rootSaga);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actionTypes__ = __webpack_require__(0);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/





var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.mark(logonAction);





function logonAction() {
  var f, action, payload, _payload;

  return __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.wrap(function logonAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          f = true;

        case 1:
          if (!f) {
            _context.next = 20;
            break;
          }

          _context.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["take"])(__WEBPACK_IMPORTED_MODULE_4__actionTypes__["q" /* VIYA_LOGON */]);

        case 4:
          action = _context.sent;
          _context.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_4__actionTypes__["n" /* BEGIN_LOGON */]
          });

        case 7:
          _context.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["call"])(sasLogon, action);

        case 9:
          payload = _context.sent;
          _context.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])(payload);

        case 12:
          if (!(payload.error === false)) {
            _context.next = 18;
            break;
          }

          _context.next = 15;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["take"])(__WEBPACK_IMPORTED_MODULE_4__actionTypes__["p" /* VIYA_LOGOFF */]);

        case 15:
          _payload = {
            type: __WEBPACK_IMPORTED_MODULE_4__actionTypes__["p" /* VIYA_LOGOFF */],
            payload: null
          };
          _context.next = 18;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])(_payload);

        case 18:
          _context.next = 1;
          break;

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function sasLogon(action) {
  var config = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, action.payload);
  /* */


  if (config.authType === __WEBPACK_IMPORTED_MODULE_4__actionTypes__["u" /* VIYA_LOGON_SERVER */] || config.authType === __WEBPACK_IMPORTED_MODULE_4__actionTypes__["s" /* VIYA_LOGON_IMPLICIT */]) {
    return {
      type: config.authType,
      error: false,
      payload: {
        iconfig: config
      }
    };
  } else {
    var t = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* SASLogonOauthLink */])(config.authType);
    config.link = t.link;
    return t.logon(config).then(function (response) {
      return viyaLogonSuccess(response);
    }).catch(function (error) {
      return viyaLogonError(error);
    });
  }
}

function viyaLogonSuccess(payload) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_4__actionTypes__["r" /* VIYA_LOGON_COMPLETE */],
    error: false,
    payload: payload
  };
}

function viyaLogonError(payload) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_4__actionTypes__["r" /* VIYA_LOGON_COMPLETE */],
    error: true,
    payload: payload
  };
}

/* harmony default export */ __webpack_exports__["a"] = (logonAction);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


exports.setGoodStatus = function (payload) {
  return {
    status: payload.status,
    statusText: payload.statusText,
    detail: ' ',
    error: false
  };
};

exports.setBadStatus = function (payload) {
  var code = 0;
  var detail = ' ';

  if (payload.hasOwnProperty('response') && payload.response != null) {
    code = payload.response.status;
    detail = payload.response.hasOwnProperty('data') ? payload.response.data : payload.response.statusText;
  }

  return {
    status: code,
    statusText: payload.message,
    detail: detail,
    error: true
  };
};

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SASLogonOauthLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serverCalls__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(0);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */





var SASLogonOauthLink = function SASLogonOauthLink(type) {
  if (type === __WEBPACK_IMPORTED_MODULE_1__actionTypes__["t" /* VIYA_LOGON_PASSWORD */] || type == undefined) {
    return {
      logon: __WEBPACK_IMPORTED_MODULE_0__serverCalls__["c" /* trustedGrant */],
      link: {
        href: '/SASLogon/oauth/token',
        method: 'POST',
        rel: 'logon',
        responseType: 'application/json',
        type: 'application/x-www-form-urlencoded',
        uri: '/SASLogon/oauth/token'
      }
    };
  } else {
    return {
      logon: __WEBPACK_IMPORTED_MODULE_0__serverCalls__["a" /* implicitGrant */],
      link: {
        href: '/SASLogon/oauth/authorize',
        method: 'GET',
        rel: 'logon',
        responseType: type,
        uri: '/SASLogon/oauth/authorize'
      }
    };
  }
};
/*
 * redirectUri not specified - /SASLogon/oauth/token?
 */




/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/


function fixResponse(response) {
  //
  // Ensure all header keys are lowercase
  //
  var headers = {};

  for (var k in response.headers) {
    //noinspection JSUnfilteredForInLoop
    var k1 = k.toLowerCase(); //noinspection JSUnfilteredForInLoop

    headers[k1] = response.headers[k];
  }

  response.headers = headers;
  var cType = response.headers['content-type'];

  if (cType == null || typeof response.data.results === 'string') {
    return response;
  } // let contentType = cType.split(';') [0];


  var iLink = response.data.iconfig.link;
  fixCas(iLink, response);
  fixImages(iLink, response);
  fixReports(iLink, response);
  return response;
}

function fixImages(iLink, response) {
  if (iLink.href.indexOf('reportImages/jobs') > 0) {
    if (response.data.results.hasOwnProperty('images') === true) {
      var images = response.data.results.images;
      var items = Array.isArray(images) === true ? [].concat(images) : Object.assign({}, images);
      items[0].id = 'image';
      response.data.results.items = items;
      delete response.data.results.images;
    }
  }
}

function fixCas(iLink, response) {
  // special handling for cas
  if (iLink.rel === 'createSession' && iLink.responseType === 'application/vnd.sas.cas.session') {
    var linkExtension = sessionLinks(iLink, response.data.results.id);
    response.data.results.links = response.data.results.links.concat(linkExtension); // response.data.results.links = response.data.results.links.concat(fixCasSession(iLink, response.data.results));

    response.data.results.name2 = response.data.results.name.split(':')[0];
  }

  if (iLink.hasOwnProperty('itemType') && iLink.itemType === 'application/vnd.sas.cas.session.summary') {
    var items = response.data.results.items;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      var _linkExtension = sessionLinks(iLink, item.id);

      item.links = item.links.concat(_linkExtension);
    }
  }

  if (iLink.hasOwnProperty('customHandling')) {
    response.data.results = reduceCasResult(response.data.results);
    response.data.results = {
      items: Object.assign({}, response.data.results)
    };
    response.data.results.castomHandling = iLink.customHandling;
  }

  if ((iLink.href === '/casManagement/' || iLink.href === '/casManagement') && iLink.method === 'GET') {
    response.data.results.links.map(function (l) {
      if (l.rel === 'collection') {
        l.title = 'servers';
        l.rel = 'servers';
        l.patch = 'cas';
      }

      return l;
    });
  }

  if (iLink.hasOwnProperty('patch') && iLink.rel === 'servers') {
    var _items = response.data.results.items;

    var _loop = function _loop(_i) {
      var item = _items[_i];
      var name = item.name;
      var ll = item.links.map(function (l) {
        l.casHttp = "".concat(name, "-http");
        return l;
      });
      item.links = ll;
    };

    for (var _i = 0; _i < _items.length; _i++) {
      _loop(_i);
    }
  }
}

function fixReports(iLink, response) {
  if (iLink.href === '/reports/reports' && iLink.method === 'GET') {
    var items = response.data.results.items;

    for (var i = 0; i < items.length; i++) {
      var reportUri = "/SASReportViewer/?reportUri=/reports/reports/".concat(items[i].id);
      var l = {
        method: 'GET',
        href: reportUri,
        rel: 'viewer',
        uri: reportUri,
        type: 'text/html',
        itemType: 'text/html',
        title: 'Report Viewer',
        extended: true
      };
      items[i].links.push(l);
    }
  }
}

function reduceCasResult(data) {
  var tables = {};

  if (data.hasOwnProperty('results') === false) {
    return data;
  }

  var results = Object.assign({}, data.results);

  for (var k in results) {
    //noinspection JSUnfilteredForInLoop
    var o = results[k];

    if (o.hasOwnProperty('_ctb') === true && o['_ctb'] === true) {
      //noinspection JSUnfilteredForInLoop
      tables[k] = Object.assign({}, o); //noinspection JSUnfilteredForInLoop
      // delete data.results[ k ];
    }
  }

  data.tables = tables;
  return data;
}

function sessionLinks(iLink, sessionId) {
  var harray = iLink.href.split('/');
  var server = harray[harray.length - 2];
  var uriproxy = "/casProxy/servers/".concat(server, "/cas/sessions/").concat(sessionId);
  var uri = "/".concat(iLink.casHttp, "/cas/sessions/").concat(sessionId);
  return casSessionLinks(uri, uriproxy);
}

function casSessionLinks(uri, uriproxy) {
  return [{
    method: 'POST',
    href: "".concat(uri, "/actions"),

    /* payload: data:...., qs: {action: ...} */
    rel: 'cashttp',
    uri: "".concat(uri, "/actions"),
    responseType: 'application/json',
    type: 'application/json',
    itemType: 'application/json',
    title: 'Run CAS Action',
    customHandling: 'casExecute',
    extended: true
  }, {
    method: 'POST',
    href: "".concat(uriproxy, "/actions"),

    /* payload: data:...., qs: {action: ...} */
    rel: 'execute',
    uri: "".concat(uriproxy, "/actions"),
    responseType: 'application/json',
    type: 'application/json',
    itemType: 'application/json',
    title: 'Run CAS Action',
    customHandling: 'casExecute',
    extended: true
  }, {
    method: 'GET',
    href: "".concat(uri, "/isIdle"),

    /* need to convert true/false to busy and completed */
    rel: 'state',
    uri: "".concat(uri, "/isIdle"),
    responseType: 'application/json',
    type: 'application/json',
    itemType: 'application/json',
    title: 'state',
    customHandling: 'casState',
    extended: true
  }];
}

/* harmony default export */ __webpack_exports__["a"] = (fixResponse);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


var Immutable = __webpack_require__(4);

function routeOrFolder(iroute) {
  var route = null;

  if (typeof iroute === 'string') {
    route = iroute;
  } else {
    if (Immutable.Iterable.isIterable(iroute) === true) {
      route = iroute.get('route', null);
    }
  }

  return route;
}

/* unused harmony default export */ var _unused_webpack_default_export = (routeOrFolder);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiCall__ = __webpack_require__(43);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/




var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(apiCallAction);





function apiCallAction() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function apiCallAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga__["takeEvery"])([__WEBPACK_IMPORTED_MODULE_2__actionTypes__["a" /* ADD_SERVICE */], __WEBPACK_IMPORTED_MODULE_2__actionTypes__["b" /* API_CALL */]], __WEBPACK_IMPORTED_MODULE_3__apiCall__["a" /* default */]), "t0", 1);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/* harmony default export */ __webpack_exports__["a"] = (apiCallAction);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__httpCall__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_selectLogonInfo__ = __webpack_require__(8);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/





var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(apiCall);






function apiCall(action) {
  var config, payload;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function apiCall$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, action);
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["select"])(__WEBPACK_IMPORTED_MODULE_5__store_selectLogonInfo__["a" /* default */]);

        case 3:
          config.logonInfo = _context.sent;
          _context.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["put"])({
            type: config.serviceName + '_' + action.type + '_BEGIN',
            config: config
          });

        case 6:
          if (!(action.delay > 0)) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga__["delay"])(action.delay * 1000);

        case 9:
          _context.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_4__httpCall__["a" /* default */], config);

        case 11:
          payload = _context.sent;
          _context.next = 14;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["put"])(payload);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/* harmony default export */ __webpack_exports__["a"] = (apiCall);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_selectLogonInfo__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__httpCall__ = __webpack_require__(22);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/





var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.mark(apiCallAllAction),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.mark(yieldAll),
    _marked3 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.mark(setupService);







function apiCallAllAction() {
  return __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.wrap(function apiCallAllAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_5__actionTypes__["c" /* API_CALL_PARALLEL */], yieldAll), "t0", 1);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function yieldAll(action) {
  var configs, actionArray, i, c, result, _i;

  return __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.wrap(function yieldAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          configs = [];
          actionArray = action.actionArray;
          i = 0;

        case 3:
          if (!(i < actionArray.length)) {
            _context2.next = 11;
            break;
          }

          _context2.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["call"])(setupService, actionArray[i]);

        case 6:
          c = _context2.sent;
          configs.push(c);

        case 8:
          i++;
          _context2.next = 3;
          break;

        case 11:
          _context2.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["all"])(configs.map(function (c) {
            return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_6__httpCall__["a" /* default */], c);
          }));

        case 13:
          result = _context2.sent;
          _i = 0;

        case 15:
          if (!(_i < result.length)) {
            _context2.next = 21;
            break;
          }

          _context2.next = 18;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])(result[_i]);

        case 18:
          _i++;
          _context2.next = 15;
          break;

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function setupService(action) {
  var config;
  return __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.wrap(function setupService$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          config = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, action);
          _context3.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])(__WEBPACK_IMPORTED_MODULE_4__store_selectLogonInfo__["a" /* default */]);

        case 3:
          config.logonInfo = _context3.sent;
          _context3.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: config.serviceName + '_' + config.type + '_BEGIN',
            config: config
          });

        case 6:
          return _context3.abrupt("return", config);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

/* harmony default export */ __webpack_exports__["a"] = (apiCallAllAction);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiPoll__ = __webpack_require__(46);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/




var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(apiPollAction);





function apiPollAction() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function apiPollAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga__["takeEvery"])([__WEBPACK_IMPORTED_MODULE_2__actionTypes__["d" /* API_POLL */]], __WEBPACK_IMPORTED_MODULE_3__apiPoll__["a" /* default */]), "t0", 1);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/* harmony default export */ __webpack_exports__["a"] = (apiPollAction);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__httpCallWait__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_selectLogonInfo__ = __webpack_require__(8);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/





var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(apiPoll);






function apiPoll(action) {
  var config, payload;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function apiPoll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, action);
          payload = null;
          _context.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["select"])(__WEBPACK_IMPORTED_MODULE_5__store_selectLogonInfo__["a" /* default */]);

        case 4:
          config.logonInfo = _context.sent;
          _context.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["put"])({
            type: config.serviceName + '_' + action.type + '_BEGIN',
            config: config
          });

        case 7:
          if (!config.delay) {
            _context.next = 10;
            break;
          }

          _context.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga__["delay"])(config.delay * 1000);

        case 10:
          _context.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_4__httpCallWait__["a" /* default */], config);

        case 12:
          payload = _context.sent;

        case 13:
          if (payload === null) {
            _context.next = 7;
            break;
          }

        case 14:
          _context.next = 16;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["put"])(payload);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/* harmony default export */ __webpack_exports__["a"] = (apiPoll);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serverCalls__ = __webpack_require__(12);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/




function httpCallWait(config) {
  var states = ['running', 'pending'];
  var flag;
  return Object(__WEBPACK_IMPORTED_MODULE_0__serverCalls__["b" /* request */])(config).then(function (response) {
    var r = response.data.results;

    if (config.eventHandler) {
      flag = config.eventHandler(r, config.jobContext);
    }

    return states.indexOf(r) === -1 || flag === true ? httpDone(response, config, false) : null;
  }).catch(function (error) {
    if (config.eventHandler) {
      flag = config.eventHandler('*SystemError', config.jobContext);
    }

    return httpDone(error, config, true);
  });
}

function httpDone(payload, config, error) {
  return {
    error: error,
    type: config.serviceName + '_' + config.type + '_COMPLETE',
    config: config,
    payload: payload
  };
}

/* harmony default export */ __webpack_exports__["a"] = (httpCallWait);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__);
/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/




var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(apiDataAction),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(appData);







function apiDataAction() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function apiDataAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga__["takeEvery"])([__WEBPACK_IMPORTED_MODULE_2__actionTypes__["k" /* APP_DATA */], __WEBPACK_IMPORTED_MODULE_2__actionTypes__["e" /* API_STATUS */], __WEBPACK_IMPORTED_MODULE_2__actionTypes__["h" /* API_XSRF */]], appData), "t0", 1);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function appData(action) {
  var newType, config;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function appData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = action.type;
          _context2.next = _context2.t0 === __WEBPACK_IMPORTED_MODULE_2__actionTypes__["k" /* APP_DATA */] ? 3 : _context2.t0 === __WEBPACK_IMPORTED_MODULE_2__actionTypes__["e" /* API_STATUS */] ? 5 : 7;
          break;

        case 3:
          newType = __WEBPACK_IMPORTED_MODULE_2__actionTypes__["l" /* APP_DATA_ROOT */] + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["m" /* APP_DATA_SETSTATE */];
          return _context2.abrupt("break", 9);

        case 5:
          newType = __WEBPACK_IMPORTED_MODULE_2__actionTypes__["f" /* API_STATUS_ROOT */] + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["g" /* API_STATUS_SETSTATE */];
          return _context2.abrupt("break", 9);

        case 7:
          newType = __WEBPACK_IMPORTED_MODULE_2__actionTypes__["i" /* API_XSRF_ROOT */] + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["j" /* API_XSRF_SETSTATE */];
          return _context2.abrupt("break", 9);

        case 9:
          config = {
            type: newType,
            payload: action
          };
          _context2.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["put"])(config);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/* harmony default export */ __webpack_exports__["a"] = (apiDataAction);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = viyaLogon;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(11);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

/* import uuid from 'uuid' ;*/



var Immutable = __webpack_require__(4);

var Map = Immutable.Map,
    fromJS = Immutable.fromJS;


var initialState = fromJS({
  connections: [],
  user: 'none',
  type: 'server',
  currentConnection: -1,
  statusInfo: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* statusInfoStruct */])(),
  runStatus: 'idle'
});
function viyaLogon() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__actionTypes__["n" /* BEGIN_LOGON */]:
      {
        return state.set('runStatus', 'busy');
      }

    case __WEBPACK_IMPORTED_MODULE_1__actionTypes__["u" /* VIYA_LOGON_SERVER */]:
      {
        /**/
        var config = action.payload;
        /* */

        var newOne = {
          type: 'server',
          id: 1,
          user: 'You',
          desc: 'Server',
          logonInfo: {
            type: 'server',
            host: config.iconfig.host,
            tokenType: null,
            token: null
          }
        };
        var temp = {
          currentConnection: state.get('currentConnection') + 1,
          runStatus: 'ready',
          statusInfo: {},
          user: 'You of course!',
          connections: [newOne]
        };
        return fromJS(temp);
      }

    case __WEBPACK_IMPORTED_MODULE_1__actionTypes__["s" /* VIYA_LOGON_IMPLICIT */]:
      {
        /* */
        var _config = action.payload.iconfig;

        if (action.error === true) {
          return state.withMutations(function (s) {
            s.set('runStatus', 'error').set('statusInfo', fromJS(Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* setBadStatus */])(action.payload)));
          });
        }

        var _newOne = {
          type: 'implicit',
          id: 1,
          user: 'You',
          desc: 'implicit',
          logonInfo: __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, _config)
        };
        var _temp = {
          currentConnection: state.get('currentConnection') + 1,
          runStatus: 'ready',
          statusInfo: {},
          user: 'You of course!',
          connections: [_newOne]
        };
        return fromJS(_temp);
      }

    case __WEBPACK_IMPORTED_MODULE_1__actionTypes__["r" /* VIYA_LOGON_COMPLETE */]:
      {
        if (action.error === true) {
          return state.withMutations(function (s) {
            s.set('runStatus', 'error').set('statusInfo', fromJS(Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* setBadStatus */])(action.payload)));
          });
        }

        var _temp2 = {
          currentConnection: state.get('currentConnection') + 1,
          runStatus: 'ready',
          statusInfo: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* setGoodStatus */])(action.payload),
          user: action.payload.data.iconfig.user
        };
        return state.withMutations(function (s) {
          //noinspection JSUnresolvedFunction
          s.set('connections', s.get('connections').push(Map(newConnection(action.payload)))).merge(fromJS(_temp2));
        });
      }

    case __WEBPACK_IMPORTED_MODULE_1__actionTypes__["p" /* VIYA_LOGOFF */]:
      {
        return initialState;
      }

    default:
      return state;
  }
}

function newConnection(payload) {
  var _payload$data = payload.data,
      results = _payload$data.results,
      iconfig = _payload$data.iconfig;
  return {
    type: 'connection',
    id: 1,
    user: iconfig.user,
    desc: iconfig.desc,
    logonInfo: {
      type: 'trusted',
      host: iconfig.host,
      tokenType: results['token_type'],
      token: results['access_token']
    },
    statusInfo: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* setGoodStatus */])(payload)
  };
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__responseReducer__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_rootStruct__ = __webpack_require__(13);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */






var Immutable = __webpack_require__(4);

var fromJS = Immutable.fromJS;


var reducer = function reducer(root) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fromJS(Object(__WEBPACK_IMPORTED_MODULE_3__utils_rootStruct__["c" /* tLinkStruct */])(root, 'links', root));
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case __WEBPACK_IMPORTED_MODULE_2__actionTypes__["o" /* DELETE_RAF_OBJECT */]:
        {
          var searchPath = action.route.split(':/');
          var path = searchPath.slice(1);
          var parent = state.getIn(path);
          var newState = state.deleteIn(path);
          return newState;
        }

      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["a" /* ADD_SERVICE */] + '_BEGIN':
        {
          return state.set('runStatus', 'busy').set('route', root);
        }

      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["a" /* ADD_SERVICE */] + '_COMPLETE':
        {
          var result = Object(__WEBPACK_IMPORTED_MODULE_1__responseReducer__["a" /* responseReducer */])(action, [root]);
          result.resultType = 'application/vnd.sas.api';
          result.raw = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, action.payload);
          result.responseHeaders = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, result.raw.headers);
          result.route = root; // Need this for potential routing

          return fromJS(result);
        }

      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["b" /* API_CALL */] + '_BEGIN':
      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["d" /* API_POLL */] + '_BEGIN':
        {
          //noinspection JSUnresolvedVariable
          var config = action.config;
          var paginator = config.paginator;

          var _searchPath = config.route.split(':/');

          var _path = _searchPath.slice(paginator === true ? 1 : 2);

          var _parent = state.getIn(_path); // let payload    = {...config.payload };
          // delete payload.route;
          // parent = parent.set( 'runStatus', 'busy' ).set( 'payload', fromJS( payload ) );


          _parent = _parent.set('runStatus', 'busy');
          _path = _searchPath.slice(1);
          return state.setIn(_path, _parent);
        }

      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["b" /* API_CALL */] + '_COMPLETE':
      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["d" /* API_POLL */] + '_COMPLETE':
        {
          /* */
          //noinspection JSUnresolvedVariable
          var _config = action.config;

          var _searchPath2 = _config.route.split(':/');

          var _path2 = _searchPath2.slice(1);

          var raw = Object.assign({}, action.payload);

          var _result = Object(__WEBPACK_IMPORTED_MODULE_1__responseReducer__["a" /* responseReducer */])(action, _searchPath2);

          _result.raw = raw;

          if (_result.type === 'links' && _result.resultType == undefined) {
            _result.resultType = 'application/vnd.sas.api';
          }

          var method = action.config.link.method;
          _result.title = action.config.link.href;
          _result.responseHeaders = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, raw.headers);
          _result.route = _searchPath2.join(':/');
          var newParent = fromJS(_result);
          var nState = state.setIn(_path2, newParent);
          return nState;
        }

      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["k" /* APP_DATA */] + '_SETSTATE':
        {
          var _action$payload = action.payload,
              route = _action$payload.route,
              payload = _action$payload.payload;
          var userData = state.get('userData');

          if (Array.isArray(route)) {
            userData = userData.setIn(route, fromJS(payload));
          } else {
            userData = userData.set(route, fromJS(payload));
          }

          return state.set('userData', userData);
        }

      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["h" /* API_XSRF */] + '_SETSTATE':
        {
          var _action$payload2 = action.payload,
              _route = _action$payload2.route,
              _payload = _action$payload2.payload;

          var _userData = state.get('userData');

          if (Array.isArray(_route)) {
            _userData = _userData.setIn(_route, fromJS(_payload));
          } else {
            _userData = _userData.set(_route, fromJS(_payload));
          }

          return state.set('userData', _userData);
        }

      case root + '_' + __WEBPACK_IMPORTED_MODULE_2__actionTypes__["e" /* API_STATUS */] + '_SETSTATE':
        {
          var _payload2 = action.payload.payload;
          var jobContext = _payload2.jobContext;

          var _userData2 = state.get('userData');

          var routeList = state.get('routeList').push(jobContext);
          _userData2 = _userData2.set(jobContext, fromJS(_payload2));
          return state.set('userData', _userData2).set('routeList', routeList);
        }

      default:
        {
          return state;
        }
    }
  };
};



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iGetResults__ = __webpack_require__(24);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




function getResults2(store, iroute, prePath) {
  var iquery = null;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  if (args != null && args.length > 0) {
    iquery = Array.isArray(args[0]) === true ? args[0] : args;

    if (prePath !== null) {
      iquery = prePath.concat(iquery);
    }
  } else {
    iquery = prePath;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__iGetResults__["a" /* default */])(store, iroute, false, iquery);
}

/* harmony default export */ __webpack_exports__["a"] = (getResults2);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiCall__ = __webpack_require__(16);
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */






function runAction(_x, _x2, _x3) {
  return _runAction.apply(this, arguments);
}

function _runAction() {
  _runAction = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(store, session, payload) {
    var actionResult;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(__WEBPACK_IMPORTED_MODULE_2__apiCall__["a" /* default */])(store, session.links('execute'), payload, 0);

          case 2:
            actionResult = _context.sent;

            if (!(casError(actionResult) === true)) {
              _context.next = 5;
              break;
            }

            throw JSON.stringify(actionResult.items());

          case 5:
            return _context.abrupt("return", actionResult);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _runAction.apply(this, arguments);
}

function casError(actionResult) {
  var statusCode = actionResult.items('disposition', 'statusCode');
  var severity = actionResult.items('disposition', 'severity');
  return statusCode !== 0 || severity === 'Error' ? true : false;
}

/* harmony default export */ __webpack_exports__["a"] = (runAction);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jobState__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__iapiCall__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actionTypes__ = __webpack_require__(0);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */






 //store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext

function apiSubmit(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
  return _apiSubmit.apply(this, arguments);
}

function _apiSubmit() {
  _apiSubmit = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(store, iroute, payload, delay, jobContext, onCompletion, progress) {
    var job, status;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (progress) {
              progress('pending', jobContext);
            }

            _context.next = 3;
            return Object(__WEBPACK_IMPORTED_MODULE_3__iapiCall__["a" /* default */])(store, iroute, __WEBPACK_IMPORTED_MODULE_4__actionTypes__["b" /* API_CALL */], payload, 0, null, null, jobContext);

          case 3:
            job = _context.sent;

            if (!job.links('state')) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return Object(__WEBPACK_IMPORTED_MODULE_2__jobState__["a" /* default */])(store, job, null, 'wait', delay, progress, jobContext);

          case 7:
            status = _context.sent;
            completion(store, onCompletion, status.data, status.job, jobContext);
            return _context.abrupt("return", status.job);

          case 12:
            completion(store, onCompletion, 'unknown', job, jobContext);
            return _context.abrupt("return", job);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _apiSubmit.apply(this, arguments);
}

function completion(store, onCompletion, data, job, jobContext) {
  var results = {
    data: data,
    job: job,
    httpCode: job.status
  };
  saveData(store, results, jobContext);

  if (onCompletion) {
    onCompletion(null, results, jobContext);
  }
}

function saveData(store, results, jobContext) {
  var payload = {
    route: results.job.route,
    data: results.data,
    jobContext: jobContext
  };
  var action = {
    type: __WEBPACK_IMPORTED_MODULE_4__actionTypes__["e" /* API_STATUS */],
    route: jobContext,
    payload: payload
  };
  store.dispatch(action);
}

/* harmony default export */ __webpack_exports__["a"] = (apiSubmit);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iapiCall__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(0);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */





function ijobState(store, job, payload, delay, waitFlag, eventHandler, jobContext) {
  return new Promise(function (resolve, reject) {
    var stateCmd = job.links('state');

    if (stateCmd === null) {
      var result = {
        job: job,
        data: 'completed',
        statusCode: 200
      };
      resolve({
        completed: 1,
        running: 0,
        jobState: result
      });
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_0__iapiCall__["a" /* default */])(store, stateCmd, waitFlag === true ? __WEBPACK_IMPORTED_MODULE_1__actionTypes__["d" /* API_POLL */] : __WEBPACK_IMPORTED_MODULE_1__actionTypes__["b" /* API_CALL */], payload, delay, eventHandler, job.route, jobContext).then(function (r) {
        var detail = {};
        var running = 0;
        var data = r.items();

        if (detail.hasOwnProperty(data) === false) {
          detail[data] = 0;
        }

        detail[data] = detail[data] + 1;
        var httpCode = r.status;
        var result = {
          job: job,
          data: data,
          statusCode: httpCode
        };

        if (data === 'running' || data === 'pending') {
          running = 1;
        }

        resolve({
          running: running,
          detail: detail,
          jobState: result
        });
      }).catch(function (err) {
        reject(err);
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["a"] = (ijobState);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ijobStateAll__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiCallAll__ = __webpack_require__(18);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */





function jobStateAll(store, jobList, payload, maxTries) {
  return new Promise(function (resolve, reject) {
    var tries = maxTries != null ? maxTries : 1;
    checkStatus(store, jobList, payload, tries, function (err, result) {
      if (err) {
        reject(err);
      } else if (result.running === 0) {
        var rafLinkSelf = result.jobState.map(function (j) {
          return {
            rafLink: j.job.links('self'),
            payload: null
          };
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__apiCallAll__["a" /* default */])(store, rafLinkSelf, null).then(function (newJobs) {
          newJobs.forEach(function (job, i) {
            result.jobState[i].job = job;
          });
          resolve(result);
        }).catch(function (err) {
          reject(err);
        });
      } else {
        resolve(result);
      }
    });
  });
}

function checkStatus(store, jobList, payload, tries, cb) {
  Object(__WEBPACK_IMPORTED_MODULE_0__ijobStateAll__["a" /* default */])(store, jobList, payload).then(function (result) {
    if (result.running > 0) {
      tries--;

      if (tries <= 0) {
        cb(null, result);
      } else {
        checkStatus(store, jobList, payload, tries, cb);
      }
    } else {
      cb(null, result);
    }
  }).catch(function (err) {
    cb(err);
  });
}

/* harmony default export */ __webpack_exports__["a"] = (jobStateAll);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_toConsumableArray__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiCallAll__ = __webpack_require__(18);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */






function ijobStateAll(store, jobs, ipayload) {
  return new Promise(function (resolve, reject) {
    /* */
    var payload = [];

    if (ipayload !== null) {
      if (Array.isArray(ipayload) === false) {
        for (var i = 0; i < jobs.length; i++) {
          payload.push(ipayload);
        }
      } else {
        payload = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_toConsumableArray___default()(ipayload);
      }
    } else {
      for (var _i = 0; _i < jobs.length; _i++) {
        payload.push(null);
      }
    }

    var actionArray = jobs.map(function (job, i) {
      //noinspection JSValidateTypes
      var rafLink = job.links('state');

      if (rafLink === null) {
        reject(" job ".concat(i, " does not support state checking "));
      }

      var statePayload = payload[i];
      return {
        rafLink: rafLink,
        payload: __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, statePayload)
      };
    });
    Object(__WEBPACK_IMPORTED_MODULE_2__apiCallAll__["a" /* default */])(store, actionArray).then(function (results) {
      var detail = {};
      var running = 0;
      var jobState = results.map(function (r, i) {
        var data = r.items();
        var httpCode = r.status;

        if (detail.hasOwnProperty(data) === false) {
          detail[data] = 0;
        }

        detail[data] = detail[data] + 1;

        if (data === 'running' || data === 'pending') {
          running++;
        }

        return {
          job: jobs[i],
          data: data,
          statusCode: httpCode
        };
      });
      resolve({
        running: running,
        detail: detail,
        jobState: jobState
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* harmony default export */ __webpack_exports__["a"] = (ijobStateAll);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */





var axios = __webpack_require__(21);

function request(_x, _x2) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(payload, reducer) {
    var r;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios(payload);

          case 2:
            r = _context.sent;
            return _context.abrupt("return", reducer == null ? r : reducer(r));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _request.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["a"] = (request);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


function getServices(store) {
  var list = store.getState();
  var services = [];

  for (var key in list) {
    if (key !== 'connections') {
      //noinspection JSUnfilteredForInLoop
      services.push(key);
    }
  }

  return services;
}

/* harmony default export */ __webpack_exports__["a"] = (getServices);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iaddServices__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appData__ = __webpack_require__(28);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */








function addServices(_x) {
  return _addServices.apply(this, arguments);
}

function _addServices() {
  _addServices = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(store) {
    var _len,
        services,
        _key,
        _ref,
        folders,
        xsrfTokens,
        service,
        _args = arguments;

    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, services = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              services[_key - 1] = _args[_key];
            }

            if (services.includes('casManagement')) {
              services.push('casProxy');
            }

            _context.next = 4;
            return Object(__WEBPACK_IMPORTED_MODULE_2__iaddServices__["a" /* default */])(store, services);

          case 4:
            _ref = _context.sent;
            folders = _ref.folders;
            xsrfTokens = _ref.xsrfTokens;

            if (xsrfTokens !== null) {
              for (service in xsrfTokens) {
                Object(__WEBPACK_IMPORTED_MODULE_4__appData__["a" /* default */])(store, __WEBPACK_IMPORTED_MODULE_3__actionTypes__["h" /* API_XSRF */], service, xsrfTokens[service]);
              }
            }

            return _context.abrupt("return", folders);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _addServices.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["a"] = (addServices);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getResults__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__extendFolder__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__injectAsyncReducers__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_immutable__);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */









var iaddServices = function iaddServices(store, services) {
  return new Promise(function (resolve, reject) {
    //
    // Add a reducer for each service
    //
    services.forEach(function (service) {
      if (Object(__WEBPACK_IMPORTED_MODULE_3__injectAsyncReducers__["a" /* default */])(store, service, Object(__WEBPACK_IMPORTED_MODULE_4__reducers__["b" /* reducer */])(service)) === false) {
        reject(Object(__WEBPACK_IMPORTED_MODULE_5_immutable__["fromJS"])({
          Error: "".concat(service, "  exists")
        }));
      }
    }); //
    // Create actionArray for the services
    //

    var actionArray = services.map(function (service) {
      return {
        type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["a" /* ADD_SERVICE */],
        link: {
          method: 'GET',
          href: '/' + service + '/',
          rel: 'root',
          type: 'application/vnd.sas.api',
          uri: '/' + service + '/'
        },
        logonInfo: null,
        tLink: null,

        /* null indicates root of service */
        serviceName: service,
        route: service
      };
    }); //
    // The first callback needs to be ignored
    //

    var start = true; //
    // subscribe function
    //

    var nextE = function nextE() {
      if (start) {
        start = false;
        return;
      }

      var folders = {};
      var xsrfTokens = {};
      /* */
      //
      // check the status of the call.
      // if all of them completed then resolve this promise or reject if error as soon as
      // an error is detected.
      //

      var count = 0;

      for (var i = 0; i < actionArray.length; i++) {
        //noinspection JSUnresolvedVariable
        var f = Object(__WEBPACK_IMPORTED_MODULE_1__getResults__["a" /* default */])(store, actionArray[i].route);

        if (f !== null) {
          var runStatus = f.get('runStatus');

          if (runStatus === 'error') {
            unSubscribe();
            var err = {
              service: services[i],
              detail: f.get('statusInfo')
            };
            reject(err);
          } else if (runStatus === 'ready') {
            count++;
            var ff = Object(__WEBPACK_IMPORTED_MODULE_2__extendFolder__["a" /* default */])(store, f);
            folders[services[i]] = ff;
            var xheader = ff.headers('x-csrf-header');

            if (xheader !== null) {
              var xtoken = ff.headers('x-csrf-token');
              var xx = {
                'x-csrf-header': xheader,
                'x-csrf-token': xtoken
              };
              xsrfTokens[services[i]] = xx;
            } else {
              xsrfTokens[services[i]] = null;
            }
          }
        }
      }

      if (count === actionArray.length) {
        unSubscribe();
        resolve({
          folders: folders,
          xsrfTokens: xsrfTokens
        });
      }
    }; //
    // subscribe to store
    //


    var unSubscribe = store.subscribe(nextE); //
    // dispatch the actionArray
    //
    //
    // interval is a place holder for creating interval between calls
    // Yet to be implemented
    //

    store.dispatch({
      type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["c" /* API_CALL_PARALLEL */],
      interval: -1,
      actionArray: actionArray
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = (iaddServices);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__extendFolder__ = __webpack_require__(6);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




function getServiceRoot(store, serviceName) {
  var f = null;
  var list = store.getState();

  for (var key in list) {
    if (key === serviceName) {
      //noinspection JSUnfilteredForInLoop
      return Object(__WEBPACK_IMPORTED_MODULE_0__extendFolder__["a" /* default */])(store, list[key]);
    }
  }

  return f;
}

/* harmony default export */ __webpack_exports__["a"] = (getServiceRoot);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_query_string__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_query_string__);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */






var logon = function logon(store, ipayload) {
  return new Promise(function (resolve, reject) {
    var unSubscribe;
    var action;
    var implicitLogon = false;
    var payload = ipayload == null ? null : __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, ipayload);

    if (store.getState().connections.get('currentConnection') >= 0) {
      resolve('ready');
    } else {
      var logonExit = function logonExit() {
        var newState = store.getState().connections;
        var runStatus = newState.get('runStatus');

        if (runStatus === 'ready') {
          unSubscribe();
          resolve(runStatus);
        } else if (runStatus === 'error') {
          unSubscribe();
          reject(newState.get('statusInfo').toJS());
        }
      };

      if (payload == null) {
        // Assume proxy condition
        payload = {
          host: "".concat(window.location.protocol, "//").concat(window.location.host),
          authType: __WEBPACK_IMPORTED_MODULE_1__actionTypes__["u" /* VIYA_LOGON_SERVER */]
        }; // Now check and see if we are in the callback for implicit flow

        if (window != null && window.location != null && window.location.hasOwnProperty('hash')) {
          var windowLocation = window.location;
          var host = __WEBPACK_IMPORTED_MODULE_2_query_string___default.a.parse(windowLocation.search);
          var loc = __WEBPACK_IMPORTED_MODULE_2_query_string___default.a.parse(windowLocation.hash);
          /* */
          //

          if (host !== null && host.host !== null) {
            payload.host = host.host; //noinspection JSUnresolvedVariable

            payload.tokenType = host.token_type != null ? host.token_type : null; //noinspection JSUnresolvedVariable

            payload.token = host.access_token != null ? host.access_token : null;

            if (payload.token !== null) {
              payload.authType = __WEBPACK_IMPORTED_MODULE_1__actionTypes__["s" /* VIYA_LOGON_IMPLICIT */];
            }
          } //
          //noinspection JSUnresolvedVariable


          if (loc.access_token != null) {
            payload = {
              host: host.host,
              token: loc['access_token'],
              tokenType: loc['token_type'],
              authType: __WEBPACK_IMPORTED_MODULE_1__actionTypes__["s" /* VIYA_LOGON_IMPLICIT */]
            };
          }
        }
      } // now make the final decision


      switch (payload.authType) {
        case __WEBPACK_IMPORTED_MODULE_1__actionTypes__["u" /* VIYA_LOGON_SERVER */]:
          if (payload.host == null) {
            payload.host = "".concat(window.location.protocol, "//").concat(window.location.host);
          }

          break;

        case __WEBPACK_IMPORTED_MODULE_1__actionTypes__["s" /* VIYA_LOGON_IMPLICIT */]:
          if (!payload.hasOwnProperty('token')) {
            implicitLogon = true;
            getToken(payload);
            resolve('Implicit Call');
          }

          break;

        case "LOGOFF":
          break;

        default:
          break;
      }

      if (!implicitLogon) {
        action = {
          type: payload.authType === 'LOGOFF' ? 'LOGOFF' : __WEBPACK_IMPORTED_MODULE_1__actionTypes__["q" /* VIYA_LOGON */],
          payload: __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, payload)
        };
        unSubscribe = store.subscribe(logonExit);
        store.dispatch(action);
      }
    }
  });
};

function getToken(payload) {
  var x = "".concat(payload.host, "/SASLogon/oauth/authorize?response_type=token&client_id=").concat(payload.clientID); //noinspection JSUnresolvedVariable

  if (payload.redirect != null) {
    //noinspection JSUnresolvedVariable
    var redirectUri = "".concat(window.location.protocol, "//").concat(window.location.host, "/").concat(payload.redirect, "?host=").concat(payload.host);
    x = "".concat(x, "&redirect_uri=").concat(redirectUri);
  }

  window.location.replace(x);
}

/* harmony default export */ __webpack_exports__["a"] = (logon);

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(0);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


var unSubscribe;


function logoff(store) {
  //noinspection JSUnusedLocalSymbols
  return new Promise(function (resolve, reject) {
    var action = {
      type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["p" /* VIYA_LOGOFF */],
      payload: {}
    };

    var logoffExit = function logoffExit() {
      resolve(true);
    };

    unSubscribe = store.subscribe(logoffExit);
    store.dispatch(action);
  });
}

/* harmony default export */ __webpack_exports__["a"] = (logoff);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__extendFolder__ = __webpack_require__(6);
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */




function routeToObj(store, route) {
  var path = route.split(':/');
  var service = path.shift();
  var folder = store.getState()[service];
  folder = path.length > 0 ? folder.getIn(path) : folder;
  return Object(__WEBPACK_IMPORTED_MODULE_0__extendFolder__["a" /* default */])(store, folder);
}

/* harmony default export */ __webpack_exports__["a"] = (routeToObj);

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */





function deleteRafObject(store, iroute) {
  var route = null;

  if (typeof iroute === 'string') {
    route = iroute;
  } else if (__WEBPACK_IMPORTED_MODULE_1_immutable___default.a.Iterable.isIterable(iroute) === true) {
    route = iroute.get('route');
  }

  if (iroute !== null) {
    var action = {
      type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["o" /* DELETE_RAF_OBJECT */],
      route: route
    };
    store.dispatch(action);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (deleteRafObject);

/***/ })
/******/ ]);
});