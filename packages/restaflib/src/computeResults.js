/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @description Return Log|listing|ODS|list of tables in the compute service job
 * @async
 * @module computeResults
 * @category restaflib/compute
 * @param {object} store - restaf store
 * @param {object} computeSummary - computeSummary object
 * @param {string} type - type of result( log|listing|ods|table)
 * @returns {object|string} - string for all except table(array of names)
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
		if (computeSummary.ods !== null) {
			let result = await store.apiCall(computeSummary.ods);
			return result.items();
		} else {
			return '<h2> No ODS output </h2>';
		}
	} else if (type === 'tables') {
		return Object.keys(computeSummary.tables);
	} else if (type === 'files') {
		return Object.keys(computeSummary.files);
	} else {
		throw `Error: Invalid type ${type}`;
	}
}
export default computeResults;
