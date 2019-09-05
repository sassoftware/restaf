"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_XSRF_SETSTATE = exports.API_XSRF = exports.API_XSRF_ROOT = exports.API_STATUS_SETSTATE = exports.API_STATUS = exports.API_STATUS_ROOT = exports.APP_DATA_SETSTATE = exports.APP_DATA = exports.APP_DATA_ROOT = exports.API_POLL_COMPLETE = exports.API_POLL_BEGIN = exports.API_POLL = exports.DELETE_RAF_OBJECT = exports.API_CALL_PARALLEL = exports.API_COMPLETE = exports.API_BEGIN = exports.API_CALL = exports.ADD_SERVICE_COMPLETE = exports.ADD_SERVICE = exports.VIYA_LOGON_IMPLICIT = exports.VIYA_LOGON_PASSWORD = exports.VIYA_LOGON_PROXY = exports.VIYA_LOGON_SERVER = exports.VIYA_LOGOFF_COMPLETE = exports.BEGIN_LOGOFF = exports.VIYA_LOGOFF = exports.KEEP_ALIVE = exports.VIYA_LOGON_COMPLETE = exports.BEGIN_LOGON = exports.VIYA_LOGON = void 0;

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
exports.VIYA_LOGON = VIYA_LOGON;
var BEGIN_LOGON = 'BEGIN_LOGON';
exports.BEGIN_LOGON = BEGIN_LOGON;
var VIYA_LOGON_COMPLETE = 'VIYA_LOGON_COMPLETE';
exports.VIYA_LOGON_COMPLETE = VIYA_LOGON_COMPLETE;
var KEEP_ALIVE = 'KEEP_ALIVE';
exports.KEEP_ALIVE = KEEP_ALIVE;
var VIYA_LOGOFF = 'VIYA_LOGOFF';
exports.VIYA_LOGOFF = VIYA_LOGOFF;
var BEGIN_LOGOFF = 'BEGIN_LOGOFF';
exports.BEGIN_LOGOFF = BEGIN_LOGOFF;
var VIYA_LOGOFF_COMPLETE = 'VIYA_LOGOFF_COMPLETE';
exports.VIYA_LOGOFF_COMPLETE = VIYA_LOGOFF_COMPLETE;
var VIYA_LOGON_SERVER = 'server';
exports.VIYA_LOGON_SERVER = VIYA_LOGON_SERVER;
var VIYA_LOGON_PROXY = 'server';
exports.VIYA_LOGON_PROXY = VIYA_LOGON_PROXY;
var VIYA_LOGON_PASSWORD = 'password';
exports.VIYA_LOGON_PASSWORD = VIYA_LOGON_PASSWORD;
var VIYA_LOGON_IMPLICIT = 'implicit';
/* implies token */

exports.VIYA_LOGON_IMPLICIT = VIYA_LOGON_IMPLICIT;
var ADD_SERVICE = 'ADD_SERVICE';
exports.ADD_SERVICE = ADD_SERVICE;
var ADD_SERVICE_COMPLETE = 'ADD_SERVICE_COMPLETE';
exports.ADD_SERVICE_COMPLETE = ADD_SERVICE_COMPLETE;
var API_CALL = 'API_CALL';
exports.API_CALL = API_CALL;
var API_BEGIN = 'API_BEGIN';
exports.API_BEGIN = API_BEGIN;
var API_COMPLETE = 'API_COMPLETE';
exports.API_COMPLETE = API_COMPLETE;
var API_CALL_PARALLEL = 'API_PARALLEL';
exports.API_CALL_PARALLEL = API_CALL_PARALLEL;
var DELETE_RAF_OBJECT = 'DELETE_RAF_OBJECT';
exports.DELETE_RAF_OBJECT = DELETE_RAF_OBJECT;
var API_POLL = 'API_POLL';
exports.API_POLL = API_POLL;
var API_POLL_BEGIN = 'API_POLL_BEGIN';
exports.API_POLL_BEGIN = API_POLL_BEGIN;
var API_POLL_COMPLETE = 'API_POLL_COMPLETE';
exports.API_POLL_COMPLETE = API_POLL_COMPLETE;
var APP_DATA_ROOT = '_appdata';
exports.APP_DATA_ROOT = APP_DATA_ROOT;
var APP_DATA = 'APP_DATA';
exports.APP_DATA = APP_DATA;
var APP_DATA_SETSTATE = 'APP_DATA_SETSTATE';
exports.APP_DATA_SETSTATE = APP_DATA_SETSTATE;
var API_STATUS_ROOT = '_apistatus';
exports.API_STATUS_ROOT = API_STATUS_ROOT;
var API_STATUS = 'API_STATUS';
exports.API_STATUS = API_STATUS;
var API_STATUS_SETSTATE = 'API_STATUS_SETSTATE';
exports.API_STATUS_SETSTATE = API_STATUS_SETSTATE;
var API_XSRF_ROOT = '_xsrf';
exports.API_XSRF_ROOT = API_XSRF_ROOT;
var API_XSRF = 'API_XSRF';
exports.API_XSRF = API_XSRF;
var API_XSRF_SETSTATE = 'API_XSRF_SETSTATE';
exports.API_XSRF_SETSTATE = API_XSRF_SETSTATE;