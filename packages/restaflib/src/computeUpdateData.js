/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 /**
 * @description Update a record in a cas table
 * @async
 * @private
 * @module computeUpdateData
 * @category restaflib/cas
 * @param {store} store   - store
 * @param {rafObject} session - cas session
 * @param {*} payload - {data,where,table}
 * @returns {promise} - return 
 * @example
 *    let inputs = restaflib.computeUpdateData(store, session, payload);
 *    payload = { where: {key1: vale1, key2: value2,...},
 *                data: {var1:value1, var2:value2,....},
 *                table: {caslib: caslib, name: name}
 *     Expects a single row
 */
async function computeUpdateData(store, session, payload) {
    const { data, table, where } = payload;
    let src =
      `proc sql; update ${table.libref}.${table.name}`;
    let set = 'SET ';
    let comma = ' ';
    for (const k in data) {
      set = set + comma + k + '=' + value2String(data[k]);
      comma = ', ';
    };
    src = src + ' ' + set;
    let swhere = ' WHERE ';
    let andbit = ' ';
    for( let k in where) {
        let v = where[k];
        let valString = value2String(v);
        swhere = swhere + andbit + k + `= ${valString} `;
        andbit = ' AND '
    }
    src = src + ' ' + swhere + ';run;';
    const asrc = src.split(/\r?\n/);
  
    const p = {
      data: { code: asrc }
    };

    const job = await store.apiCall(session.links('execute'), p);
    const qs = {
      qs: {
        newState: 'Completed',
        timeout : 1
      }
    };
  
    // eslint-disable-next-line no-unused-vars
    const status = await store.jobState(job, qs);
    const c = (status.data === 'completed' ? 0 : 1);
  
    return { statusCode: c, msg: status.data };
  }
  
  function value2String (value) {
    let valueString;
    if (value == null) {
      valueString = '.';
    } else if (typeof value === 'string') {
      valueString = JSON.stringify(value);
    } else {
      valueString = value.toString();
    }
    return valueString;
  }


export default computeUpdateData;
