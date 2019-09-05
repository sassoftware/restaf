"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trustedGrant = trustedGrant;
exports.keepAlive = keepAlive;
exports.request = request;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.object.assign");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.string.link");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _fixResponse = _interopRequireDefault(require("./fixResponse"));

var _https = _interopRequireDefault(require("https"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// axios.defaults.withCredentials = true
_axios.default.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
/* X-Uaa-Csrf */


function trustedGrant(iconfig) {
  var link = iconfig.link;
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
      return status >= 200 && status < 300;
    },
    transformResponse: function transformResponse(data) {
      return data;
    },
    transformRequest: function transformRequest(data) {
      return _qs.default.stringify(data);
    }
  };
  return makeCall(config, iconfig, iconfig.pem, iconfig.rejectUnauthorized);
}

function request(iconfig) {
  var link = iconfig.link,
      logonInfo = iconfig.logonInfo;

  var iLink = _objectSpread({}, link);

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
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300 || status === 302;
    }
  };

  if (logonInfo.token !== null) {
    config.headers = {
      Authorization: logonInfo.tokenType + ' ' + logonInfo.token
    };
  } else {
    config.headers = {};
    config.withCredentials = iconfig.withCredentials == null ? true : iconfig.withCredentials;
  }

  var type = fullType(iLink.type);

  if (iLink.hasOwnProperty('responseType')) {
    if (type !== null) {
      config.headers['Content-Type'] = type;
    }

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
    config.params = _objectSpread({}, iqs);
  }

  config.data = idata === null ? {} : idata;
  config.maxContentLength = 2 * 10063256;
  return makeCall(config, iconfig, logonInfo.pem, logonInfo.rejectUnauthorized);
}

function makeCall(config, iconfig, pem, rejectUnauthorized) {
  if (pem != null) {
    var rej = rejectUnauthorized === null ? true : rejectUnauthorized;
    var agent = new _https.default.Agent({
      ca: pem,
      rejectUnauthorized: rej
    });
    config.httpsAgent = agent;
  } else if (rejectUnauthorized != null) {
    var _agent = new _https.default.Agent({
      rejectUnauthorized: rejectUnauthorized
    });

    config.httpsAgent = _agent;
  }

  return new Promise(function (resolve, reject) {
    (0, _axios.default)(config).then(function (response) {
      if (response.status === 302) {
        console.log(status.headers.location);
      }

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
  for (var _i = 0, _Object$keys = Object.keys(payload); _i < _Object$keys.length; _i++) {
    var k = _Object$keys[_i];

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


function keepAlive(payload) {
  debugger;
  var config = {
    url: payload.keepAlive,
    method: 'GET'
  };
  return (0, _axios.default)(config).then(function (r) {
    return true;
  }).catch(function (e) {
    return false;
  });
}