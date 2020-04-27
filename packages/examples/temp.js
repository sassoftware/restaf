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
    let store = restaf.initStore({casProxy: true});
    let msg = await store.logon(logonPayload);

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

async function computeDS (store) {

	let computeSession = await restaflib.computeSetup(store,null, null);

	let macros = { maxRows: 5 };
	let src = `

        ods html style=barrettsblue; 

        data work.dtemp1;
            array x{10};  
            do j = 1 to &maxRows;  
                do i = 1 to 10;  
                x{i} = i * 10;  
                end;  
            output;  
            put _ALL_;  
            end;  
            run;  
            proc print;run;  
            ods html close;
            run;
            ;
            `;

	console.log('Compute Service');

    debugger;
	let computeSummary = await restaflib.computeRun(store, computeSession, src, macros);
    console.log('computesummary');
	let log = await restaflib.computeResults(store, computeSummary, 'log');
	console.info(log);
	let ods = await restaflib.computeResults(store, computeSummary, 'ods');
	console.log(ods);

	let tables = await restaflib.computeResults(store, computeSummary, 'tables');
	console.info(tables);

	let data = await restaflib.computeFetchData(store, computeSummary, 'DTEMP1');
	console.log(data.columns);
	console.log(`First row in set: ${data.rows[0]}`);

	await store.apiCall(computeSession.links('delete'));
	return data.rows;
}