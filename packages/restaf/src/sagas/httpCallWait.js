/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
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
 
 function httpCallWait (config) {
     let states = ['running', 'pending'];
     let flag;
     return (request(config)
         .then(response => {
            let r = response.data.results;
        
            if ( response.status === 304) {
                return null; 
            }

            if (typeof r === 'object') {
                r = response.data.results.items.isIdle === true ? 'completed' : 'running';
                response.data.results.items = r;
            } 
          
            if (config.eventHandler) {
                let r1 = config.eventHandler(r, config.jobContext);
                /* this code to maintain backward compatability */
                if (typeof r1 === 'boolean') {
                    flag = r1;
                } else if (r1 !== r) {
                    response.data.results = r1;
                    flag = true;
                }
            }

            if (((states.indexOf(r) === -1)  || flag === true)) {
                return httpDone(response, config, false);
             } else {
               if (config.payload.headers != null && config.payload.headers.etag != null){
                  config.payload.headers['If-None-Match'] = response.headers.etag;
               }
               return null;
             }
         })
         .catch(error => {
             if (config.eventHandler) {
                 flag = config.eventHandler('*SystemError', config.jobContext);
            }
            return httpDone(error, config, true);
         })
     );
 }
 
 function httpDone (payload, config, error) {
     
     return {
         error : error,
         type  : config.serviceName + '_' + config.type + '_COMPLETE',
         config: config,
         payload
     };
 }
 
 export default httpCallWait;