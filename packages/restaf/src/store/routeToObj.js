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

  'use strict';

import extendFolder from  './extendFolder' ;

function routeToObj ( store, route ) {
    let path    = route.split( ':/' );
    let service = path.shift();
    let folder  = store.getState()[ service ];
    folder = ( path.length > 0 ) ? folder.getIn( path ) : folder;
    return extendFolder( store, folder );
}

export default routeToObj;