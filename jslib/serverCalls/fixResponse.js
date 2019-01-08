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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    response.data.results.links = response.data.results.links.concat(fixCasSession(iLink, response.data.results));
    response.data.results.name2 = response.data.results.name.split(':')[0]; // response.data.results       = { items: [ Object.assign( {}, response.data.results ) ] };
  }

  if (iLink.hasOwnProperty('itemType') && iLink.itemType === 'application/vnd.sas.cas.session.summary') {
    var items = response.data.results.items;
    var harray = iLink.href.split('/');
    harray.shift();
    var server = harray[2]; // let pre   = `/casProxy/servers/${server}/cas/sessions`;

    var pre = "/".concat(iLink.casHttp, "/cas/sessions");

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      /* get rid of casManagement in front */

      var uri = "".concat(pre, "/").concat(item.id);
      item.links = item.links.concat(casSessionLinks(uri));
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

function fixCasSession(iLink, results) {
  return sessionLinks(iLink, results.id).concat(results.links);
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
  /**/
  var harray = iLink.href.split('/');
  var server = harray[harray.length - 2];
  var uri = "/casProxy/servers/".concat(server, "/cas/sessions/").concat(sessionId);
  var urihttp = "/".concat(iLink.casHttp, "/cas/sessions/").concat(sessionId);
  return casSessionLinks(uri, urihttp);
}

function casSessionLinks(uri, urihttp) {
  return [{
    method: 'POST',
    href: "".concat(uri, "/actions"),

    /* payload: data:...., qs: {action: ...} */
    rel: 'casproxy',
    uri: "".concat(uri, "/actions"),
    responseType: 'application/json',
    type: 'application/json',
    itemType: 'application/json',
    title: 'Run CAS Action',
    customHandling: 'casExecute',
    extended: true
  }, {
    method: 'POST',
    href: "".concat(urihttp, "/actions"),

    /* payload: data:...., qs: {action: ...} */
    rel: 'execute',
    uri: "".concat(urihttp, "/actions"),
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

var _default = fixResponse;
exports.default = _default;