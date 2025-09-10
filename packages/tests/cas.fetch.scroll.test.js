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
const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./getLogonPayload.js");
const getOpts = require("./getOpts.js");


run()
	.then((r) => console.log('done'))
	.catch((err) => console.log(JSON.stringify(err, null, 4)));
async function run() {
	debugger;
	let opts = getOpts();
	console.log('running where clause test');
	let logonPayload = await getLogonPayload();

	let store = restaf.initStore(
		{
			casProxy: true,
			options: {
				proxyServer: null,
			//	httpOptions: opts
			},

		});
	
	let msg = await store.logon(logonPayload);
	console.log(msg);
	let { casManagement } = await store.addServices('casManagement');
	let { session } = await restaflib.casSetup(store, null);
	let payload = {
		start: 0,
		limit: 1000,
		format: true,
		where: "company LIKE '%IBM%'",
		table: { caslib: 'Public', name: 'companies' },

	};
	let result;
   console.log('session  created');
	try {
		result = await restaflib.casFetchData(store, session, payload);
		console.log(result.data.rows);
		console.log('--------------------', result.scrollOptions);
		console.log('page: ', result.pagination);
		while (result.pagination.next != null) {
			result.pagination.next.where = "company LIKE 'A%'";
			result = await restaflib.casFetchData(store, session, result.pagination.next);
			console.log(result.data.rows);
			console.log('--------------------', result.scrollOptions);
			console.log('page: ', result.pagination);
		}
	} catch (err) {
		console.log(JSON.stringify(err, null, 4));
		throw 'Failed fetch';
	}
	/*
	const cachef = [];
	const cacheb = [];
	cachef.push([result.data.scrollOptions, result.data.rows.length]);
	while (result.pagination.next != null) {
		result = await restaflib.casFetchData(store, session, result.pagination.next);
		cachef.push([result.data.scrollOptions, result.data.rows.length]);

	}
	try {
		result = await restaflib.casFetchData(store, session, { direction: 'back', limit: 10 });
		cacheb.push([result.data.scrollOptions, result.data.rows.length]);
		console.log(result.data.rows);
		console.log('--------------------', result.scrollOptions);
		console.log('page: ', result.pagination);
	} catch (err) {
		console.log(JSON.stringify(err, null, 4));
		throw 'Failed fetch';
	}

	while (result.pagination.next != null) {
		result = await casFetchData(store, session, result.pagination.next);
		cachef.push([result.data.scrollOptions, result.data.rows.length]);

	}
		*/
}
/*
let p = {
	action: "datastep.runCode",
	data  : {
		single: "YES",
		code  : "data casuser.score; keep x1 x2;do i = 1 to 20; x1=i; x2=i*10;output;end;run; ",
	},
};
*/
