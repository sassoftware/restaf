/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 let restaf = require('@sassoftware/restaf');
module.exports = async function setupAll () {
	debugger;
	let payload = require('./config')();
	let logger = require('./testLogger')();
	console.log(payload);
	let store = restaf.initStore();
	console.log(payload);
	await store.logon(payload);
	
	return { store: store, logger: logger }
}
