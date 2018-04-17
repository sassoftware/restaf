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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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


/*
 * Copyright (c) 2017 by SAS Institute Inc., Cary, NC USA 27513
 * Author          : K. Deva Kumar
 * Last Modified: 5/23/17 8:49 PM
 *
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VIYA_LOGON = exports.VIYA_LOGON = 'VIYA_LOGON';
var BEGIN_LOGON = exports.BEGIN_LOGON = 'BEGIN_LOGON';
var VIYA_LOGOFF = exports.VIYA_LOGOFF = 'VIYA_LOGOFF';
var VIYA_LOGON_COMPLETE = exports.VIYA_LOGON_COMPLETE = 'VIYA_LOGON_COMPLETE';
var VIYA_LOGON_SERVER = exports.VIYA_LOGON_SERVER = 'server';
var VIYA_LOGON_PASSWORD = exports.VIYA_LOGON_PASSWORD = 'password';
var VIYA_LOGON_IMPLICIT = exports.VIYA_LOGON_IMPLICIT = 'implicit'; /* implies token */

var ADD_SERVICE = exports.ADD_SERVICE = 'ADD_SERVICE';
var ADD_SERVICE_COMPLETE = exports.ADD_SERVICE_COMPLETE = 'ADD_SERVICE_COMPLETE';

var API_CALL = exports.API_CALL = 'API_CALL';
var API_BEGIN = exports.API_BEGIN = 'API_BEGIN';
var API_COMPLETE = exports.API_COMPLETE = 'API_COMPLETE';
var API_CALL_PARALLEL = exports.API_CALL_PARALLEL = 'API_PARALLEL';
var DELETE_RAF_OBJECT = exports.DELETE_RAF_OBJECT = 'DELETE_RAF_OBJECT';

var API_POLL = exports.API_POLL = 'API_POLL';
var API_POLL_BEGIN = exports.API_POLL_BEGIN = 'API_POLL_BEGIN';
var API_POLL_COMPLETE = exports.API_POLL_COMPLETE = 'API_POLL_COMPLETE';

var APP_DATA_ROOT = exports.APP_DATA_ROOT = '_appdata';
var APP_DATA = exports.APP_DATA = 'APP_DATA';
var APP_DATA_SETSTATE = exports.APP_DATA_SETSTATE = 'APP_DATA_SETSTATE';

var API_STATUS_ROOT = exports.API_STATUS_ROOT = '_apistatus';
var API_STATUS = exports.API_STATUS = 'API_STATUS';
var API_STATUS_SETSTATE = exports.API_STATUS_SETSTATE = 'API_STATUS_SETSTATE';

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 8 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getResults = __webpack_require__(56);

var _getResults2 = _interopRequireDefault(_getResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extendFolder(store, f) {

    var wrapper = function wrapper(prePath) {
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (0, _getResults2.default)(store, f, prePath, args);
        };
    };

    var wrapperItemsCmd = function wrapperItemsCmd(prePath) {
        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            args.splice(1, 0, 'cmds');
            return (0, _getResults2.default)(store, f, prePath, args);
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
exports.default = extendFolder;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 10 */
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



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectLogonInfo;
function selectLogonInfo(mainState) {
  var state = mainState.connections;
  var currentNo = state.get('currentConnection');
  return currentNo === -1 ? null : state.get('connections').get(currentNo).toJS().logonInfo;
}

/***/ }),
/* 11 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducer = exports.responseReducer = exports.createReducer = undefined;

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _redux = __webpack_require__(21);

var _viyaLogon = __webpack_require__(54);

var _responseReducer = __webpack_require__(26);

var _reducer = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createReducer(asyncReducers) {
    return (0, _redux.combineReducers)((0, _extends3.default)({
        connections: _viyaLogon.viyaLogon
    }, asyncReducers));
}

exports.createReducer = createReducer;
exports.responseReducer = _responseReducer.responseReducer;
exports.reducer = _reducer.reducer;

/***/ }),
/* 12 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iGetResults = __webpack_require__(28);

var _iGetResults2 = _interopRequireDefault(_iGetResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getResults(store, iroute, path) {

    if (path != undefined) {
        return (0, _iGetResults2.default)(store, iroute, false, path);
    } else {
        return (0, _iGetResults2.default)(store, iroute);
    }
}
exports.default = getResults;

/***/ }),
/* 13 */
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



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeOrFolder = exports.itemsStruct = exports.tLinkStruct = exports.statusInfoStruct = exports.prepareConfig = exports.SASLogonOauthLink = exports.setBadStatus = exports.setGoodStatus = undefined;

var _statusFuncs = __webpack_require__(40);

var _SASLogonOauthLink = __webpack_require__(41);

var _prepareConfig = __webpack_require__(45);

var _prepareConfig2 = _interopRequireDefault(_prepareConfig);

var _routeOrFolder = __webpack_require__(46);

var _routeOrFolder2 = _interopRequireDefault(_routeOrFolder);

var _rootStruct = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setGoodStatus = _statusFuncs.setGoodStatus;
exports.setBadStatus = _statusFuncs.setBadStatus;
exports.SASLogonOauthLink = _SASLogonOauthLink.SASLogonOauthLink;
exports.prepareConfig = _prepareConfig2.default;
exports.statusInfoStruct = _rootStruct.statusInfoStruct;
exports.tLinkStruct = _rootStruct.tLinkStruct;
exports.itemsStruct = _rootStruct.itemsStruct;
exports.routeOrFolder = _routeOrFolder2.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.request = exports.implicitGrant = exports.trustedGrant = undefined;

var _keys = __webpack_require__(42);

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = __webpack_require__(22);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__(9);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(23);

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _axios = __webpack_require__(24);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(43);

var _qs2 = _interopRequireDefault(_qs);

var _fixResponse = __webpack_require__(44);

var _fixResponse2 = _interopRequireDefault(_fixResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.interceptors.response.use(function (response) {

    return response;
}, function (error) {
    console.log(error);
    return _promise2.default.reject(error);
}); /*------------------------------------------------------------------------------------
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

function trustedGrant(iconfig) {
    'use strict';

    var link = iconfig.link;

    var auth1 = new Buffer(iconfig.clientID + ':' + iconfig.clientSecret).toString('base64');
    auth1 = 'Basic ' + auth1;
    var config = {
        method: link.method,
        url: iconfig.host + link.href,

        headers: {
            Accept: link.responseType,

            'Content-Type': link.type, /* Axios seems to be case sensitive */

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
            return _qs2.default.stringify(data);
        }
    };

    return makeCall(config, iconfig);
}

function request(iconfig) {
    'use strict';

    var link = iconfig.link,
        logonInfo = iconfig.logonInfo;


    var iLink = (0, _extends3.default)({}, link);
    var payload = iconfig.hasOwnProperty('payload') ? iconfig.payload : null;
    var iqs = null;
    var idata = null;
    var iheaders = null;
    var casAction = null;

    if (payload !== null) {
        casAction = hasItem(payload, 'action');
        iqs = hasItem(payload, 'qs');
        idata = hasItem(payload, 'data');
        iheaders = hasItem(payload, 'headers');
    }

    var url = '' + logonInfo.host + iLink.href;

    // handle casaction upload
    casAction = casAction != null ? casAction.toLowerCase() : null;
    if (casAction === 'upload') {
        casAction = 'table.upload';
    }

    if (casAction !== null) {
        url = url + '/' + casAction;
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
                config.headers[ih] = (0, _typeof3.default)(iheaders[ih]) === 'object' ? (0, _stringify2.default)(iheaders[ih]) : iheaders[ih];
            } else {
                //noinspection JSUnfilteredForInLoop
                config.headers[ih] = iheaders[ih];
            }
        }
    }

    if (iqs !== null) {
        config.params = (0, _extends3.default)({}, iqs);
    }

    /*
        if ( idata !== null ) {
            config.data = idata;
        }
    */
    config.data = idata === null ? {} : idata;

    // config.timeout = 60000;

    return makeCall(config, iconfig);
}

