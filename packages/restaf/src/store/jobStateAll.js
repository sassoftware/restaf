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

import ijobStateAll from './ijobStateAll';
import apiCallAll  from './apiCallAll';

function jobStateAll ( store, jobList, payload, maxTries ) {

    return new Promise( ( resolve, reject ) => {
        let tries = ( maxTries != null ) ? maxTries : 1;
        checkStatus ( store, jobList, payload,  tries, ( err, result ) => {
            if ( err ) {
                reject ( err );
            } else if ( result.running  === 0 ) {

                let rafLinkSelf = result.jobState.map ( j => {
                    return {
                        rafLink: j.job.links( 'self' ),
                        payload: null
                    };
                } );

                apiCallAll( store, rafLinkSelf, null )
                    .then( newJobs => {
                        newJobs.forEach( ( job, i ) => {
                            result.jobState[ i ].job = job;
                        } );
                        resolve( result );
                    } )
                    .catch( err => {
                        reject( err );
                    } );
            } else {
                resolve( result );
            }
        } );
    } );
}

function checkStatus ( store, jobList, payload, tries, cb ) {
    
    ijobStateAll( store, jobList, payload )
        .then( result => {
            
            if ( result.running > 0 ) {
                tries--;
                if ( tries <= 0 ) {
                    cb( null, result );
                } else {
                    checkStatus( store, jobList, payload, tries, cb );
                }
            } else {
                cb( null, result );
            }
        } )
        .catch( err => {
            cb( err );
        } );
}

export default jobStateAll;