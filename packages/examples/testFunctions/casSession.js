/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

let restaflib = require('@sassoftware/restaflib');
module.exports = async function casSession (testInfo) {
	let {store, logger} = testInfo;
	console.log('config', store.config);
	debugger;
	let { session } = await restaflib.casSetup(store, null, null, 'cas-shared-default');
	debugger;
	console.log(session.links('execute').toJS());
	logger.info(session.items().toJS());
	await store.apiCall(session.links('delete'));
	return 'done';
};
