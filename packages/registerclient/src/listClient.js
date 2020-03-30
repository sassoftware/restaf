/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = async function listClient (store, all, vorpal) {
	
	let payload = {
		url    : `${process.env.VIYA_SERVER}/SASLogon/oauth/clients`,
		method : 'GET',
		headers: {
			authorization: 'bearer ' + store.connection()['token']
		}
	};
	
	
	
	let r = await store.request(payload);
	// console.log(`${r.data.length} clientids detected`);
	// console.log(JSON.stringify(r.data, null,4));
	
	vorpal.log('>>>>>>>>>>>>>>User defined clientids');
	r.data.resources.map(rr => {
		if (rr.client_id.indexOf('sas.') === -1) {
			vorpal.log(
`clientid  : ${rr.client_id}  
	grantTypes: ${rr.authorized_grant_types}
	redirect  : ${rr.redirect_uri}`
			);
			}
	});
	
	
	if (all != null) {
		vorpal.log('>>>>>>>>>>>>>>Viya System clientids');
		r.data.resources.map(rr => {
		if (rr.client_id.indexOf('sas.') !== -1) {
			vorpal.log(
`clientid  : ${rr.client_id}  
	grantTypes: ${rr.authorized_grant_types}
	redirect  : ${rr.redirect_uri}`
			);
		}
			});
		}
	
	return `${r.data.length} clientids detected`;
	};