function makeCall(config, iconfig) {
    return new _promise2.default(function (resolve, reject) {
        (0, _axios2.default)(config).then(function (response) {
            parseJSON(response.data).then(function (data) {
                response.data = { results: data, iconfig: (0, _assign2.default)({}, iconfig) };
                if (data.hasOwnProperty('errorCode')) {
                    //noinspection JSUnresolvedVariable
                    response.status = response.data.results.httpStatusCode;
                    response.statusText = 'errorCode: ' + response.data.results.errorCode;
                    reject({ response: response });
                } else {
                    resolve((0, _fixResponse2.default)(response));
                }
            }).catch(function () {
                response.data = { results: response.data, iconfig: (0, _assign2.default)({}, iconfig) };
                resolve((0, _fixResponse2.default)(response));
            });
        }).catch(function (error) {
            reject(error);
        });
    });
}

function parseJSON(data) {
    //noinspection JSUnusedLocalSymbols
    return new _promise2.default(function (resolve, reject) {

        if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(payload)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            if (k.toUpperCase() === name.toUpperCase()) {
                return payload[k];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
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
}

// Code below is for experimenting.

function implicitGrant(iconfig) {

    /* */
    var link = iconfig.link;
    window.location.href = iconfig.host + link.href + '?response_type=' + link.responseType + '&client_id=' + iconfig.clientID;

    return new _promise2.default.resolve();
}

exports.trustedGrant = trustedGrant;
exports.implicitGrant = implicitGrant;
exports.request = request;

/***/ }),
/* 15 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.statusInfoStruct = exports.itemsStruct = exports.tLinkStruct = undefined;

var _actionTypes = __webpack_require__(0);

function tLinkStruct(name, type, service) {
    if (service === _actionTypes.APP_DATA_ROOT || service === _actionTypes.API_STATUS_ROOT) {
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
        method: 'GET', /* for cmd tLinks - useful in UI */
        iconfig: {}, /* input config */
        payload: {},
        statusInfo: statusInfoStruct(),
        runStatus: 'idle',

        parentRoute: '',
        route: '',

        resultType: '',
        links: {}, /* same structures */
        /*  cmds      : {}, */
        scrollCmds: {}, /* same structure */
        paginator: false,
        itemsList: [],
        items: [], /* items Struct */
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
        relPath.route = service + ':/' + service;
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

exports.tLinkStruct = tLinkStruct;
exports.itemsStruct = itemsStruct;
exports.statusInfoStruct = statusInfoStruct;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 17 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reducers = __webpack_require__(11);

var injectAsyncReducers = function injectAsyncReducers(store, name, asyncReducer) {
    if (store.asyncReducers.hasOwnProperty(name)) {
        delete store.asyncReducers[name];
    }

    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer((0, _reducers.createReducer)(store.asyncReducers));
    return true;
};

exports.default = injectAsyncReducers;

/***/ }),
/* 18 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(9);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _arguments = arguments;

var _getResults = __webpack_require__(12);

var _getResults2 = _interopRequireDefault(_getResults);

var _extendFolder = __webpack_require__(8);

var _extendFolder2 = _interopRequireDefault(_extendFolder);

var _prepareAction = __webpack_require__(29);

var _prepareAction2 = _interopRequireDefault(_prepareAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iapiCall = function iapiCall(store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext) {
    return new _promise2.default(function (resolve, reject) {

        var route = void 0;
        var unSubscribe = void 0;
        var start = true;

        // create action
        var action = (0, _prepareAction2.default)(store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext);
        if (action === null) {
            reject({
                error: 'Bad route and/or rafLink',
                args: (0, _stringify2.default)(_arguments, null, 4)
            });
        }
        // save route
        //noinspection JSUnresolvedVariable
        route = action.route;

        // subscribe callback
        var nextE = function nextE() {

            if (start) {
                start = false;
                return;
            }

            var f = (0, _getResults2.default)(store, route);

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
                    resolve((0, _extendFolder2.default)(store, f));
                }
            }
        };

        // subscribe to store
        unSubscribe = store.subscribe(nextE);

        // dispatch action
        store.dispatch(action);
    });
};

exports.default = iapiCall;

/***/ }),
/* 19 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(9);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _actionTypes = __webpack_require__(0);

var _getResults = __webpack_require__(12);

var _getResults2 = _interopRequireDefault(_getResults);

var _prepareAction = __webpack_require__(29);

var _prepareAction2 = _interopRequireDefault(_prepareAction);

var _extendFolder = __webpack_require__(8);

var _extendFolder2 = _interopRequireDefault(_extendFolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiCallAll = function apiCallAll(store, allActions, delay) {
    return new _promise2.default(function (resolve, reject) {

        //
        // create actionArray
        //

        var actionArray = allActions.map(function (acti) {
            //noinspection JSUnresolvedVariable
            var iroute = acti.rafLink;
            var payload = acti.hasOwnProperty('payload') === true ? acti.payload : null;
            var action = (0, _prepareAction2.default)(store, iroute, _actionTypes.API_CALL, payload, delay, null, null, null);
            if (action === null) {
                reject({
                    err: 'Invalid route and/or rafLink',
                    args: (0, _stringify2.default)(acti, null, 4)
                });
            }
            return action;
        });

        //
        // set start state
        //

        var start = true;

        //
        // subscribe callback
        //
        var nextE = function nextE() {
            if (start) {
                start = false;
                return;
            }

            var folders = [];
            //
            // check for completion
            //
            for (var i = 0; i < actionArray.length; i++) {
                //noinspection JSUnresolvedVariable
                var f = (0, _getResults2.default)(store, actionArray[i].route);
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
                        folders.push((0, _extendFolder2.default)(store, f));
                    }
                }
            }

            //
            // If all done the resolve promise
            //
            if (folders.length === actionArray.length) {
                resolve(folders);
            }
        };

        //
        // subscribe to store
        //
        var unSubscribe = store.subscribe(nextE);

        //
        // dispatch array actions
        // interval is place holder - TBD
        //

        store.dispatch({
            type: _actionTypes.API_CALL_PARALLEL,
            actionArray: actionArray
        });
    });
};

exports.default = apiCallAll;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _serverCalls = __webpack_require__(14);

function httpCall(config) {
    return (0, _serverCalls.request)(config).then(function (response) {
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

exports.default = httpCall;

/***/ }),
/* 26 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.responseReducer = undefined;

var _getIterator2 = __webpack_require__(22);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = __webpack_require__(16);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = __webpack_require__(23);

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _utils = __webpack_require__(13);

var _rootStruct = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responseReducer = function responseReducer(action, parentPath) {

    var response = null;
    /* */

    if (action.error === true) {
        response = (0, _rootStruct.tLinkStruct)('error', 'error');
        response.link = action.config.href;
        response.runStatus = 'error';
        response.statusInfo = (0, _utils.setBadStatus)(action.payload);
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
    }

    // results with a list of items
    if (results.hasOwnProperty('items')) {
        response = itemsReducer(results, parentPath);
        response.resultType = results.accept == undefined ? contentType : results.accept;

        // result has links and data
    } else if (results.hasOwnProperty('links')) {
        /* got just links */

        response = tLinkReducer(results.links, parentPath);
        var data = (0, _extends3.default)({}, results);
        delete data.links;
        // Need to handle the cases as in vnd.sas.data.row.set which return data with no items array

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
        response.resultType = contentType;

        // plain data case - no links at the top level
    } else {
        response = (0, _rootStruct.tLinkStruct)('data', 'data');
        response.type = 'data';
        response.resultType = contentType;
        response.items = {
            resultType: contentType,
            data: typeof results === 'string' ? results : (0, _assign2.default)({}, results),
            cmds: null
        };
    }

    /* response.raw = Object.assign( {}, results );*/
    //noinspection JSUnresolvedVariable

    response.link = action.config.link.href;
    response.runStatus = 'ready';

    response.statusInfo = (0, _utils.setGoodStatus)(action.payload);
    var c = action.config;
    var hc = action.payload.config;

    var temp = hc.url.split('/');
    response.host = temp[0] + '//' + temp[2];
    response.iconfig = {
        input: {
            link: (0, _extends3.default)({}, c.link),
            payload: c.hasOwnProperty('payload') ? (0, _assign2.default)({}, c.payload) : {}
        },
        http: {
            url: hc.url,
            payload: {
                headers: [].concat(hc.headers),
                data: hc.data == null ? {} : (0, _typeof3.default)(hc.data) === 'object' ? (0, _assign2.default)({}, hc.data) : hc.data,
                qs: hc.params == null ? {} : (0, _typeof3.default)(hc.params) === 'object' ? (0, _assign2.default)({}, hc.params) : hc.params
            }
        }
    };
    return response;
};

