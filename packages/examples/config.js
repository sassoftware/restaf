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

"use strict";

let fs = require('fs');
let yargs = require('yargs');

module.exports = function config () {

	let argv   = yargs.argv;
	let appEnv = argv.env == null ? process.env.RESTAFENV : argv.env;

	console.log('---------------------------------------');
	console.log(`env file set to: ${appEnv}`);
	console.log('---------------------------------------');

	if (appEnv != null) {
		iconfig(appEnv);
	}
	
	process.env.SAS_PROTOCOL =
		process.env.SAS_SSL_ENABLED === "YES" ? "https://" : "http://";
	let viyaServer = process.env.VIYA_SERVER;
	
	// left for backward compatability - preferred way is to specify http in the url
	if (viyaServer.indexOf("http") < 0) {
		viyaServer = `${process.env.SAS_PROTOCOL}${process.env.VIYA_SERVER}`;
	}
	return {
		authType    : "password",
		host        : viyaServer,
		user        : process.env["USER"],
		password    : process.env["PASSWORD"],
		clientID    : process.env["CLIENTID"],
		clientSecret: process.env.hasOwnProperty("CLIENTSECRET")
		? process.env["CLIENTSECRET"]
		: ""
	}
}

function iconfig (appEnv) {
	try {
		let data = fs.readFileSync(appEnv, 'utf8');
		let d = data.split(/\r?\n/);
		console.log('Configuration specified via raf.env');
		d.forEach(l => {
			if (l.length > 0 && l.indexOf('#') === -1) {
				let la = l.split('=');
				let envName = la[0];
				if (la.length === 2 && la[1].length > 0) {
					process.env[envName] = la[1];
				} else {
					console.log(
						`${envName} inherited as ${process.env[envName]}`
					);
				}
			}
		});
	} catch (err) {
		console.log(err);
		process.exit(0);
	}
}
