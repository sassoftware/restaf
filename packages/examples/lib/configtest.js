/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
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
let getToken = require('./getToken');

module.exports = function configtest () {
	

	let appEnv = process.env.RESTAFENV;
	if (appEnv == null && process.env.DEFAULTENV != null) {
		appEnv = process.env.DEFAULTENV;
	}
	if (appEnv != null) {
		iconfig(appEnv);
	} 

	// left for backward compatability - preferred way is to specify http in the url
	if (process.env.VIYA_SERVER == null) {
		console.log('Please set the VIYA_SERVER either thru env variables or the env file');
		process.exit(0);
	}

	let logonPayload = null;
	console.log('xxxx', process.env.SASTOKEN);
	logonPayload = {
		authType : 'server',
		host     : process.env.VIYA_SERVER,
		token    : getToken(),
		tokenType: 'bearer',
	};
	console.log('logonPayload', logonPayload)
	console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);

	return logonPayload;

	function iconfig(appEnv) {
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
};