function tLinkReducer(iLinks, parentPath) {

    var r = (0, _rootStruct.tLinkStruct)(parentPath[parentPath.length - 1], 'links');
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
    var tlinks = void 0;

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
    var tSearchPath = [].concat((0, _toConsumableArray3.default)(parentPath), [subType]);
    var linksMap = {};
    tlinks.map(function (l) {
        var ts = [].concat((0, _toConsumableArray3.default)(tSearchPath), [l.rel]);
        if (l.hasOwnProperty('title') === false) {
            l.title = l.rel;
        }
        var lx = {
            link: (0, _extends3.default)({}, l),
            method: l.method,
            route: ts.join(':/'),
            parentRoute: [].concat((0, _toConsumableArray3.default)(parentPath)).join(':/'),
            paginator: subCmds.includes(l.rel)
        };
        linksMap[l.rel] = (0, _extends3.default)({}, (0, _rootStruct.tLinkStruct)(l.title, subType), lx);
    });
    return linksMap;
}

function itemsReducer(results, parentPath) {

    var idList = [];
    var rows = {};

    var response = (0, _rootStruct.tLinkStruct)(parentPath[parentPath.length - 1], 'links');
    var itemsResponse = (0, _rootStruct.itemsStruct)();
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
            for (var _iterator = (0, _getIterator3.default)(results.items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                index++;
                var name = void 0;
                if (item.hasOwnProperty('name2')) {
                    name = item.name2;
                } else {
                    name = item.hasOwnProperty('name') ? item.name : item.hasOwnProperty('id') ? item.id : '' + index;
                }
                idList.push(name);
                var tRoute = [].concat((0, _toConsumableArray3.default)(parentPath), ['items', 'data', name]);
                var rowcmds = setupRelPaths(item.links, tRoute, 'cmds');

                var data = (0, _extends3.default)({}, item);
                delete data.links;

                var row = (0, _rootStruct.itemsStruct)();
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
                if (!_iteratorNormalCompletion && _iterator.return) {
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
        response.itemsList = [].concat(idList);
        response.type = 'itemsList';
    } else {
        /**/
        itemsResponse.data = [].concat((0, _toConsumableArray3.default)(results.items));
        itemsResponse.resultType = results.accept;
        itemsResponse.type = 'itemsArray';
        response.type = 'itemsArray';
    }

    response.items = itemsResponse;
    return response;
}

function setDetails(results) {
    var r = (0, _extends3.default)({}, results);
    if (r.hasOwnProperty('links')) {
        delete r.links;
    }
    if (r.hasOwnProperty('items')) {
        delete r.items;
    }
    return r;
}

exports.responseReducer = responseReducer;

/***/ }),
/* 27 */
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iapiCall = __webpack_require__(18);

var _iapiCall2 = _interopRequireDefault(_iapiCall);

var _actionTypes = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiCall = function apiCall(store, iroute, payload, delay) {
  return (0, _iapiCall2.default)(store, iroute, _actionTypes.API_CALL, payload, delay, null);
};

exports.default = apiCall;

/***/ }),
/* 28 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(16);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Immutable = __webpack_require__(5);

function iGetResults(store, iroute, keyOnly) {

    var result = void 0;
    var route = void 0;
    var iquery = [];
    var q = void 0;
    var serviceName = void 0;
    var folder = void 0;
    var path = [];

    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
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
        path = [].concat((0, _toConsumableArray3.default)(q), (0, _toConsumableArray3.default)(iquery));
    } else {
        path = iquery;
        if (Immutable.Iterable.isIterable(iroute)) {
            folder = iroute;
        } else {
            return null;
        }
    }

    // should never happen but...
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

exports.default = iGetResults;

/***/ }),
/* 29 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getResults = __webpack_require__(12);

var _getResults2 = _interopRequireDefault(_getResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Immutable = __webpack_require__(5);

var prepareAction = function prepareAction(store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext) {
    var paginator = void 0;
    var route = void 0;
    var link = void 0;
    var serviceName = void 0;
    var current = void 0;

    if (typeof iroute === 'string') {
        current = (0, _getResults2.default)(store, iroute);
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

    if (payload != null) {
        action.payload = payload;
    }
    return action;
};
exports.default = prepareAction;

/***/ }),
/* 30 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(20);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var jobState = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(store, job, payload, maxTries, delay, progressHandler, jobContext) {
        var waitFlag, tries, status, failed;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        waitFlag = false;
                        tries = 1;
                        status = void 0;

                        if (maxTries === 'wait') {
                            tries = 1;
                            waitFlag = true;
                        } else {
                            tries = !maxTries ? 1 : maxTries;
                        }

                    case 4:
                        _context.next = 6;
                        return (0, _ijobState2.default)(store, job, payload, delay, waitFlag, progressHandler, jobContext);

                    case 6:
                        status = _context.sent;
                        failed = status.detail.hasOwnProperty('failed');

                        if (!(status.running === 0)) {
                            _context.next = 14;
                            break;
                        }

                        tries = 0;

                        if (!(failed === false)) {
                            _context.next = 14;
                            break;
                        }

                        _context.next = 13;
                        return (0, _apiCall2.default)(store, job.links('self'));

                    case 13:
                        status.jobState.job = _context.sent;

                    case 14:
                        if (--tries > 0) {
                            _context.next = 4;
                            break;
                        }

                    case 15:
                        return _context.abrupt('return', status.jobState);

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function jobState(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
        return _ref.apply(this, arguments);
    };
}();

var _ijobState = __webpack_require__(58);

var _ijobState2 = _interopRequireDefault(_ijobState);

var _apiCall = __webpack_require__(27);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = jobState;

/***/ }),
/* 31 */
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



Object.defineProperty(exports, "__esModule", {
  value: true
});
var endStore = function endStore(store) {
  store.dispatch({ type: 'END' });
};
exports.default = endStore;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
module.exports = __webpack_require__(34);


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 34 */
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



var _store = __webpack_require__(35);

module.exports = { initStore: _store.initStore, endStore: _store.endStore };

/***/ }),
/* 35 */
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



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endStore = exports.initStore = undefined;

var _initStore = __webpack_require__(36);

var _initStore2 = _interopRequireDefault(_initStore);

var _endStore = __webpack_require__(31);

