/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
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

;


const VIYA_LOGON                = 'VIYA_LOGON';
const BEGIN_LOGON               = 'BEGIN_LOGON';
const VIYA_LOGON_COMPLETE       = 'VIYA_LOGON_COMPLETE' ;
const KEEP_ALIVE                = 'KEEP_ALIVE';

const VIYA_LOGOFF               = 'VIYA_LOGOFF';
const BEGIN_LOGOFF              = 'BEGIN_LOGOFF';
const VIYA_LOGOFF_COMPLETE      = 'VIYA_LOGOFF_COMPLETE';


const VIYA_LOGON_SERVER         = 'server' ;
const VIYA_LOGON_PROXY          = 'server';
const VIYA_LOGON_TOKEN          = 'token';
const VIYA_LOGON_PASSWORD       = 'password';
const VIYA_LOGON_IMPLICIT       = 'implicit' ;  /* implies token */


const ADD_SERVICE           = 'ADD_SERVICE';
const ADD_SERVICE_COMPLETE  = 'ADD_SERVICE_COMPLETE';

const API_CALL              = 'API_CALL';
const API_BEGIN             = 'API_BEGIN';
const API_COMPLETE          = 'API_COMPLETE';
const API_CALL_PARALLEL     = 'API_PARALLEL';
const DELETE_RAF_OBJECT     = 'DELETE_RAF_OBJECT';


const API_POLL             = 'API_POLL';
const API_POLL_BEGIN       = 'API_POLL_BEGIN';
const API_POLL_COMPLETE    = 'API_POLL_COMPLETE';

const APP_DATA_ROOT        = '_appdata';
const APP_DATA             = 'APP_DATA';
const APP_DATA_SETSTATE    = 'APP_DATA_SETSTATE';

const API_STATUS_ROOT      = '_apistatus';
const API_STATUS           = 'API_STATUS';
const API_STATUS_SETSTATE  = 'API_STATUS_SETSTATE';

const API_XSRF_ROOT        = '_xsrf';
const API_XSRF             = 'API_XSRF';
const API_XSRF_SETSTATE    = 'API_XSRF_SETSTATE';
const API_TKHTTP_ID        = 'API_TKHTTP_ID';

export  default {
    VIYA_LOGON,
    BEGIN_LOGON,
    VIYA_LOGON_COMPLETE,
    KEEP_ALIVE,
    
    VIYA_LOGOFF,
    BEGIN_LOGOFF,
    VIYA_LOGOFF_COMPLETE,
    VIYA_LOGON_SERVER,
    VIYA_LOGON_PROXY,
    VIYA_LOGON_TOKEN,
    VIYA_LOGON_PASSWORD,
    VIYA_LOGON_IMPLICIT,
    
    ADD_SERVICE,
    ADD_SERVICE_COMPLETE,
    
    API_CALL,
    API_BEGIN,
    API_COMPLETE,
    API_CALL_PARALLEL,
    
    DELETE_RAF_OBJECT,
    
    API_POLL,
    API_POLL_BEGIN,
    API_POLL_COMPLETE,
    
    APP_DATA_ROOT,
    APP_DATA,
    APP_DATA_SETSTATE,
    
    API_STATUS_ROOT,
    API_STATUS,
    API_STATUS_SETSTATE,
    
    API_XSRF_ROOT,
    API_XSRF,
    API_XSRF_SETSTATE,
    API_TKHTTP_ID   
}
