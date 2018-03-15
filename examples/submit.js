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

let restaf    = require('../lib/restaf');
let payload   = require('./config')('restaf.env');
let prtUtil   = require('../prtUtil');

let store = restaf.initStore();

function progress (data, myContext) {
    prtUtil.print({Progress: `${myContext} ${data}`});
    return false;
}
function onCompletion (err, status, myContext) {
    if (err) {
        prtUtil.printErr(err);
    } else {
        prtUtil.print({onCompletion: `${myContext} ${status.data}`});

        let jobList = store.submitStatus();
        prtUtil.printObj(jobList, 'List of completed jobs');
        let r = store.submitStatus(myContext);
        store.apiCall(r.job.links('log'))
             .then(f => viewer(f))
             .catch(err => console.log(err));
    }
}
function viewer (folder){
    let dataL = folder.items();
    prtUtil.printTitle('Log');
    dataL.map((data) => {
        let line = data.get('line').replace(/(\r\n|\n|\r)/gm, "");
        if (line.length === 0) {
            line = '  ';
        }
        console.log(line);
        return line;
    });

}
async function example (store, logonPayload) {

    let apiCall = store.apiCall;
    // logon;
    //noinspection JSUnusedLocalSymbols
    let msg = await store.logon(logonPayload);

    // get root end points, get list of contexts and create a sessuin ysubg the first context
    let {compute} = await store.addServices('compute');
    let contexts  = await apiCall(compute.links('contexts'));

    // lookup the name of the first context and then use it to get the associated createSession restafLink
    let createSession = contexts.itemsCmd(contexts.itemsList(0), 'createSession');
    let session = await apiCall(createSession);

    // Now run a simple data step in that session
    let payload = {
        data: {code: [ `data _null_; do i = 1 to 100000000; end;run; ` ]}
    };
    store.submit (session.links('execute'), payload, 1, 'myJob', onCompletion.bind(this), progress.bind(this));
    return 'returning to main';
}


// Run the example
example(store, payload)
    .then  (r   => console.log(r))
    .catch (err => prtUtil.printErr (err));



