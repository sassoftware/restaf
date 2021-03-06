/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 /**
 * 
 * Fetch data from a SAS Table
 * @async
 * @module computeFetchData
 * @param {object} store - restaf store
 * @param {object} computeSummary - Summary object created by computeSummary method
 * @param {string} table - name of the table
 * @param {string} scroll direction - null(to get first set)|next|prev|first|last
 * 
 * @returns {promise} - {columns: <columnames>, rows: <data for rows> , scrollOptions: <available scroll directions>}
 * @alias module: computeFetchData
 */
async function computeFetchData (store, computeSummary, table, direction) {
	let data = null;
	let tableInfo;
	// eslint-disable-next-line no-prototype-builtins
	if (computeSummary.tables.hasOwnProperty(table) === true) {
		tableInfo = computeSummary.tables[table];
		if (tableInfo.current === null || direction == null) {
			let t1 = await store.apiCall(tableInfo.self);
			let result = await store.apiCall(t1.links('rowSet'));
			tableInfo.current = result;
			let datax = result.items().toJS();
			data = {
				columns: datax.columns,
                rows   : datax.rows,
                
				scrollOptions: result
					.scrollCmds()
					.keySeq()
					.toJS()
			};
		} else {
			let current = tableInfo.current;
			let dir = direction;
			if (direction === 'next' && current.scrollCmds('next') === null) {
				dir = current.links('last') !== null ? 'last' : null;
			}
			if (direction === 'prev' && current.scrollCmds('prev') === null) {
				dir = current.links('first') !== null ? 'first' : null;
			}
			if (dir !== null && current.scrollCmds(dir) !== null) {
				let result = await store.apiCall(current.scrollCmds(dir));
				tableInfo.current = result;
				let datax = result.items().toJS();
				data = {
					columns: datax.columns,
                    rows   : datax.rows,
                    
					scrollOptions: result.scrollCmds().keySeq().toJS()
				};
			}
		}
	}

	return data;
}

export default computeFetchData;
