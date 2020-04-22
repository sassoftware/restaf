/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = async function setupAll () {
	let casProxy = (process.env.CASPROXY === 'ON') ? true : false;
	if (casProxy === true) {
		console.log('-----------------------------------------------------');
		console.log('casProxy is turned on');
		console.log('-----------------------------------------------------');
	}
	let store = require('@sassoftware/restaf').initStore({casProxy: casProxy});
	let logger = require('./testLogger')();
	let payload = require('./config')(logger);
	await store.logon(payload);
	
	return { store: store, logger: logger }
}
