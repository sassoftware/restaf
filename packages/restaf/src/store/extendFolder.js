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

import getResults2 from  './getResults2' ;
function extendFolder ( store, f ) {

    let wrapper = ( prePath ) => ( ...args ) => {
        return getResults2( store, f, prePath, args );
    };

    let wrapperItemsCmd = ( prePath ) => ( ...args ) => {
        args.splice( 1, 0, 'cmds' );
        return getResults2( store, f, prePath, args );
    };

    return {
        results   : wrapper(),
        items     : wrapper( [ 'items', 'data' ] ),
        itemsCmd  : wrapperItemsCmd( [ 'items', 'data' ] ),
        itemsList : wrapper( [ 'itemsList' ] ),
        links     : wrapper( [ 'links' ] ),
        details   : wrapper( [ 'details' ] ),
        scrollCmds: wrapper( [ 'scrollCmds' ] ),
        raw       : wrapper( [ 'raw' ] ),
        headers   : wrapper( [ 'responseHeaders' ] ),
        config    : wrapper( [ 'iconfig' ] ),
        host      : f.get( 'host' ),
        resultType: f.get( 'resultType' ),
        status    : f.get( 'statusInfo' ).get( 'status' ),
        statusInfo: f.get( 'statusInfo' ).toJS(),
        type      : f.get( 'type' ),
        route     : f.get( 'route' )
    };

}
export default extendFolder;