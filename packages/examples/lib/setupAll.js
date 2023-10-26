/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 let restaf = require('@sassoftware/restaf');
 let configtest = require('./configtest');
module.exports = async function setupAll () {
	
	let payload = configtest();
	let logger = require('./testLogger')();

	
	let casopt = {
		casProxy: (process.env.CASPROXY === 'NO') ? false : true,
		options: {
			ns         : (process.env.NAMESPACE != null && process.env.NAMESPACE.length > 0) ? process.env.NAMESPACE : null,
			proxyServer: (process.env.PROXYSERVER != null && process.env.PROXYSERVER.length > 0) ? process.env.PROXYSERVER : null,
		}
	};

	console.log('casopt', casopt);
	debugger;
	let store = restaf.initStore(casopt);

	try {
	 
	 let msg = await store.logon(payload);
	 console.log(msg);
	 return { store: store, logonPayload: payload, logger: logger }
	} catch(err) {
		console.log(err);
		throw {error: "failed to logon"};
	}
	
}
