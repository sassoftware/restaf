/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

let restaflib = require('@sassoftware/restaflib');
module.exports = async function casSessionAttach (testInfo) {
	let {store, logger} = testInfo;
	let { session } = await restaflib.casSetup(store, null);
	let sessionID = session.items('id');
	console.log(sessionID);

	let r = await restaflib.casSetup(store, null, sessionID);
	console.log(r);
	let sessionID2 = r.session.items('id');
	console.log(sessionID2);
	console.log(r.session.links().toJS());

	return 'done';
};