var _endStore2 = _interopRequireDefault(_endStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.initStore = _initStore2.default;
exports.endStore = _endStore2.default;

/***/ }),
/* 36 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _configureSagaStore = __webpack_require__(37);

var _configureSagaStore2 = _interopRequireDefault(_configureSagaStore);

var _actionTypes = __webpack_require__(0);

var _injectAsyncReducers = __webpack_require__(17);

var _injectAsyncReducers2 = _interopRequireDefault(_injectAsyncReducers);

var _reducers = __webpack_require__(11);

var _apiCall = __webpack_require__(27);

var _apiCall2 = _interopRequireDefault(_apiCall);

var _apiCallAll = __webpack_require__(19);

var _apiCallAll2 = _interopRequireDefault(_apiCallAll);

var _apiSubmit = __webpack_require__(57);

var _apiSubmit2 = _interopRequireDefault(_apiSubmit);

var _jobState = __webpack_require__(30);

var _jobState2 = _interopRequireDefault(_jobState);

var _jobStateAll = __webpack_require__(59);

var _jobStateAll2 = _interopRequireDefault(_jobStateAll);

var _request = __webpack_require__(61);

var _request2 = _interopRequireDefault(_request);

var _getServices = __webpack_require__(62);

var _getServices2 = _interopRequireDefault(_getServices);

var _addServices = __webpack_require__(63);

var _addServices2 = _interopRequireDefault(_addServices);

var _getServiceRoot = __webpack_require__(64);

var _getServiceRoot2 = _interopRequireDefault(_getServiceRoot);

var _logon = __webpack_require__(65);

var _logon2 = _interopRequireDefault(_logon);

var _logoff = __webpack_require__(67);

var _logoff2 = _interopRequireDefault(_logoff);

var _endStore = __webpack_require__(31);

var _endStore2 = _interopRequireDefault(_endStore);

var _routeToObj = __webpack_require__(68);

var _routeToObj2 = _interopRequireDefault(_routeToObj);

var _selectLogonInfo = __webpack_require__(10);

var _selectLogonInfo2 = _interopRequireDefault(_selectLogonInfo);

var _appData = __webpack_require__(69);

var _appData2 = _interopRequireDefault(_appData);

var _deleteRafObject = __webpack_require__(70);

var _deleteRafObject2 = _interopRequireDefault(_deleteRafObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import jobStatus  from './jobStatus';
function initStore() {
    var store = (0, _configureSagaStore2.default)();

    (0, _injectAsyncReducers2.default)(store, _actionTypes.API_STATUS_ROOT, (0, _reducers.reducer)(_actionTypes.API_STATUS_ROOT));
    (0, _injectAsyncReducers2.default)(store, _actionTypes.APP_DATA_ROOT, (0, _reducers.reducer)(_actionTypes.APP_DATA_ROOT));

    return {
        logon: _logon2.default.bind(null, store),
        logoff: _logoff2.default.bind(null, store),
        connection: loggedOn.bind(null, store),

        addServices: _addServices2.default.bind(null, store),
        getServices: _getServices2.default.bind(null, store),

        apiCall: _apiCall2.default.bind(null, store),
        apiCallAll: _apiCallAll2.default.bind(null, store),
        rafObject: _routeToObj2.default.bind(null, store),

        deleteRafObject: _deleteRafObject2.default.bind(null, store),

        jobState: _jobState2.default.bind(null, store),
        jobStateAll: _jobStateAll2.default.bind(null, store),

        submit: _apiSubmit2.default.bind(null, store),
        submitStatus: getApiStatus.bind(null, store),

        setAppData: _appData2.default.bind(null, store),
        getAppData: getAppData.bind(null, store),

        getState: store.getState,
        endStore: _endStore2.default.bind(null, store),
        store: store,

        getServiceRoot: _getServiceRoot2.default.bind(null, store),

        request: _request2.default
    };
}

function loggedOn(store) {
    return (0, _selectLogonInfo2.default)(store.getState());
}

function getAppData(store) {
    var list = store.getState()[_actionTypes.APP_DATA_ROOT];

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    var path = args.length > 0 ? ['userData'].concat(args) : ['userData'];
    return list.getIn(path, null);
}

function getApiStatus(store, jobContext) {
    var list = store.getState()[_actionTypes.API_STATUS_ROOT];
    var result = null;
    if (!jobContext) {
        result = list.get('routeList');
    } else {
        var r = list.getIn(['userData', jobContext], null);
        if (r !== null) {
            result = r.toJS();
            result.job = (0, _routeToObj2.default)(store, result.route);
        }
    }
    return result;
}
exports.default = initStore;

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



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureSagaStore;

var _redux = __webpack_require__(21);

var _reduxSaga = __webpack_require__(4);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _sagas = __webpack_require__(38);

var _sagas2 = _interopRequireDefault(_sagas);

var _reducers = __webpack_require__(11);

var _injectAsyncReducers = __webpack_require__(17);

var _injectAsyncReducers2 = _interopRequireDefault(_injectAsyncReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Configure the Redux store with redux-saga middleware. Store extended for SAS Viya
 * @constructor
 */
