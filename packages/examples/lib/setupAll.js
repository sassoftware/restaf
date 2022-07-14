/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 let restaf = require('@sassoftware/restaf');
 let configtest = require('./configtest');
module.exports = async function setupAll () {
	
	let payload = configtest();
	let logger = require('./testLogger')();

	
	// let casopt = (process.env.CASPROXY === 'NO') ? false : true;

	debugger;
	let store = restaf.initStore();

	try {
	 debugger;
	 let msg = await store.logon(payload);
	 console.log(msg);
	 return { store: store, logonPayload: payload, logger: logger }
	} catch(err) {
		console.log(err);
		throw {error: "failed to logon"};
	}
	
}
