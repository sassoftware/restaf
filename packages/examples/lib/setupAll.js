/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = async function setupAll () {
	let payload = require('./config')();
	let logger = require('./testLogger')();
	let casProxy = (process.env.CASPROXY === 'YES') ? true : false;
	let store = require('@sassoftware/restaf').initStore({casProxy: casProxy});
	await store.logon(payload);
	
	return { store: store, logger: logger }
}
