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

module.exports = function printCasTable( result, table ) {
    let data = result.items('tables', table);
    let itemRows = data.get('rows');
    let columns = [];
    data.get('schema').map(s => {
        columns.push(s.get('name'));
    });

    console.log(columns);

    itemRows.map((r)=> {
        let row = {};

        r.map((value, j) => {
            row[columns[j]] = value;
        });
        console.log(JSON.stringify(row, null, 4));
    });
}