'use strict';
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
let restaf    = require('restaf');
let {casSetup, caslScore, masSetup, masRun } = require('restaflib');

let  {
        getLogonPayload,
        parseEvent,
        setError,
        setPayload} = require('../lib');

//
// Get Viya logon info from environment variables and logon to Viya Server 
// Follow that by handling the call
//  Note how an error is returned as "normal" result but with statusCode set to some http error condition(ex: 400)
// There are better ways to handle error conditions in AWS but for pass 1 this is good enough
//
module.exports.dsScore  = async function (event, context) {

	// use rejectUnauthorized for demos only 
	let store   = restaf.initStore({pem: null, rejectUnauthorized: false }); /* initialize restaf         */
	let session = null;
	
	try {
		let inParms   = await parseEvent(event);
		let payload   = await getLogonPayload(inParms);
		let results;
	
		if (inParms.masModel != null) {
			let model = [ inParms.model.name ];
			let masControl = await masSetup(store, model, payload);
			results = await masRun(store, masControl, inParms.model.name, inParms.scenario, (inParms. step != null) ? inParms.step:null); 
		} else {
			let r  = await casSetup(store, payload);
			session = r.session;
			results   = await caslScore(store, session,inParms);
			await store.apiCall(session.links('delete'));
		}
		return setPayload(results);
	} 
	catch(err) {
		if (session !== null) {
			await store.apiCall(session.links('delete'));
		}
		return setError(err);
	}
};

