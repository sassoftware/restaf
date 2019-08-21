/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

'use strict';

let fs = require('fs');
let restaf = require('restaf');
let Https = require('https');
let axios = require('axios');

// require('win-ca/fallback');

let pemFile = process.env.PEMFILE;
console.log(pemFile);
let pem = (pemFile != null) ? fs.readFileSync(pemFile, 'utf8') : null;


let config = {
	url   : 'https://google.com',
	method: 'GET'
};

if (pem != null) {
	let agent = new Https.Agent({ ca: pem, rejectUnauthorized: true });
	config.httpsAgent = agent;
} else if (process.env.ALLOWUNAUTHORIZED === 'YES') {
	let agent = new Https.Agent({ rejectUnauthorized: false });
	config.httpsAgent = agent;
}
console.log(config.url);
axios(config)
	.then(msg => console.log(msg.data))
	.catch(err => console.log(err));
