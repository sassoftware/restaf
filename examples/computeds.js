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

// running a  compute job

'use strict';

let restaf         = require('../lib/restaf');
let payload     = require('./config')('restaf.env');

let store = restaf.initStore();

async function example (store, logonPayload) {

    let apiCall = store.apiCall ;
    // logon;
    
    let msg = await store.logon(logonPayload);

    // get root end points, get list of contexts and create a sessuin ysubg the first context
    let {compute} = await store.addServices('compute');
    let contexts  = await apiCall(compute.links('contexts'));

    // lookup the name of the first context and then use it to get the associated createSession restafLink
    let createSession = contexts.itemsCmd(contexts.itemsList(0), 'createSession');
    let session       = await apiCall(createSession);

    // Now run a simple data step in that session
    let payload = {
            data: { code: [ `data _null_; do i = 1 to 100; x=1; end; run; ` ]  }
    };

    // Now execute the data step and wait for completion
    let job    = await apiCall(session.links('execute'), payload);
    let status = await store.jobState(job, null, 5, 2);

    if (status.data === 'running') {
        throw `ERROR: Job did not complete in allotted time`;
    } else {
        let f = await store.apiCall(status.job.links('log'));
        viewer(f);
        switch(status.data) {
            case 'warning': console.log(`Warning: check your log for warnings`); break;
            case 'error':
                throw `Please correct errors and rerun program`;
            default:
               break;
        }
    }

    return 'All Done';
}

function viewer (folder){
    let dataL = folder.items();
    dataL.map((data) => {
        let line = data.get('line').replace(/(\r\n|\n|\r)/gm, "");
        if (line.length === 0) {
            line = '  ';
        }
        console.log(line);
    });

}

// Run the example
example(store, payload)
    .then  (status  => console.log(status))
    .catch (err => console.log(err));



