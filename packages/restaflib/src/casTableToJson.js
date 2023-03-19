/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * @description Converts a cas table to JSON(utility)
 * @module casTableToJson
 * @category restaflib/util
 * @param {object} result - the raf object returned from a call to cas
 * @param {string} table - the name of the table
 * 
 * @returns {object} - the new json version [{var1: value1, var2: value2,...}, {...}]
 * @alias module: casTableToJson
 * 
 */

function casTableToJson (result, table){
    let data = result.items('tables', table);
    let itemRows = data.get('rows');
    let columns = [];
    data.get('schema').map(s => {
        columns.push(s.get('name'));
    });

    let allResults = [];
    itemRows.map((r)=> {
        let row = {};

        r.map((value, j) => {
            row[columns[j]] = value;
        });
        allResults.push(row);
    });
return allResults;
}

export default casTableToJson;
