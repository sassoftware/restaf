/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


let restaf = require('@sassoftware/restaf');
let payload = require('./lib/config2.js')();

let store = restaf.initStore();
runtest()
    .then(r => console.log(r))
    .catch(e => console.log(e));

async function runtest () {
    debugger;
    let msg = await store.logon(payload);
    debugger;
    let r = await store.addServices('files', 'casManagement');
    debugger;
    return 'done';
}