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
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responseReducer = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _utils = require("../utils");

var _rootStruct = require("../utils/rootStruct");

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
  } // results with a list of items


  if (results.hasOwnProperty('items')) {
    response = itemsReducer(results, parentPath);
    response.resultType = results.accept == undefined ? contentType : results.accept; // result has links and data
  } else if (results.hasOwnProperty('links')) {
    /* got just links */
    response = tLinkReducer(results.links, parentPath);
    var data = (0, _objectSpread2.default)({}, results);
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
    response = (0, _rootStruct.tLinkStruct)('data', 'data');
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
  response.statusInfo = (0, _utils.setGoodStatus)(action.payload);
  var c = action.config;
  var hc = action.payload.config;
  var temp = hc.url.split('/');
  response.host = "".concat(temp[0], "//").concat(temp[2]);
  response.iconfig = {
    input: {
      link: (0, _objectSpread2.default)({}, c.link),
      payload: c.hasOwnProperty('payload') ? Object.assign({}, c.payload) : {}
    },
    http: {
      url: hc.url,
      payload: {
        headers: [].concat(hc.headers),
        data: hc.data == null ? {} : (0, _typeof2.default)(hc.data) === 'object' ? Object.assign({}, hc.data) : hc.data,
        qs: hc.params == null ? {} : (0, _typeof2.default)(hc.params) === 'object' ? Object.assign({}, hc.params) : hc.params
      }
    }
  };
  return response;
};

exports.responseReducer = responseReducer;

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

  var tSearchPath = (0, _toConsumableArray2.default)(parentPath).concat([subType]);
  var linksMap = {};
  tlinks.map(function (l) {
    var ts = (0, _toConsumableArray2.default)(tSearchPath).concat([l.rel]);

    if (l.hasOwnProperty('title') === false) {
      l.title = l.rel;
    }

    var lx = {
      link: (0, _objectSpread2.default)({}, l),
      method: l.method,
      route: ts.join(':/'),
      parentRoute: (0, _toConsumableArray2.default)(parentPath).join(':/'),
      paginator: subCmds.includes(l.rel)
    };
    linksMap[l.rel] = (0, _objectSpread2.default)({}, (0, _rootStruct.tLinkStruct)(l.title, subType), lx);
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
        var tRoute = (0, _toConsumableArray2.default)(parentPath).concat(['items', 'data', name]);
        var rowcmds = setupRelPaths(item.links, tRoute, 'cmds');
        var data = (0, _objectSpread2.default)({}, item);
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
    itemsResponse.data = (0, _toConsumableArray2.default)(results.items);
    itemsResponse.resultType = results.accept;
    itemsResponse.type = 'itemsArray';
    response.type = 'itemsArray';
  }

  response.items = itemsResponse;
  return response;
}

function setDetails(results) {
  var r = (0, _objectSpread2.default)({}, results);

  if (r.hasOwnProperty('links')) {
    delete r.links;
  }

  if (r.hasOwnProperty('items')) {
    delete r.items;
  }

  return r;
}