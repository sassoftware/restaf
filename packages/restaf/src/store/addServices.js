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

import iaddServices from './iaddServices.js';

import { API_XSRF } from '../actionTypes.js';
import appData from './appData.js';
import getServiceRoot from './getServiceRoot.js';
import getXsrfData from './getXsrfData.js';
/**
 * @description Add(initialize) services to the store
 * @async
 * @module addServices
 * @category restaf/core
 * @param  {...any} serviceNames - list of services
 * @returns {promise}
 * @example
 *  const {compute, casManagement} = await store.addServices('compute', 'casManagewment);
 * 
 */
async function addServices ( store, ...services ) {
   
    if ( services.includes( 'casManagement' ) ) {
        // services.push('casManagement/cas');
        services.push( 'casProxy' );
       // services.push('cas-shared-default-http/healthCheck');
    }
  
    // loop for initialized services
    let subList = [];
    let ifolder = {};
    services.map( s => {
        ifolder[ s ] = getServiceRoot( store, s );
        if ( ifolder[ s ] === null ) {
            subList.push( s );
        }
    } );

    // initialize new services
    if ( subList.length > 0 ) {
        
        for ( let service of subList ) {
            let { folders, xsrfTokens } = await iaddServices( store, [service] );
            let xsrf = xsrfTokens[ service ];
            appData( store, API_XSRF, service, xsrf, service );
            if (xsrf['tkhttp-id'] != null) {
                appData( store, API_XSRF, 'tkhttpid', xsrf, service );
            }
           ifolder[ service ] = folders[ service ];
        }
    }
    return ifolder;

}

export default addServices;