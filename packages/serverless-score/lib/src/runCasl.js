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

'use strict';
let casSetup    = require('./casSetup');
let jsonToDict = require('./jsonToDict');
let getProgram = require('./getProgram');

 module.exports = async function runCasl (store, casl, inParms) {

    let {session} = await casSetup(store, [ 'sccasl' ]);
    //
    // prepare parameters
    //
    
    let _appEnv_ = jsonToDict(inParms, '_appEnv_');

    //
    // load casl program ( ideally this should be on the server, but...)
    //
    
    let caslStatements = await getProgram(casl);
    caslStatements = _appEnv_ + ' ' + caslStatements;

    let payload = {
        action: 'sccasl.runcasl',
        data  : { code: caslStatements}
    }

    let result   = await store.runAction(session, payload);
    await store.apiCall(session.links('delete'));
    return result;
}