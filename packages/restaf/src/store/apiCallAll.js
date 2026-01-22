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

import { API_CALL_PARALLEL, API_CALL } from '../actionTypes.js';

import getResults    from './getResults.js';
import prepareAction from './prepareAction.js';
import extendFolder  from './extendFolder.js';

const  apiCallAll =  ( store, allActions, delay ) => {
    return new Promise( ( resolve, reject ) => {

        //
        // create actionArray
        //

        let actionArray = allActions.map( acti => {
            //noinspection JSUnresolvedVariable
            let iroute  = acti.rafLink;
            let payload = ( acti.hasOwnProperty( 'payload' ) === true ) ? acti.payload : null ;
            let action = prepareAction( store, iroute, API_CALL, payload, delay, null, null, null );
            if ( action === null ) {
                reject(
                    {
                        err : 'Invalid route and/or rafLink',
                        args: JSON.stringify( acti, null, 4 )
                    }
                );
            }
            return action;
        } );

        //
        // set start state
        //

        let start = true;

        //
        // subscribe callback
        //
        let nextE = () => {
            if ( start ) {
                start = false;
                return;
            }

            let folders = [];
            //
            // check for completion
            //
            for ( let i = 0; i < actionArray.length ; i++ ) {
                //noinspection JSUnresolvedVariable
                let f = getResults( store,  actionArray [ i ].route );
                if ( f !== null ) {
                    let runStatus =  f.get( 'runStatus' );
                    if ( runStatus === 'error' ) {
                        unSubscribe();
                        let err = {
                            jobNo : i,
                            detail: f.get( 'statusInfo' )
                        };
                        reject( err );
                    } else if ( runStatus === 'ready' ) {
                        folders.push( extendFolder( store, f ) );
                    }
                }
            }

            //
            // If all done the resolve promise
            //
            if ( folders.length === actionArray.length ) {
                resolve ( folders );
            }
        };

        //
        // subscribe to store
        //
        let unSubscribe = store.subscribe( nextE );

        //
        // dispatch array actions
        // interval is place holder - TBD
        //

        store.dispatch(
            {
                type: API_CALL_PARALLEL,
                actionArray
            }
        );



    } );

};


export default apiCallAll;