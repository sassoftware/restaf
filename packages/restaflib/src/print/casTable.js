/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

'use strict';
/**
 * print cas table
 * @module casTable
 * @param {object} result - the raf object retrned from a call to cas
 * @param {string} table - the name of the table
 * 
 * @returns {object} - the new json version
 */
import print from './index';

function casTable (result, table) {
    let data = result.items('tablesByName', table);
    if (data === null) {
        return;
    }
    let itemRows = data.get('rows');
    let columns = [];
    data.get('schema').map(s => {
        columns.push(s.get('name'));
    });

    print.object(columns, 'Columns');

    print.titleLine('Data Rows');

    let allRows = itemRows.map((r, i)=> {
        let row = {};
        r.map((value, j) => {
            row[columns[j]] = value;
        });
        // print.object(row, `Row ${i+1}`);
        return row;
    });
    print.object(allRows, `Data for ${table}`);
}
export default casTable;