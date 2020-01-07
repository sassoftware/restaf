/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = async function delClient (store, clientid) {
	let payload = {
		url    : `${process.env.VIYA_SERVER}/SASLogon/oauth/clients/${clientid}`,
		method : 'DELETE',
		headers: {
			accept       : '*/*',
			authorization: 'bearer ' + store.connection()['token']
		}
	};

	try {
		let r = await store.request(payload);
		return `${clientid} has been deleted`;
	} catch(err) {
		// why do we get a 404 on successful deletion?
		if (err.response.status === 404) {
			return `${clientid} has been deleted and/or not found. Use list command to verify`;
		} else {
			return err.response.status;
		}
	}
};
