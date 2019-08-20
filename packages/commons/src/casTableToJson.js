/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * Converts a cas table to form needed by graphql
 * @module casTableToJson
 * @param {object} result - the raf object retrned from a call to cas
 * @param {string} table - the name of the table
 * 
 * @returns {object} - the new json version
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
