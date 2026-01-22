/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/

//
// Notes: Retrieve a SAS table and convert to a json
// convert table to object of the form [{var1: value, var2: value,...},....]
// ex: [{merlot:10, twobit:20}, {merlot: 20, twobit:30}]

;
/**
 * @description Convert table to object of the form [{var1: value, var2: value,...},....](async)
 * @async
 * @private
 * @module getSASTableRows
 * @category restaflib/compute
 *                  
 * @param {object} store - restaf store
 * @param {object} computeSummary - computeSummary
 * @param {string} tableName - name of the table
 * 
 * @returns {promise} - get retrieved rows [{var1:value, var2:...}]
 */
async function getSasTableRows ( store, computeSummary, tableName ){

    let tableSelf = computeSummary.tables[tableName];
    let t1        = await store.apiCall( tableSelf );
    let table     = await store.apiCall( t1.links( 'rowSet' ) );

    let columns   = table.items( 'columns' );
    let rows = table.items( 'rows' );
    let result = [];
    

    let count = rows.size;
    for ( let i=0; i < count; i++ ) {
        let row = rows.get( i );
        let r = {};
        columns.map( ( c,i ) => {
           let varx = c.toLowerCase();
           r[varx] = row.get( i );
        } );
        result.push( r );
    }
    return result;

}
export default getSasTableRows;
