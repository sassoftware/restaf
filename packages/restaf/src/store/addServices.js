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

import iaddServices from './iaddServices';

import { API_XSRF } from '../actionTypes';
import appData from './appData';
import getServiceRoot from './getServiceRoot';
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
   debugger;
    if ( services.includes( 'casManagement' ) ) {
        services.push( 'casProxy' );
       // services.push('cas-shared-default-http/healthCheck');
       services.push('cas-shared-default-http');
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
        debugger;
        let { folders, xsrfTokens } = await iaddServices( store, subList );
        for ( let service in xsrfTokens ) {
            debugger;
            appData( store, API_XSRF, service, xsrfTokens[ service ] );
        }
        // merge new ones into preloaded list
        for ( let s in folders ) {
            ifolder[ s ] = folders[ s ];
        }

    }
    debugger;
    return ifolder;

}

export default addServices;