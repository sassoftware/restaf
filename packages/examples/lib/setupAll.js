/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 let restaf = require('@sassoftware/restaf');
 let configtest = require('./configtest');
module.exports = async function setupAll () {
	
	let payload = configtest();
	let logger = require('./testLogger')();
	debugger;
	let store = restaf.initStore();
	try {
	 
	 let msg = await store.logon(payload);
	 console.log(msg);
	 return { store: store, logger: logger }
	} catch(err) {
		console.log(err);
		throw {error: "failed to logon"};
	}
	
}
