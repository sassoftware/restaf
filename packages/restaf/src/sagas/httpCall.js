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

function httpCall (config) {
    if (config.logonInfo === null) {
        return httpDone({ error: 'Please logon' }, config, true);
    } else {
        return (request(config)
            .then(response => httpDone(response, config, false))
            .catch(error => httpDone(error, config, true))
        );
    }
}
function httpDone (payload, config, error) {
    return {
        error : error,
        type  : config.serviceName + '_' + config.type + '_COMPLETE',
        config: config,
        payload
    };
}

export default httpCall;