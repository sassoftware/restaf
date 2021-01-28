/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 let restaf = require('@sassoftware/restaf');
 let configtest = require('./configtest');
module.exports = async function setupAll () {
	debugger;
	let payload = configtest();
	let logger = require('./testLogger')();
	let store = restaf.initStore();
	await store.logon(payload);
	
	return { store: store, logger: logger }
}
