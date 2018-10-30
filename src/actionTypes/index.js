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
/*
 * Copyright (c) 2017 by SAS Institute Inc., Cary, NC USA 27513
 * Author          : K. Deva Kumar
 * Last Modified: 5/23/17 8:49 PM
 *
 */

export const VIYA_LOGON                = 'VIYA_LOGON';
export const BEGIN_LOGON               = 'BEGIN_LOGON';
export const VIYA_LOGOFF               = 'VIYA_LOGOFF';
export const VIYA_LOGON_COMPLETE       = 'VIYA_LOGON_COMPLETE' ;
export const VIYA_LOGON_SERVER         = 'server' ;
export const VIYA_LOGON_PROXY          = 'server' ;
export const VIYA_LOGON_PASSWORD       = 'password';
export const VIYA_LOGON_IMPLICIT       = 'implicit' ;  /* implies token */


export const ADD_SERVICE           = 'ADD_SERVICE';
export const ADD_SERVICE_COMPLETE  = 'ADD_SERVICE_COMPLETE';

export const API_CALL              = 'API_CALL';
export const API_BEGIN             = 'API_BEGIN';
export const API_COMPLETE          = 'API_COMPLETE';
export const API_CALL_PARALLEL     = 'API_PARALLEL';
export const DELETE_RAF_OBJECT     = 'DELETE_RAF_OBJECT';


export const API_POLL             = 'API_POLL';
export const API_POLL_BEGIN       = 'API_POLL_BEGIN';
export const API_POLL_COMPLETE    = 'API_POLL_COMPLETE';

export const APP_DATA_ROOT        = '_appdata';
export const APP_DATA             = 'APP_DATA';
export const APP_DATA_SETSTATE    = 'APP_DATA_SETSTATE';

export const API_STATUS_ROOT      = '_apistatus';
export const API_STATUS           = 'API_STATUS';
export const API_STATUS_SETSTATE  = 'API_STATUS_SETSTATE';

export const API_XSRF_ROOT        = '_xsrf';
export const API_XSRF             = 'API_XSRF';
export const API_XSRF_SETSTATE    = 'API_XSRF_SETSTATE';

