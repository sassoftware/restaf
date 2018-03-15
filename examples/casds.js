/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
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
/*
 * running a simple data step in CAS
 */
'use strict';

let restaf      = require('../lib/restaf');
let payload  = require('./config')('restaf.env');
let casSetup = require('./casSetup');
let prtUtil  = require('../prtUtil');

let store = restaf.initStore();

async function example1 (store, logonPayload, sessionName) {
    let {apiCall} = store;
    let session = await casSetup(store, payload, sessionName);
    // Now run a simple data step in that session
    let p = {
        action: 'datastep.runCode',
        data  : { code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; '  }
    };
    let actionResult = await apiCall(session.links('execute'), p);
    let statusCode = actionResult.items('disposition', 'statusCode');
    if (statusCode !== 0) {
        throw actionResult.items('disposition');
    } else {
        prtUtil.view(actionResult, 'DataStep action');
    }

    // delete session
    actionResult = await apiCall(session.links('delete'));

    return 'Success';
}

// Run the example
example1(store, payload, 'example1')
    .then  (msg => console.log(msg))
    .catch (err => prtUtil.printErr(err));



