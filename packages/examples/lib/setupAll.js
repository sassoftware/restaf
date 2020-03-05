/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = async function setupAll() {
	let store = require('@sassoftware/restaf').initStore();
	let logger = require('./testLogger')();
	let payload = require('./config')(logger);
	await store.logon(payload);
	
	return { store: store, logger: logger }
}
