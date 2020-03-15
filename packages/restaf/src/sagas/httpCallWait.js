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
            if (config.eventHandler) {
                flag = config.eventHandler(r, config.jobContext);
            }
            return (((states.indexOf(r) === -1) || flag === true)
                      ? httpDone(response, config, false) : null);
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