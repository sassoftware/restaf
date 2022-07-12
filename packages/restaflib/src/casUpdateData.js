/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @async
 * @param {*} store   - store
 * @param {*} session - cas session
 * @param {*} payload - {data,where,table}
 * @returns {promise} - return 
 * @alias module casUpdateData
 * * @example
 *    let inputs = restaflib.casUpdateData(store, session, payload);
 *    payload = { where: {key1: vale1, key2: value2,...},
 *                data: {var1:value1, var2:value2,....}},
 *                table: {caslib: caslib, name: name}
 *     Expects a single row
 */
async function casUpdateData(store, session, payload) {
    let {data, where, table} = payload;
    let swhere = '';
    
    let andbit = ' ';
    for( let k in where) {
        let v = where[k];
        let valString = (typeof v === "string") ? `'${v.toString()}'` : v;
        swhere = swhere + andbit + k + `= ${valString} `;
        andbit = ' AND '
    }

    let set = [];
    for (let k in data) {
        let value = data[k]; 
        let valueString;

        if( value == null ) {
            valueString = '.';
        } else if (typeof value === 'string') {
            valueString = JSON.stringify(value) /*`${JSON.stringify(value)}`*/;
        } else {
            valueString = value.toString();
        }
        set.push({var: k, value: valueString});
    }
        


    let tbl = {...table, where: `${swhere}`};

    let updateRow ={ table: tbl, set };

    let pl = {
        action: 'table.update',
        data: updateRow
    }

    let r = await store.runAction(session, pl);
    return r;
}

export default casUpdateData;