function configureSagaStore() {

  var sagaMiddleWare = (0, _reduxSaga2.default)();

  var store = (0, _redux.createStore)((0, _reducers.createReducer)(), (0, _redux.applyMiddleware)(sagaMiddleWare));

  store.asyncReducers = {};
  store.injectAsyncReducers = _injectAsyncReducers2.default;
  store.apiCallNo = 0;
  //noinspection JSUnresolvedFunction
  sagaMiddleWare.run(_sagas2.default);
  return store;
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _logonAction = __webpack_require__(39);

var _logonAction2 = _interopRequireDefault(_logonAction);

var _apiCallAction = __webpack_require__(47);

var _apiCallAction2 = _interopRequireDefault(_apiCallAction);

var _apiCallAllAction = __webpack_require__(49);

var _apiCallAllAction2 = _interopRequireDefault(_apiCallAllAction);

var _apiPollAction = __webpack_require__(50);

var _apiPollAction2 = _interopRequireDefault(_apiPollAction);

var _appDataAction = __webpack_require__(53);

var _appDataAction2 = _interopRequireDefault(_appDataAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(rootSaga);

function rootSaga() {
    return _regenerator2.default.wrap(function rootSaga$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return [(0, _logonAction2.default)(), (0, _apiCallAction2.default)(), (0, _apiCallAllAction2.default)(), (0, _apiPollAction2.default)(), (0, _appDataAction2.default)()];

                case 2:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}
exports.default = rootSaga;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = __webpack_require__(6);

var _utils = __webpack_require__(13);

var _actionTypes = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(logonAction);

function logonAction() {
    var f, action, payload, _payload;

    return _regenerator2.default.wrap(function logonAction$(_context) {
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
                    return (0, _effects.take)(_actionTypes.VIYA_LOGON);

                case 4:
                    action = _context.sent;
                    _context.next = 7;
                    return (0, _effects.put)({ type: _actionTypes.BEGIN_LOGON });

                case 7:
                    _context.next = 9;
                    return (0, _effects.call)(sasLogon, action);

                case 9:
                    payload = _context.sent;
                    _context.next = 12;
                    return (0, _effects.put)(payload);

                case 12:
                    if (!(payload.error === false)) {
                        _context.next = 18;
                        break;
                    }

                    _context.next = 15;
                    return (0, _effects.take)(_actionTypes.VIYA_LOGOFF);

                case 15:
                    _payload = {
                        type: _actionTypes.VIYA_LOGOFF,
                        payload: null
                    };
                    _context.next = 18;
                    return (0, _effects.put)(_payload);

                case 18:
                    _context.next = 1;
                    break;

                case 20:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function sasLogon(action) {
    var config = (0, _extends3.default)({}, action.payload);
    /* */

    if (config.authType === _actionTypes.VIYA_LOGON_SERVER || config.authType === _actionTypes.VIYA_LOGON_IMPLICIT) {
        return {
            type: config.authType,
            error: false,
            payload: {
                iconfig: config
            }
        };
    } else {

        var t = (0, _utils.SASLogonOauthLink)(config.authType);
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
        type: _actionTypes.VIYA_LOGON_COMPLETE,
        error: false,
        payload: payload
    };
}

function viyaLogonError(payload) {
    return {
        type: _actionTypes.VIYA_LOGON_COMPLETE,
        error: true,
        payload: payload
    };
}

exports.default = logonAction;

/***/ }),
/* 40 */
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
/* 41 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SASLogonOauthLink = undefined;

var _serverCalls = __webpack_require__(14);

var _actionTypes = __webpack_require__(0);

var SASLogonOauthLink = function SASLogonOauthLink(type) {

    if (type === _actionTypes.VIYA_LOGON_PASSWORD || type == undefined) {
        return {
            logon: _serverCalls.trustedGrant,
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
            logon: _serverCalls.implicitGrant,
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
exports.SASLogonOauthLink = SASLogonOauthLink;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fixResponse(response) {

    //
    // Ensure all header keys are lowercase
    //

    var headers = {};

    for (var k in response.headers) {
        //noinspection JSUnfilteredForInLoop
        var k1 = k.toLowerCase();
        //noinspection JSUnfilteredForInLoop
        headers[k1] = response.headers[k];
    }

    response.headers = headers;
    var cType = response.headers['content-type'];

    if (cType == null || typeof response.data.results === 'string') {
        return response;
    }

    // let contentType = cType.split(';') [0];
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
            var items = Array.isArray(images) === true ? [].concat(images) : (0, _assign2.default)({}, images);
            items[0].id = 'image';
            response.data.results.items = items;
            delete response.data.results.images;
        }
    }
}
function fixCas(iLink, response) {
    // special handling for cas


    if (iLink.rel === 'createSession' && iLink.responseType === 'application/vnd.sas.cas.session') {
        response.data.results.links = response.data.results.links.concat(fixCasSession(iLink, response.data.results));
        response.data.results.name2 = response.data.results.name.split(':')[0];

        // response.data.results       = { items: [ Object.assign( {}, response.data.results ) ] };
    }

    if (iLink.hasOwnProperty('itemType') && iLink.itemType === 'application/vnd.sas.cas.session.summary') {
        var items = response.data.results.items;
        var harray = iLink.href.split('/');
        harray.shift();
        var server = harray[2];
        // let pre   = `/casProxy/servers/${server}/cas/sessions`;

        var pre = '/' + iLink.casHttp + '/cas/sessions';
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            /* get rid of casManagement in front */
            var uri = pre + '/' + item.id;
            item.links = item.links.concat(casSessionLinks(uri));
        }
    }

    if (iLink.hasOwnProperty('customHandling')) {
        response.data.results = reduceCasResult(response.data.results);
        response.data.results = { items: (0, _assign2.default)({}, response.data.results) };
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
                l.casHttp = name + '-http';
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
            var reportUri = '/SASReportViewer/?reportUri=/reports/reports/' + items[i].id;
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

function fixCasSession(iLink, results) {

    return sessionLinks(iLink, results.id).concat(results.links);
}

function reduceCasResult(data) {
    var tables = {};
    if (data.hasOwnProperty('results') === false) {
        return data;
    }
    var results = (0, _assign2.default)({}, data.results);
    for (var k in results) {
        //noinspection JSUnfilteredForInLoop
        var o = results[k];
        if (o.hasOwnProperty('_ctb') === true && o['_ctb'] === true) {
            //noinspection JSUnfilteredForInLoop
            tables[k] = (0, _assign2.default)({}, o);
            //noinspection JSUnfilteredForInLoop
            // delete data.results[ k ];
        }
    }
    data.tables = tables;
    return data;
}

function sessionLinks(iLink, sessionId) {
    /**/

    var harray = iLink.href.split('/');
    var server = harray[harray.length - 2];
    // let uri = `/casProxy/servers/${server}/cas/sessions/${sessionId}`;
    var uri = '/' + iLink.casHttp + '/cas/sessions/' + sessionId;
    return casSessionLinks(uri);
}
function casSessionLinks(uri) {

    return [{
        method: 'POST',
        href: uri + '/actions', /* payload: data:...., qs: {action: ...} */
        rel: 'execute',
        uri: uri + '/actions',
        responseType: 'application/json',
        type: 'application/json',
        itemType: 'application/json',
        title: 'Run CAS Action',
        customHandling: 'casExecute',
        extended: true
    }, {
        method: 'GET',
        href: uri + '/isIdle', /* need to convert true/false to busy and completed */
        rel: 'state',
        uri: uri + '/isIdle',
        responseType: 'application/json',
        type: 'application/json',
        itemType: 'application/json',
        title: 'state',
        customHandling: 'casState',
        extended: true
    }];
}

exports.default = fixResponse;

/***/ }),
/* 45 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__(9);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareConfig = function prepareConfig(connection, iconfig) {

    console.log('-------------------------------------------------------------------------------');
    console.log('Input configuration');
    console.log((0, _stringify2.default)(iconfig, null, 4));
    console.log('-------------------------------------------------------------------------------');

    var config = {
        method: iconfig.method,
        url: iconfig.href.indexOf('http') === -1 ? connection.host + iconfig.href : iconfig.href,
        headers: {}
    };
    config.auth[connection.tokenType] = connection.token;

    var type = fullType(iconfig.type);
    config.headers.Accept = type;
    if (iconfig.hasOwnProperty('responseType')) {
        config.headers['Content-Type'] = type;
        config.headers['Accept'] = fullType(iconfig.responseType);
    }

    if (iconfig.hasOwnProperty('qs')) {
        config.qs = (0, _assign2.default)({}, iconfig.qs);
    }

    if (iconfig.hasOwnProperty('data')) {
        config.body = iconfig.data;
    }

    return config;
};

function fullType(type) {
    var ntype = type;
    if (ntype === undefined || ntype === null) {
        ntype = null;
    } else {
        if (ntype.indexOf('application/') !== -1) {
            if (ntype.indexOf('json') === -1) {
                ntype = type + '+json';
            }
        }
    }
    return ntype;
}

exports.default = prepareConfig;

/***/ }),
/* 46 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});
var Immutable = __webpack_require__(5);

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
exports.default = routeOrFolder;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

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



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = __webpack_require__(4);

var _actionTypes = __webpack_require__(0);

var _apiCall = __webpack_require__(48);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(apiCallAction);

function apiCallAction() {
  return _regenerator2.default.wrap(function apiCallAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield((0, _reduxSaga.takeEvery)([_actionTypes.ADD_SERVICE, _actionTypes.API_CALL], _apiCall2.default), 't0', 1);

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

exports.default = apiCallAction;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _reduxSaga = __webpack_require__(4);

var _effects = __webpack_require__(6);

var _httpCall = __webpack_require__(25);

var _httpCall2 = _interopRequireDefault(_httpCall);

var _selectLogonInfo = __webpack_require__(10);

var _selectLogonInfo2 = _interopRequireDefault(_selectLogonInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(apiCall);

function apiCall(action) {
    var config, payload;
    return _regenerator2.default.wrap(function apiCall$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    config = (0, _extends3.default)({}, action);
                    _context.next = 3;
                    return (0, _effects.select)(_selectLogonInfo2.default);

                case 3:
                    config.logonInfo = _context.sent;
                    _context.next = 6;
                    return (0, _effects.put)({ type: config.serviceName + '_' + action.type + '_BEGIN', config: config });

                case 6:
                    if (!(action.delay > 0)) {
                        _context.next = 9;
                        break;
                    }

                    _context.next = 9;
                    return (0, _reduxSaga.delay)(action.delay * 1000);

                case 9:
                    _context.next = 11;
                    return (0, _effects.call)(_httpCall2.default, config);

                case 11:
                    payload = _context.sent;
                    _context.next = 14;
                    return (0, _effects.put)(payload);

                case 14:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

exports.default = apiCall;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = __webpack_require__(6);

var _reduxSaga = __webpack_require__(4);

var _selectLogonInfo = __webpack_require__(10);

var _selectLogonInfo2 = _interopRequireDefault(_selectLogonInfo);

var _actionTypes = __webpack_require__(0);

var _httpCall = __webpack_require__(25);

var _httpCall2 = _interopRequireDefault(_httpCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(apiCallAllAction),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(yieldAll),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(setupService);

function apiCallAllAction() {
    return _regenerator2.default.wrap(function apiCallAllAction$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield((0, _reduxSaga.takeEvery)(_actionTypes.API_CALL_PARALLEL, yieldAll), 't0', 1);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function yieldAll(action) {
    var configs, actionArray, i, c, result, _i;

    return _regenerator2.default.wrap(function yieldAll$(_context2) {
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
                    return (0, _effects.call)(setupService, actionArray[i]);

                case 6:
                    c = _context2.sent;

                    configs.push(c);

                case 8:
                    i++;
                    _context2.next = 3;
                    break;

                case 11:
                    _context2.next = 13;
                    return (0, _effects.all)(configs.map(function (c) {
                        return (0, _effects.call)(_httpCall2.default, c);
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
                    return (0, _effects.put)(result[_i]);

                case 18:
                    _i++;
                    _context2.next = 15;
                    break;

                case 21:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}

function setupService(action) {
    var config;
    return _regenerator2.default.wrap(function setupService$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    config = (0, _extends3.default)({}, action);
                    _context3.next = 3;
                    return (0, _effects.select)(_selectLogonInfo2.default);

                case 3:
                    config.logonInfo = _context3.sent;
                    _context3.next = 6;
                    return (0, _effects.put)({ type: config.serviceName + '_' + config.type + '_BEGIN', config: config });

                case 6:
                    return _context3.abrupt('return', config);

                case 7:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this);
}

exports.default = apiCallAllAction;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = __webpack_require__(4);

var _actionTypes = __webpack_require__(0);

var _apiPoll = __webpack_require__(51);

var _apiPoll2 = _interopRequireDefault(_apiPoll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(apiPollAction);

function apiPollAction() {
  return _regenerator2.default.wrap(function apiPollAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield((0, _reduxSaga.takeEvery)([_actionTypes.API_POLL], _apiPoll2.default), 't0', 1);

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

exports.default = apiPollAction;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _reduxSaga = __webpack_require__(4);

var _effects = __webpack_require__(6);

var _httpCallWait = __webpack_require__(52);

var _httpCallWait2 = _interopRequireDefault(_httpCallWait);

var _selectLogonInfo = __webpack_require__(10);

var _selectLogonInfo2 = _interopRequireDefault(_selectLogonInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(apiPoll);

function apiPoll(action) {
    var config, payload;
    return _regenerator2.default.wrap(function apiPoll$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    config = (0, _extends3.default)({}, action);
                    payload = null;
                    _context.next = 4;
                    return (0, _effects.select)(_selectLogonInfo2.default);

                case 4:
                    config.logonInfo = _context.sent;
                    _context.next = 7;
                    return (0, _effects.put)({ type: config.serviceName + '_' + action.type + '_BEGIN', config: config });

                case 7:
                    if (!config.delay) {
                        _context.next = 10;
                        break;
                    }

                    _context.next = 10;
                    return (0, _reduxSaga.delay)(config.delay * 1000);

                case 10:
                    _context.next = 12;
                    return (0, _effects.call)(_httpCallWait2.default, config);

                case 12:
                    payload = _context.sent;

                case 13:
                    if (payload === null) {
                        _context.next = 7;
                        break;
                    }

                case 14:
                    _context.next = 16;
                    return (0, _effects.put)(payload);

                case 16:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

exports.default = apiPoll;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _serverCalls = __webpack_require__(14);

function httpCallWait(config) {
    var states = ['running', 'pending'];
    var flag = void 0;
    return (0, _serverCalls.request)(config).then(function (response) {
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

exports.default = httpCallWait;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = __webpack_require__(4);

var _actionTypes = __webpack_require__(0);

var _effects = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(apiDataAction),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(appData);

function apiDataAction() {
    return _regenerator2.default.wrap(function apiDataAction$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield((0, _reduxSaga.takeEvery)([_actionTypes.APP_DATA, _actionTypes.API_STATUS], appData), 't0', 1);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function appData(action) {
    var newType, config;
    return _regenerator2.default.wrap(function appData$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    newType = action.type === 'APP_DATA' ? _actionTypes.APP_DATA_ROOT + '_' + _actionTypes.APP_DATA_SETSTATE : _actionTypes.API_STATUS_ROOT + '_' + _actionTypes.API_STATUS_SETSTATE;
                    config = {
                        type: newType,
                        payload: action
                    };
                    _context2.next = 4;
                    return (0, _effects.put)(config);

                case 4:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}

exports.default = apiDataAction;

/***/ }),
/* 54 */
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



