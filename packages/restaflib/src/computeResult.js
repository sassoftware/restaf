/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
async function computeResults (store, computeSummary, type) {
	if (type === 'log' || type === 'listing') {
		let log = [];
		if (computeSummary[type] !== null) {
			let result = await store.apiCall(computeSummary[type]);
			log = log.concat(result.items().toJS());
			let next;
			while ((next = result.scrollCmds('next')) !== null) {
				result = await store.apiCall(next);
				log = log.concat(result.items().toJS());
			}
		} else {
			log[0] = `Note: No ${type}`;
		}
		return log;
	} else if (type === 'ods') {
		let result = '<h2> No ODS output </h2>';
		if (computeSummary.ods !== null) {
			result = await store.apiCall(computeSummary.ods);
		}
		return result.items();
	} else {
		throw `Error: Invalid type ${type}`;
	}
}
export default computeResults;
