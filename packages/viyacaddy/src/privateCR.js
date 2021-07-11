/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let fs = require('fs').promises;

module.exports = async function privateCR(store, args, vorpal) {
	let file = args.options.file;
	let infoj = await fs.readFile(file, 'utf8');
	let info = JSON.parse(infoj);

	let { viya, cr, cluster } = info;
	vorpal.log('--------- creating domain');
	let r = await createDomain(store, viya);
	vorpal.log(JSON.stringify(r, null, 4));

	vorpal.log('---------- creating credentials');
	r = await createCredentials(store, viya, cr);
	vorpal.log(JSON.stringify(r, null, 4));

	vorpal.log('----------- creating destination');
	r  = await createPublishDestination(store, viya, cr, cluster);
	vorpal.log(JSON.stringify(r, null, 4));
	return 'done';
};

async function createDomain (store, viya) {
	let { token, host } = store.connection();
	let config = {
		url: host + '/credentials/domains/' + viya.domain,
		method: 'PUT',
		data: {
			id: viya.domain,
			type: 'base64',
			description: viya.desc,
		},
		headers: {
			'content-type': 'application/json',
			'authorization': 'bearer ' + token,
		},
	};

	let r = await store.request(config);
	return r.data;
}
async function createCredentials (store, viya, cr) {
	let { host, token } = store.connection();
	config = {
		url: host + '/credentials/domains/' + viya.domain + '/users/' + viya.admin,
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			'authorization': 'bearer ' + token,
		},
		data: {
			domainId: viya.domain,
			identityType: 'user',
			identityId: viya.admin,
			domainType: 'base64',
			properties: { dockerRegistryUserId: cr.user },
			secrets: { dockerRegistryPasswd: Buffer.from(cr.password).toString('base64') }
		}
	};

	let cred = await store.request(config);

	config = {
		url: host + '/credentials/domains/' + viya.domain + '/secrets',
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'authorization': 'bearer ' + token,
		},
	};
	let secrets = await store.request(config);
	console.log(' Secret returned from the GET secrets ' , secrets.data.secrets);
	let s = Buffer.from(secrets.data.secrets.dockerRegistryPasswd, 'base64').toString('utf-8');
	console.log('secret converted back to utf-8 ', s);
	return cred.data;
}



async function createPublishDestination (store, viya, cr, cluster) {
	let delConfig = {
		url: store.connection().host + '/modelPublish/destinations/' + viya.destination,
		method: 'DELETE',
		headers: {
			authorization: 'bearer ' + store.connection().token
		}
	};
	await store.request(delConfig);

	let config = {
		url   : store.connection().host + '/modelPublish/destinations',
		method: 'POST',
		data: {
			name: viya.destination,
			destinationType: 'privateDocker',
			properties: [
				{ name: 'credDomainId', value: viya.domain },
				{ name: 'baseRepoUrl', value: cr.url}
			],
		},
		headers: {
			'content-type': 'application/json',
			'authorization': 'bearer ' + store.connection().token,
		},
	};

	let r = await store.request(config);
	return r.data;
}
