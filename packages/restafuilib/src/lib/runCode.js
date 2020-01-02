/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import runCasl from './runCasl';

async function runCode (path, store, model, inputData, serverless) {

	let data = {...model, ...inputData};
	let casResults;

	if (serverless === true){
		let config = {
			url    : `${model.slsUrl}/${path}`,
			method : 'POST',
			data   : data,
			headers: {
				'Accept'      : 'application/json',
				'Content-Type': 'application/json'
			}
		};
		let r = await store.request(config);
		casResults = r.data.casResults;
	} else {
		let r = await runCasl (store, [ 'scoreCasl' ], data);
		casResults = r.items('results', 'casResults').toJS();
	}
	return casResults;
}

export default runCode;

