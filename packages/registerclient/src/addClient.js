/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = async function addClient (store, clientid, args, defaultConfigFile) {
	let flow = args.type;

	let clientSecret = args.secret;
	let redirect = args.redirect;
	let configFile = (args.configFile == null) ? defaultConfigFile : args.configFile;
    if (clientid === 'code') {
		clientid = 'authorization_code';
	}
	let data = {
		client_id   : clientid,
		scope       : [ 'openid', '*' ],
		resource_ids: 'none',
		autoapprove : true,

		authorized_grant_types: flow,
		access_token_validity : 86400,
		'use-session'         : true
	};

	if (configFile != null) {
		data = {...configFile};
		data.client_id = clientid;
		data.authorized_grant_types = flow;
	
	}

	if (clientSecret != -null) {
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
