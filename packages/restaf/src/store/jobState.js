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

import ijobState from './ijobState.js';
import apiCall from './apiCall.js';
/**
 * @category restaf/core
 * @description Check status of jobs
 * @module jobState
 * @async
 * 
 * @param {rafObject} job  rafObject of job
 * @param {object=} payload  usually query to state api
 * @param {timeout=} timeout  multiple uses to control timeout
 * @param {number=} delay delay in seconds.See notes below
 * @returns {promise} - object with the status information
 * @example
 *   Notes
 *   If the service supports long polling, pass the timeout in the payload.qs
 *   If the service does not support long polling, set timeout to 'wait' and set delay to some time in seconds.
 *   The library will check for completion every delay seconds. A more advanced way using progressHandler exit is described
 *   in the tutorial sections.
 */
async function jobState ( store, job, payload, timeout, delay, progressHandler, jobContext, cas ) {
    
    let waitFlag = false;
    let tries    = 1;
    let status;
    if ( timeout === 'wait'|| timeout === 'longpoll' ) {
        tries    = 1;
        waitFlag = true;
    } else {
        tries = ( !timeout ) ? 1 : timeout;
    }
    do {

        status = await ijobState( store, job, payload, delay, waitFlag, progressHandler, jobContext );
        let failed = status.detail.hasOwnProperty( 'failed' );
        
        if ( status.running === 0 ) {
            tries = 0;
            
            if ( failed === false && cas != true ) {
                status.jobState.job = await apiCall( store, job.links( 'self' ) );
            } else {
                status.jobState.job = job;
            }
        }

    } while ( --tries > 0 );
    return status.jobState;
}

export default jobState;