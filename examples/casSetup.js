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
module.exports = async function casSetup (store, payload, sessionName) {
        // get root end points of casManagement
        await store.logon(payload);
        let {casManagement} = await store.addServices('casManagement');

        // get list of current servers

        let servers = await store.apiCall(casManagement.links('servers'));

        // create a session named cas on the first server(in Viya 3.3 that is your only option).
        let casserver = servers.itemsList(0);
        //noinspection UnnecessaryLocalVariableJS
        let session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'),
                                          {data: {name: sessionName}});
        return session;
};



