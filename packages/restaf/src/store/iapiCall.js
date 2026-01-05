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

import getResults    from './getResults.js';
import extendFolder  from './extendFolder.js';
import prepareAction from './prepareAction.js';
import {APP_DATA_ROOT, API_XSRF} from '../actionTypes.js';

// import ikeepAlive from './ikeepAlive.js';


const  iapiCall =  ( store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext ) => {
    return new Promise( ( resolve, reject ) => {
        
        let route;
        let unSubscribe;
        let start = true;
        
        // create action
        let action = prepareAction( store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext );
        if ( action === null ) {
            reject(
                {
                    error: 'Bad route and/or rafLink',
                    args : iroute
                } );
        }
        // save route
        //noinspection JSUnresolvedVariable
        route = action.route;


        // subscribe callback
        let nextE =() => {

            if ( start ) {
                start = false;
                return;
            }
            
            let f = getResults( store,  route );

            if ( !f ) { /* should never happen, hmmm! */
                unSubscribe();
                reject ( {
                             error: 'Hmmm! Failed to resolve route in apiCall callback - should never happen. Call Programmer',
                             route: route
                         } );
            } else {
                let runStatus =  f.get( 'runStatus' );
                if ( runStatus === 'error' ) {
                    unSubscribe();
                    reject( f.get( 'statusInfo' ) );
                } else if ( runStatus === 'ready' ) {
                    unSubscribe();
                    let efolder = extendFolder( store, f );
                    efolder.service = action.serviceName;
                    efolder.usedService = action.usedService;
                    //ikeepAlive(store); 
                    resolve( efolder );
                }
            }
        };


        // subscribe to store
        unSubscribe = store.subscribe( nextE );

        // dispatch action
        store.dispatch( action );

    } );

};


export default iapiCall;