/* import uuid from 'uuid' ;*/

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

exports.viyaLogon = viyaLogon;

var _actionTypes = __webpack_require__(0);

var _utils = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Immutable = __webpack_require__(5);
var Map = Immutable.Map,
    fromJS = Immutable.fromJS;


var initialState = fromJS({
    connections: [],
    user: 'none',
    type: 'server',
    currentConnection: -1,
    statusInfo: (0, _utils.statusInfoStruct)(),
    runStatus: 'idle'
});

function viyaLogon() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];


    switch (action.type) {

        case _actionTypes.BEGIN_LOGON:
            {
                return state.set('runStatus', 'busy');
            }
        case _actionTypes.VIYA_LOGON_SERVER:
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
        case _actionTypes.VIYA_LOGON_IMPLICIT:
            {
                /* */

                var _config = action.payload.iconfig;

                if (action.error === true) {
                    return state.withMutations(function (s) {
                        s.set('runStatus', 'error').set('statusInfo', fromJS((0, _utils.setBadStatus)(action.payload)));
                    });
                }
                var _newOne = {
                    type: 'implicit',
                    id: 1,
                    user: 'You',
                    desc: 'implicit',
                    logonInfo: (0, _extends3.default)({}, _config)
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

        case _actionTypes.VIYA_LOGON_COMPLETE:
            {

                if (action.error === true) {
                    return state.withMutations(function (s) {
                        s.set('runStatus', 'error').set('statusInfo', fromJS((0, _utils.setBadStatus)(action.payload)));
                    });
                }
                var _temp2 = {
                    currentConnection: state.get('currentConnection') + 1,
                    runStatus: 'ready',
                    statusInfo: (0, _utils.setGoodStatus)(action.payload),
                    user: action.payload.data.iconfig.user
                };

                return state.withMutations(function (s) {
                    //noinspection JSUnresolvedFunction
                    s.set('connections', s.get('connections').push(Map(newConnection(action.payload)))).merge(fromJS(_temp2));
                });
            }

        case _actionTypes.VIYA_LOGOFF:
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
        statusInfo: (0, _utils.setGoodStatus)(payload)
    };
}

/***/ }),
/* 55 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducer = undefined;

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _responseReducer = __webpack_require__(26);

var _actionTypes = __webpack_require__(0);

var _rootStruct = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Immutable = __webpack_require__(5);
var fromJS = Immutable.fromJS;


var reducer = function reducer(root) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fromJS((0, _rootStruct.tLinkStruct)(root, 'links', root));
        var action = arguments[1];


        switch (action.type) {

            case _actionTypes.DELETE_RAF_OBJECT:
                {
                    var searchPath = action.route.split(':/');
                    var path = searchPath.slice(1);
                    var parent = state.getIn(path);
                    var newState = state.deleteIn(path);
                    return newState;
                }

            case root + '_' + _actionTypes.ADD_SERVICE + '_BEGIN':
                {

                    return state.set('runStatus', 'busy').set('route', root);
                }

            case root + '_' + _actionTypes.ADD_SERVICE + '_COMPLETE':
                {

                    var result = (0, _responseReducer.responseReducer)(action, [root]);
                    result.resultType = 'application/vnd.sas.api';
                    result.raw = (0, _extends3.default)({}, action.payload);
                    result.responseHeaders = (0, _extends3.default)({}, result.raw.headers);
                    result.route = root; // Need this for potential routing
                    return fromJS(result);
                }

            case root + '_' + _actionTypes.API_CALL + '_BEGIN':
            case root + '_' + _actionTypes.API_POLL + '_BEGIN':
                {
                    //noinspection JSUnresolvedVariable

                    var config = action.config;

                    var paginator = config.paginator;
                    var _searchPath = config.route.split(':/');
                    var _path = _searchPath.slice(paginator === true ? 1 : 2);
                    var _parent = state.getIn(_path);

                    // let payload    = {...config.payload };
                    // delete payload.route;
                    // parent = parent.set( 'runStatus', 'busy' ).set( 'payload', fromJS( payload ) );

                    _parent = _parent.set('runStatus', 'busy');
                    _path = _searchPath.slice(1);
                    return state.setIn(_path, _parent);
                }

            case root + '_' + _actionTypes.API_CALL + '_COMPLETE':
            case root + '_' + _actionTypes.API_POLL + '_COMPLETE':
                {
                    /* */
                    //noinspection JSUnresolvedVariable

                    var _config = action.config;


                    var _searchPath2 = _config.route.split(':/');
                    var _path2 = _searchPath2.slice(1);

                    var raw = (0, _assign2.default)({}, action.payload);
                    var _result = (0, _responseReducer.responseReducer)(action, _searchPath2);
                    _result.raw = raw;

                    if (_result.type === 'links' && _result.resultType == undefined) {
                        _result.resultType = 'application/vnd.sas.api';
                    }

                    var method = action.config.link.method;
                    _result.title = action.config.link.href;

                    _result.responseHeaders = (0, _extends3.default)({}, raw.headers);

                    _result.route = _searchPath2.join(':/');
                    var newParent = fromJS(_result);
                    var nState = state.setIn(_path2, newParent);
                    return nState;
                }

            case root + '_' + _actionTypes.APP_DATA + '_SETSTATE':
                {
                    var _action$payload = action.payload,
                        route = _action$payload.route,
                        payload = _action$payload.payload;

                    var _path3 = void 0;
                    var userData = state.get('userData');
                    if (Array.isArray(route)) {
                        userData = userData.setIn(route, fromJS(payload));
                    } else {
                        userData = userData.set(route, fromJS(payload));
                    }
                    return state.set('userData', userData);
                }

            case root + '_' + _actionTypes.API_STATUS + '_SETSTATE':
                {
                    var _payload = action.payload.payload;

                    var jobContext = _payload.jobContext;
                    var _userData = state.get('userData');
                    var routeList = state.get('routeList').push(jobContext);
                    _userData = _userData.set(jobContext, fromJS(_payload));
                    return state.set('userData', _userData).set('routeList', routeList);
                }

            default:
                {
                    return state;
                }

        }
    };
};

