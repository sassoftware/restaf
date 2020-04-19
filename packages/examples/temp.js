/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let restaf = require('@sassoftware/restaf');
let restaflib = require('@sassoftware/restaflib');
let logonPayload = require('./lib/config2.js')();

runtest()
	.then((r) => console.log(r))
	.catch((e) => console.log(JSON.stringify(e,null,4)));

async function runtest () {
    let store = restaf.initStore();
    debugger;
    let { session } = await restaflib.casSetup(store, logonPayload);
    let p = {
        action: 'builtins.echo',
        data  : {
            code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; ',
        },
    };
    let r = await store.runAction(session, p);
    console.log(JSON.stringify(r.items(), null, 4));
    debugger;
    await store.apiCall(session.links('delete'));
    return 'done';
}
