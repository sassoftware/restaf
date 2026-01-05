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

import iGetResults from './iGetResults.js';

function getResults2 ( store, iroute, prePath, ...args ) {
    
    let iquery = null;

    if ( args != null  && args.length > 0 ) {
        iquery = ( Array.isArray( args [ 0 ] )  === true ) ? args[ 0 ] : args ;
        if ( prePath !== null ) {
            iquery = prePath.concat( iquery );
        }
    } else {
        iquery = prePath;
    }


    return iGetResults( store, iroute, false, iquery );

}
export default getResults2;
