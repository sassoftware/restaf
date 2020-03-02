/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
let restaf = require('@sassoftware/restaf');
let restaflib = require('@sassoftware/restaflib');
module.exports = async function casSession() {
	let payload = require('./config')();
	let store = await restaf.initStore();
	let { session } = await restaflib.casSetup(store, payload);
	return 'done';
};
