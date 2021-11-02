/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';

let fs = require('fs');

module.exports = function config (envFile) {
	
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
	
	let appEnv = envFile == null ? process.env.RESTAFENV : envFile;
	let logonPayload;
    
	if (appEnv != null) {
		iconfig(appEnv);
	}
	
	if (process.env.CLIENTID == null) {
		process.env.CLIENTID = 'sas.ec';
		process.env.CLIENTSECRET = '';
		console.log(`clientID set to default`);
	}
	if (process.env.VIYA_SERVER == null) {
		console.log('Error: Please set VIYA_SERVER');
		process.exit(0);
	}

	let viyaServer = process.env.VIYA_SERVER;
	if (viyaServer.indexOf('http') < 0) {
		viyaServer = `http://${process.env.VIYA_SERVER}`;
	}
	if (process.env.TOKENFILE != null) {
		let data = fs.readFileSync(process.env.TOKENFILE, 'utf8');
		process.env.VIYA_TOKEN = data;
	}
	
	if (process.env.VIYA_TOKEN != null) {
		logonPayload = {
			authType: 'server',
			host    : viyaServer,
			
			token    : process.env.VIYA_TOKEN,
			tokenType: 'bearer',
		};
	} else {
		logonPayload = {
			authType: 'password',
			host    : viyaServer,
			user    : process.env['USER'],
			password: process.env['PASSWORD'],
			clientID: process.env['CLIENTID'],

			clientSecret: process.env.hasOwnProperty('CLIENTSECRET') ? process.env['CLIENTSECRET'] : '',
		};
	}
	let tls = {};

	if (process.env.TLS_CERT != null) {
		tls.cert = fs.readFileSync(process.env.TLS_CERT, 'utf8');
	}

	if (process.env.TLS_KEY != null) {
		tls.key = fs.readFileSync(process.env.TLS_KEY, 'utf8');
	}

	if (process.env.TLS_CABUNDLE != null) {
		tls.CA = fs.readFileSync(process.env.TLS_CABUNDLE);
	}

	if (process.env.TLS_PFX != null) {
		tls.pfx = fs.readFileSync(process.env.TLS_PFX);
	}

	if (process.env.TLS_PW != null) {
		tls.passphrase = process.env.TLS_PW;
	}
	logonPayload.sslOptions = tls;
	return logonPayload;
};

function iconfig (appEnv) {
	try {
		let data = fs.readFileSync(appEnv, 'utf8');
		let d = data.split(/\r?\n/);
		d.forEach((l) => {
			if (l.length > 0 && l.indexOf('#') === -1) {
				let la = l.split('=');
				let envName = la[0];
				if (la.length === 2 && la[1].length > 0) {
					process.env[envName] = la[1];
				}
			}
		});
	} catch (err) {
		console.log(err);
		process.exit(0);
	}
}
