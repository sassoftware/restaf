"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trustedGrant = trustedGrant;
exports.implicitGrant = implicitGrant;
exports.request = request;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _fixResponse = _interopRequireDefault(require("./fixResponse"));

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
_axios.default.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
/* X-Uaa-Csrf */


function trustedGrant(iconfig) {
  'use strict';

  var link = iconfig.link;
  debugger;
  var auth1 = Buffer.from(iconfig.clientID + ':' + iconfig.clientSecret).toString('base64');
  debugger;
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
      debugger;
      return status >= 200 && status < 300;
    },
    transformResponse: function transformResponse(data) {
      return data;
    },
    transformRequest: function transformRequest(data) {
      return _qs.default.stringify(data);
    }
  };
  debugger;
  return makeCall(config, iconfig);
}

function request(iconfig) {
  'use strict';

  var link = iconfig.link,
      logonInfo = iconfig.logonInfo;
  var iLink = (0, _objectSpread2.default)({}, link);
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
        config.headers[ih] = (0, _typeof2.default)(iheaders[ih]) === 'object' ? JSON.stringify(iheaders[ih]) : iheaders[ih];
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
    config.params = (0, _objectSpread2.default)({}, iqs);
  }

  config.data = idata === null ? {} : idata; // console.log(config);

  config.maxContentLength = 2 * 10063256;
  debugger; //console.log(config);

  return makeCall(config, iconfig);
}

function makeCall(config, iconfig) {
  return new Promise(function (resolve, reject) {
    (0, _axios.default)(config).then(function (response) {
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
          resolve((0, _fixResponse.default)(response));
        }
      }).catch(function () {
        iconfig.data = null;
        response.data = {
          results: response.data,
          iconfig: Object.assign({}, iconfig)
        };
        resolve((0, _fixResponse.default)(response));
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}

function parseJSON(data) {
  //noinspection JSUnusedLocalSymbols
  return new Promise(function (resolve, reject) {
    if ((0, _typeof2.default)(data) === 'object') {
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