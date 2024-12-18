/*------------------------------------------------------------------------------------
 Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/

 'use strict';

 import { request } from  '../serverCalls' ;
 
 function httpCallWait ( config ) {
     let states = [ 'running', 'pending' ];
     let flag;
    
     return ( request( config )
         .then( response => {
            const eventHandler = () => {
                flag = false;
                if ( config.eventHandler ) {
                    let cstate = ( response.status === 304 ) ? 'running' : r;
                    let r1 = config.eventHandler( cstate, config.jobContext );
                    /* this code to maintain backward compatability */
                    if ( typeof r1 === 'boolean' ) {
                        flag = r1;
                    } else if ( r1 !== cstate ) {
                        response.data.results = r1;
                        flag = true;
                    }
                }
            }
    
            let r = response.data.results;
    
            if ( typeof r === 'object' ) {
                r = response.data.results.items.isIdle === true ? 'completed' : 'running';
                response.data.results.items = r;
            } 
          
            eventHandler();
            if ( response.status === 304 && flag === false ) {
                return null;
            }

            if ( ( states.indexOf( r ) === -1 )  || flag === true ) {
                return httpDone( response, config, false );
             } else {
               if ( config.payload.headers != null && config.payload.headers['If-None-Match'] != null && response.headers.etag != null ){
                  config.payload.headers['If-None-Match'] = response.headers.etag;
               }
               return null;
             }
         } )
         .catch( error => {
             if ( config.eventHandler ) {
                 flag = config.eventHandler( '*SystemError', config.jobContext );
            }
            return httpDone( error, config, true );
         } )
     );
 }
 
 function httpDone ( payload, config, error ) {
     
     return {
         error : error,
         type  : config.serviceName + '_' + config.type + '_COMPLETE',
         config: config,
         payload
     };
 }
 
 export default httpCallWait;