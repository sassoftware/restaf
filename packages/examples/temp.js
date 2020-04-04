/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


let restaf = require('@sassoftware/restaf');
let restaflib = require('@sassoftware/restaflib');

runtest()
    .then(r => console.log(r))
    .catch(e => console.log(e));

async function runtest () {
    
    let payload = require('./lib/config2.js')();

	let store = restaf.initStore();
    let msg = await store.logon(payload);
    
    let { masDescribe, masRun } = restaflib;
    let models = ['iris_NN'];
    let masControl = await restaflib.masSetup(store, models);
    let desc = masDescribe(masControl, 'iris_NN', null);
    let scenario = desc.map((m) => {
        m.value = 1.5;
        return m;
    });
    console.log(scenario);
    let result = await masRun(store, masControl, models[0], scenario);
    return result;
}
  