exports.reducer = reducer;

/***/ }),
/* 56 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iGetResults = __webpack_require__(28);

var _iGetResults2 = _interopRequireDefault(_iGetResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getResults2(store, iroute, prePath) {

    var iquery = null;

    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
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

    return (0, _iGetResults2.default)(store, iroute, false, iquery);
}
exports.default = getResults2;

/***/ }),
/* 57 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(20);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext

var apiSubmit = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(store, iroute, payload, delay, jobContext, onCompletion, progress) {
        var job, status;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        if (progress) {
                            progress('pending', jobContext);
                        }

                        _context.next = 3;
                        return (0, _iapiCall2.default)(store, iroute, _actionTypes.API_CALL, payload, 0, null, null, jobContext);

                    case 3:
                        job = _context.sent;

                        if (!job.links('state')) {
                            _context.next = 12;
                            break;
                        }

                        _context.next = 7;
                        return (0, _jobState2.default)(store, job, null, 'wait', delay, progress, jobContext);

                    case 7:
                        status = _context.sent;

                        completion(store, onCompletion, status.data, status.job, jobContext);
                        return _context.abrupt('return', status.job);

                    case 12:
                        completion(store, onCompletion, 'unknown', job, jobContext);
                        return _context.abrupt('return', job);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function apiSubmit(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
        return _ref.apply(this, arguments);
    };
}();

var _jobState = __webpack_require__(30);

var _jobState2 = _interopRequireDefault(_jobState);

var _iapiCall = __webpack_require__(18);

var _iapiCall2 = _interopRequireDefault(_iapiCall);

var _actionTypes = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        type: _actionTypes.API_STATUS,
        route: jobContext,
        payload: payload
    };
    store.dispatch(action);
}
exports.default = apiSubmit;

/***/ }),
/* 58 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _iapiCall = __webpack_require__(18);

var _iapiCall2 = _interopRequireDefault(_iapiCall);

var _actionTypes = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ijobState(store, job, payload, delay, waitFlag, eventHandler, jobContext) {
    return new _promise2.default(function (resolve, reject) {

        var stateCmd = job.links('state');

        if (stateCmd === null) {
            var result = { job: job, data: 'completed', statusCode: 200 };
            resolve({ completed: 1, running: 0, jobState: result });
        } else {
            (0, _iapiCall2.default)(store, stateCmd, waitFlag === true ? _actionTypes.API_POLL : _actionTypes.API_CALL, payload, delay, eventHandler, job.route, jobContext).then(function (r) {

                var detail = {};
                var running = 0;

                var data = r.items();
                if (detail.hasOwnProperty(data) === false) {
                    detail[data] = 0;
                }
                detail[data] = detail[data] + 1;

                var httpCode = r.status;
                var result = { job: job, data: data, statusCode: httpCode };
                if (data === 'running' || data === 'pending') {
                    running = 1;
                }
                resolve({ running: running, detail: detail, jobState: result });
            }).catch(function (err) {

                reject(err);
            });
        }
    });
}

exports.default = ijobState;

/***/ }),
/* 59 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _ijobStateAll = __webpack_require__(60);

var _ijobStateAll2 = _interopRequireDefault(_ijobStateAll);

var _apiCallAll = __webpack_require__(19);

var _apiCallAll2 = _interopRequireDefault(_apiCallAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jobStateAll(store, jobList, payload, maxTries) {

    return new _promise2.default(function (resolve, reject) {
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

                (0, _apiCallAll2.default)(store, rafLinkSelf, null).then(function (newJobs) {
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

    (0, _ijobStateAll2.default)(store, jobList, payload).then(function (result) {

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

exports.default = jobStateAll;

/***/ }),
/* 60 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__(16);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _apiCallAll = __webpack_require__(19);

var _apiCallAll2 = _interopRequireDefault(_apiCallAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ijobStateAll(store, jobs, ipayload) {
    return new _promise2.default(function (resolve, reject) {
        /* */
        var payload = [];
        if (ipayload !== null) {
            if (Array.isArray(ipayload) === false) {
                for (var i = 0; i < jobs.length; i++) {
                    payload.push(ipayload);
                }
            } else {
                payload = [].concat((0, _toConsumableArray3.default)(ipayload));
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
                reject(' job ' + i + ' does not support state checking ');
            }
            var statePayload = payload[i];

            return {
                rafLink: rafLink,
                payload: (0, _extends3.default)({}, statePayload)
            };
        });

        (0, _apiCallAll2.default)(store, actionArray).then(function (results) {

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
                return { job: jobs[i], data: data, statusCode: httpCode };
            });
            resolve({ running: running, detail: detail, jobState: jobState });
        }).catch(function (err) {
            reject(err);
        });
    });
}
exports.default = ijobStateAll;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(20);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var request = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, reducer) {
    var r;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios(payload);

          case 2:
            r = _context.sent;
            return _context.abrupt('return', reducer == null ? r : reducer(r));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function request(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = __webpack_require__(24);
exports.default = request;

/***/ }),
/* 62 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});
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
exports.default = getServices;

/***/ }),
/* 63 */
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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _actionTypes = __webpack_require__(0);

