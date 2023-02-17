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
async function computeFetchData (store, computeSummary, table, direction, payload,useRow) {
	let data = null;
	let tname = (typeof table === 'string') ? table : `${table.libref}.${table.name}`;
	tname = tname.toUpperCase(); /*to allow for compute service table info */
	let ipayload = (payload != null) ? {...payload} : {qs:{}};
	ipayload.qs.includeIndex = true;
	
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
			let colCount =  t1.items().toJS()['columnCount']
			// get columns explicitly since user can control this thru payload
			let qc = {
        qs: {
					start: 0,
					limit: colCount
				}
			};

			let columns = await store.apiCall(t1.links('columns'), qc);
			let schema = [];
			let items = columns.items().toJS();
			let linkRel = (useRow === 'rows') ? 'rows' : 'rowSet';
			if (linkRel === 'rows') {
				schema.push(
					{
						name: '_index_',
						Column: '_Index_',
						Label : 'Index',
						length: 8,
						type: 'FLOAT',
						custom: false
					}
				)
			};
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

			// Now get data using rows or rowSet rel
			// should probably drop rowSet since is seems to be missing query features

			let result = await store.apiCall(t1.links(linkRel),ipayload);
			
			// If using linkRel of rows, convert the data to rowSet schema
			let rowsData = (linkRel === 'rowSet') ? result.items().toJS().rows : cells2RowSet(schema, result);
			tableInfo.current = result;
			tableInfo.schema = schema;
			tableInfo.columns = columns;

			data = {
				columns: columns, /* need to remove this */
				schema: schema,
                rows   : rowsData,
                
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
			data = {
				schema: tableInfo.schema,
				columns: tableInfo.columns,
				rows   : [],
				scrollOptions: current.scrollCmds().keySeq().toJS()
			};
			if (dir !== null && current.scrollCmds(dir) !== null) {
				let result = await store.apiCall(current.scrollCmds(dir), ipayload);
				
				tableInfo.current = result;
				let rowsData = (useRow !== 'rows') ? result.items().toJS().rows : cells2RowSet(tableInfo.schema, result);
				data = {
					schema: tableInfo.schema,
					columns: tableInfo.schema,
                    rows   : rowsData,
					scrollOptions: result.scrollCmds().keySeq().toJS()
				};
				
			}
		}
	}
	           
	return data;
}
function cells2RowSet(schema, result) {
	let rowsData = result.items().toJS().map( (r) => {
		let cell = r.cells; 
		return cell;
	})
	return rowsData;
}


export default computeFetchData;

/*
let cell = r.cells; 
		let row = {};
		for (let j=0; j < cell.length; j++ ){
			let colName = schema[j].name;
			row[colName] = cell[j];
		}
		return row;
*/