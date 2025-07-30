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
let getLogonPayload = require('./getToken');

module.exports = async function configtest () {

	let logonPayload = await getLogonPayload();
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


