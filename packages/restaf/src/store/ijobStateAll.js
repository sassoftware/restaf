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

import apiCallAll   from './apiCallAll.js';
function ijobStateAll ( store, jobs , ipayload ) {
    return new Promise( ( resolve, reject ) => {
        /* */
        let payload = [];
        if ( ipayload !== null ) {
            if ( Array.isArray( ipayload ) === false ) {
                for ( let i = 0 ; i < jobs.length ; i++ ) {
                    payload.push( ipayload );
                }
            } else {
                payload = [ ...ipayload ];
            }
        } else {
            for ( let i = 0; i < jobs.length; i++ ) {
                payload.push( null );
            }
        }

        let actionArray = jobs.map( ( job, i ) => {
            //noinspection JSValidateTypes
            let rafLink = job.links( 'state' );
            if ( rafLink === null ) {
                reject( ` job ${i} does not support state checking ` );
            }
            let statePayload = payload [ i ];

            return {
                rafLink: rafLink,
                payload: { ...statePayload }
            };

        } );


        apiCallAll( store, actionArray )
            .then( results => {

                let detail  = {};
                let running = 0;
                let jobState = results.map ( ( r, i ) => {
                    let data     = r.items();
                    let httpCode = r.status;
                    if ( detail.hasOwnProperty( data )  === false ) {
                        detail [ data ] = 0;
                    }
                    detail [data ] = detail[data] + 1;
                    if ( data === 'running' || data === 'pending' ) {
                        running++;
                    }
                    return { job: jobs[i], data: data, statusCode: httpCode } ;
                } );
                resolve( { running: running, detail: detail, jobState: jobState } );
            } )
            .catch( err => {
                reject( err );
            } );

    } );
}
export default ijobStateAll;