var _getResults = __webpack_require__(12);

var _getResults2 = _interopRequireDefault(_getResults);

var _extendFolder = __webpack_require__(8);

var _extendFolder2 = _interopRequireDefault(_extendFolder);

var _injectAsyncReducers = __webpack_require__(17);

var _injectAsyncReducers2 = _interopRequireDefault(_injectAsyncReducers);

var _reducers = __webpack_require__(11);

var _immutable = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addServices = function addServices(store) {
    for (var _len = arguments.length, services = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        services[_key - 1] = arguments[_key];
    }

    return new _promise2.default(function (resolve, reject) {

        //
        // Add a reducer for each service
        //
        services.forEach(function (service) {
            if ((0, _injectAsyncReducers2.default)(store, service, (0, _reducers.reducer)(service)) === false) {
                reject((0, _immutable.fromJS)({ Error: service + '  exists' }));
            }
        });

        //
        // Create actionArray for the services
        //
        var actionArray = services.map(function (service) {
            return {
                type: _actionTypes.ADD_SERVICE,
                link: {
                    method: 'GET',
                    href: '/' + service + '/',
                    rel: 'root',
                    type: 'application/vnd.sas.api',
                    uri: '/' + service + '/'
                },

                logonInfo: null,
                tLink: null, /* null indicates root of service */
                serviceName: service,
                route: service
            };
        });

        //
        // The first callback needs to be ignored
        //
        var start = true;

        //
        // subscribe function
        //
        var nextE = function nextE() {

            if (start) {
                start = false;
                return;
            }

            var folders = {};
            /* */
            //
            // check the status of the call.
            // if all of them completed then resolve this promise or reject if error as soon as
            // an error is detected.
            //

            var count = 0;
            for (var i = 0; i < actionArray.length; i++) {
                //noinspection JSUnresolvedVariable
                var f = (0, _getResults2.default)(store, actionArray[i].route);
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
                        count++;
                        folders[services[i]] = (0, _extendFolder2.default)(store, f);
                    }
                }
            }

            if (count === actionArray.length) {
                resolve(folders);
            }
        };

        //
        // subscribe to store
        //
        var unSubscribe = store.subscribe(nextE);

        //
        // dispatch the actionArray
        //

        //
        // interval is a place holder for creating interval between calls
        // Yet to be implemented
        //

        store.dispatch({
            type: _actionTypes.API_CALL_PARALLEL,
            interval: -1,
            actionArray: actionArray
        });
    });
};

exports.default = addServices;

/***/ }),
/* 64 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extendFolder = __webpack_require__(8);

var _extendFolder2 = _interopRequireDefault(_extendFolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getServiceRoot(store, serviceName) {
    var f = null;
    var list = store.getState();
    for (var key in list) {
        if (key === serviceName) {
            //noinspection JSUnfilteredForInLoop
            return (0, _extendFolder2.default)(store, list[key]);
        }
    }
    return f;
}
exports.default = getServiceRoot;

/***/ }),
/* 65 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _actionTypes = __webpack_require__(0);

var _queryString = __webpack_require__(66);

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logon = function logon(store, ipayload) {
    return new _promise2.default(function (resolve, reject) {

        var unSubscribe = void 0;
        var action = void 0;
        var implicitLogon = false;

        var payload = ipayload == null ? null : (0, _extends3.default)({}, ipayload);

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
                    host: window.location.protocol + '//' + window.location.host,
                    authType: _actionTypes.VIYA_LOGON_SERVER
                };

                // Now check and see if we are in the callback for implicit flow
                if (window != null && window.location != null && window.location.hasOwnProperty('hash')) {
                    var windowLocation = window.location;
                    var host = _queryString2.default.parse(windowLocation.search);
                    var loc = _queryString2.default.parse(windowLocation.hash);
                    /* */
                    //
                    if (host !== null && host.host !== null) {
                        payload.host = host.host;
                        //noinspection JSUnresolvedVariable
                        payload.tokenType = host.token_type != null ? host.token_type : null;
                        //noinspection JSUnresolvedVariable
                        payload.token = host.access_token != null ? host.access_token : null;
                        if (payload.token !== null) {
                            payload.authType = _actionTypes.VIYA_LOGON_IMPLICIT;
                        }
                    }
                    //
                    //noinspection JSUnresolvedVariable
                    if (loc.access_token != null) {
                        payload = {
                            host: host.host,
                            token: loc['access_token'],
                            tokenType: loc['token_type'],
                            authType: _actionTypes.VIYA_LOGON_IMPLICIT
                        };
                    }
                }
            }

            // now make the final decision

            switch (payload.authType) {

                case _actionTypes.VIYA_LOGON_SERVER:
                    if (payload.host == null) {
                        payload.host = window.location.protocol + '//' + window.location.host;
                    }

                    break;

                case _actionTypes.VIYA_LOGON_IMPLICIT:
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
                    type: payload.authType === 'LOGOFF' ? 'LOGOFF' : _actionTypes.VIYA_LOGON,
                    payload: (0, _extends3.default)({}, payload)
                };
                unSubscribe = store.subscribe(logonExit);
                store.dispatch(action);
            }
        }
    });
};

function getToken(payload) {
    var x = payload.host + '/SASLogon/oauth/authorize?response_type=token&client_id=' + payload.clientID;
    //noinspection JSUnresolvedVariable
    if (payload.redirect != null) {
        //noinspection JSUnresolvedVariable
        var redirectUri = window.location.protocol + '//' + window.location.host + '/' + payload.redirect + '?host=' + payload.host;
        x = x + '&redirect_uri=' + redirectUri;
    }
    window.location.replace(x);
}

exports.default = logon;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),
/* 67 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _actionTypes = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unSubscribe = void 0;


function logoff(store) {
    //noinspection JSUnusedLocalSymbols
    return new _promise2.default(function (resolve, reject) {
        var action = {
            type: _actionTypes.VIYA_LOGOFF,
            payload: {}
        };
        var logoffExit = function logoffExit() {
            resolve(true);
        };

        unSubscribe = store.subscribe(logoffExit);
        store.dispatch(action);
    });
}
exports.default = logoff;

/***/ }),
/* 68 */
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



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extendFolder = __webpack_require__(8);

var _extendFolder2 = _interopRequireDefault(_extendFolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routeToObj(store, route) {
  var path = route.split(':/');
  var service = path.shift();
  var folder = store.getState()[service];
  folder = path.length > 0 ? folder.getIn(path) : folder;
  return (0, _extendFolder2.default)(store, folder);
}

exports.default = routeToObj;

/***/ }),
/* 69 */
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



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = __webpack_require__(0);

function appData(store, route, payload) {
    var action = {
        type: _actionTypes.APP_DATA,
        route: route,
        payload: payload
    };
    store.dispatch(action);
}

exports.default = appData;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = __webpack_require__(0);

var _immutable = __webpack_require__(5);

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deleteRafObject(store, iroute) {
    var route = null;
    if (typeof iroute === 'string') {
        route = iroute;
    } else if (_immutable2.default.Iterable.isIterable(iroute) === true) {
        route = iroute.get('route');
    }

    if (iroute !== null) {
        var action = {
            type: _actionTypes.DELETE_RAF_OBJECT,
            route: route
        };
        store.dispatch(action);
    }
}

exports.default = deleteRafObject;

/***/ })
/******/ ]);
});