"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.link");

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
var fixImages = require('./fixImages');

var fixReports = require('./fixReports');

var casSessionLinks = require('./casSessionLinks');

var reduceCasResults = require('./reduceCasResults');

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

  if (iLink.href.indexOf("reportImages/jobs") > 0) {
    fixImages(response);
  }

  if (iLink.href === "/reports/reports" && iLink.method === "GET") {
    fixReports(response);
  }

  return response;
} // Plan:
// step 1: propogate server name and cashttp info


function fixCas(iLink, response) {
  // special handling for cas
  // do a refresh - mainly for reattaching to a cas session
  if (iLink.rel === 'self' && iLink.type === 'application/vnd.sas.cas.session.summary') {
    response.data.results.links = response.data.results.links.concat(fixCasSession(iLink, response.data.results));
    response.data.results.name2 = response.data.results.name.split(':')[0];
  } // create a new session
  else if (iLink.rel === 'createSession' && iLink.responseType === 'application/vnd.sas.cas.session') {
      response.data.results.links = response.data.results.links.concat(fixCasSession(iLink, response.data.results));
      response.data.results.name2 = response.data.results.name.split(':')[0];
    }

  if (iLink.hasOwnProperty('itemType') && iLink.itemType === 'application/vnd.sas.cas.session.summary') {
    var items = response.data.results.items;
    /* let harray = iLink.href.split('/');
    harray.shift();
    let server = harray [ 2 ];
    */
    // let pre   = `/casProxy/servers/${iLink.server}/cas/sessions`;

    var pre = "/".concat(iLink.casHttp, "/cas/sessions");

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var uri = "/casProxy/servers/".concat(iLink.server, "/cas/sessions/").concat(item.id);
      var urihttp = "".concat(pre, "/").concat(item.id);
      item.links = item.links.map(function (l) {
        l.casHttp = iLink.casHttp;
        l.server = iLink.server;
        return l;
      });
      item.links = item.links.concat(casSessionLinks(uri, urihttp, iLink.casHttp, iLink.server));
    }
  }

  if (iLink.hasOwnProperty('customHandling')) {
    response.data.results = reduceCasResults(response.data.results);
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
        /* flag to indicate we need to patch cas related stuff */
      }

      return l;
    });
  } // A seperate loop in case casManagement fixes the issue


  if (iLink.hasOwnProperty('patch') && iLink.rel === 'servers') {
    var _items = response.data.results.items;

    var _loop = function _loop(_i) {
      var item = _items[_i];
      var name = item.name;
      var ll = item.links.map(function (l) {
        l.casHttp = "".concat(name, "-http");
        /* save the http info to propogate to sessions */

        l.server = name;
        return l;
      });
      item.links = ll;
    };

    for (var _i = 0; _i < _items.length; _i++) {
      _loop(_i);
    }
  }
}

function fixCasSession(iLink, results) {
  // proprogate casHttp
  results.links = results.links.map(function (l) {
    l.casHttp = iLink.casHttp;
    l.server = iLink.server;
    return l;
  });
  return sessionLinks(iLink, results.id).concat(results.links);
}

function sessionLinks(iLink, sessionId) {
  /**/

  /* let harray = iLink.href.split('/');
   let server = harray[harray.findIndex((s=> s === 'servers'))+1];
   */
  var uri = "/casProxy/servers/".concat(iLink.server, "/cas/sessions/").concat(sessionId);
  var urihttp = "/".concat(iLink.casHttp, "/cas/sessions/").concat(sessionId); // propgate server name also

  return casSessionLinks(uri, urihttp, iLink.casHttp, iLink.server);
}

var _default = fixResponse;
exports.default = _default;