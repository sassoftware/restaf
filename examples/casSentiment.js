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
 * Sentiment Analysis using casActions
 */
'use strict';

let restaf         = require('../lib/restaf');
let payload     = require('./config')('restaf.env');
let casSetup    = require('./lib/casSetup');
let runAction   = require('./lib/runAction');
let prtUtil        = require('../prtUtil');

let store   = restaf.initStore();

async function example (store, payload, sessionName){

    //setup CAS session
    let {session} = await casSetup(store, payload, sessionName);

     let actionPayload = {
        action: 'builtins.loadActionSet',
        data  : { actionSet: 'sentimentAnalysis' }
    };
    let actionResult = await runAction(store, session, actionPayload, 'Load sentiment Analysis');
    console.log( '--------------------------------------------------------');

    //run data step action
    actionPayload = {
        action: 'sentimentAnalysis.applySent',
        data  : {
            document: "This is very bad"
        }
    };
    debugger;
    actionResult = await runAction(store, session, actionPayload, 'sentiment Analysis');
    prtUtil.view(actionResult, 'Result from sentiment analysis');

    actionResult = await store.apiCall(session.links('delete'));

    console.log(`session closed with Status Code ${actionResult.status}`);
    return true;
}

example(store, payload, 'cas')
    .then(r => prtUtil.print({Status: 'All Done'}))
    .catch(err => prtUtil.printErr(err));




