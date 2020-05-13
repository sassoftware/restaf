/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function caslibList (store, args, vorpal){

	let servers = store.getAppData('servers').toJS();
	let casServer = servers.itemsList(0);
	let caslibs = await store.apiCall(servers.itemsCmd(casServer, 'caslibs'));
	vorpal.log(JSON.stringify(caslibs.itemsList(), null, 4));
	return 'done';
};
