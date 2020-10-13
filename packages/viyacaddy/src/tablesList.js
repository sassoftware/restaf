/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function tablesList (store, args, vorpal){
	let incaslib = args.caslib.toLowerCase();
	let servers = store.getAppData('servers').toJS();
	let casServer = servers.itemsList(0);
	let caslibs = await store.apiCall(servers.itemsCmd(casServer, 'caslibs'));

	let s = caslibs.itemsList().find((v, i) => {
		let vl = v.toLowerCase();
		if (incaslib === 'casuser') {
			return (vl.indexOf('casuser') !== -1);
		} else {
			return (vl === incaslib);
		}
	});

	if (s == null){
		throw `caslib ${args.caslib} not defined`;
	}

	let tb = caslibs.itemsCmd(s, 'tables');

	let tables = await store.apiCall(tb);
	vorpal.log(JSON.stringify(tables.itemsList(), null, 4));
	return 'done';
};
