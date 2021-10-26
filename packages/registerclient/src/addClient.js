/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = async function addClient (store, clientid, args, defaultConfigFile, ttl) {
	let flow = args.type.trim();
    
	let clientSecret = (args.secret != null) ? args.secret.trim() : null;
	let redirect = (args.redirect != null) ? args.redirect.trim() : null;
	let configFile = (args.configFile == null) ? defaultConfigFile : args.configFile;
    if (clientid === 'code') {
		clientid = 'authorization_code';
	}

	let flowA = flow.split(',');
	

	let data = {
		client_id   : clientid,
		scope       : ['openid', '*'],
		resource_ids: ['none'],
		autoapprove : true,

		authorized_grant_types: flowA,
		access_token_validity : (ttl == null) ? 86400 : ttl*24*60*60,
		'use-session'         : true
	};

	
	if (configFile != null) {
		data = {...configFile};
		data.client_id = clientid;
		data.authorized_grant_types = flowA;
	
	}

	if (clientSecret !== -null) {
		data.client_secret = clientSecret;
	}

	if (redirect != null) {
		let redirectA = redirect.split(',');
		data.redirect_uri = redirectA;
	}
	
	let payload = {
		url   : `${process.env.VIYA_SERVER}/SASLogon/oauth/clients`,
		method: 'POST',
		data  : data,

		headers: {
			'Content-Type': 'application/json',
			accept        : 'application/json',
			authorization : 'bearer ' + store.connection()['token']
		}
	};

	try {
		let r = await store.request(payload);
		return `${clientid} has been added`;
	} catch (err) {
		return err.response.data;
	}
};
