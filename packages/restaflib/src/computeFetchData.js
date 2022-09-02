/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 /**
 * 
 * @description Fetch data from a SAS Table
 * @async
 * @module computeFetchData
 * @category restaflib/compute
 * @param {object} store - restaf store
 * @param {computeSummary} computeSummary - Summary object created by computeSummary method
 * @param {string} table - name of the table
 * @param {string} scroll direction - null(to get first set)|next|prev|first|last
 * 
 * @returns {promise} - {columns: <columnames>, rows: <data for rows> , scrollOptions: <available scroll directions>}
 */
async function computeFetchData (store, computeSummary, table, direction, payload) {
	let data = null;
	let tname = (typeof table === 'string') ? table : `${table.libref}.${table.name}`;
	tname = tname.toUpperCase(); /*to allow for compute service table info */

	// is payload an override or the real thing?
	let adhoc = (payload != null && direction == null) ? true: false;
	let tableInfo = computeSummary.tables[tname];
	if ( tableInfo != null) {
		// reset info on this table if user does adhoc retrieval
		// trying to keep track of multiple streams for same table is a nightmare
		if (adhoc === true) {
			tableInfo.current = null;
		}
		if (tableInfo.current === null || direction == null || direction === 'first') {
			let t1 = await store.apiCall(tableInfo.self);
			let result = await store.apiCall(t1.links('rowSet'), payload);
			// get columns explicitly since user can control this thru payload
			let columns = await store.apiCall(t1.links('columns'));
			let schema = [];
			let items = columns.items().toJS();
			for(let cx in items) {
				let c = items[cx];
				let newcol = {
					name: c.name.toLowerCase(),
					Column: c.name.toLowerCase(),
					Label: c.data.label,
					length: c.data.length,
					type  : c.data.type,
					custom: false
				}
			schema.push(newcol);
   		    }
			tableInfo.current = result;
			tableInfo.schema = schema;
			let datax = result.items().toJS();
			
			data = {
				columns: datax.columns,
				schema: schema,
                rows   : datax.rows,
                
				scrollOptions: result
					.scrollCmds()
					.keySeq()
					.toJS()
			};
		} else {
			
			let current = tableInfo.current;
			let dir = direction;
			if (payload )
			if (direction === 'next' && current.scrollCmds('next') === null) {
				dir = current.links('last') !== null ? 'last' : null;
			}
			if (direction === 'prev' && current.scrollCmds('prev') === null) {
				dir = current.links('first') !== null ? 'first' : null;
			}
			if (dir !== null && current.scrollCmds(dir) !== null) {
				let result = await store.apiCall(current.scrollCmds(dir), payload);
				tableInfo.current = result;
				let datax = result.items().toJS();
				data = {
					schema: tableInfo.schema,
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
