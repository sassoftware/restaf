/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { computeRun, computeResults } from '@sassoftware/restaflib';
import uploadData from './uploadData';

/**
 * @description Append client data to a master table other than working table
 * @async
 * @module appendRows
 * @category restafedit/dataMgmt
 * @param {rowObjectArray} data 
 * @param {table} table master table
 * @param {array} columns array of column names to drop
 * @param {appEnv} appEnv - appEnv
 * @param {boolean=} save save the table after append (default=true)
 * @returns {promise}  - status object
 * @example
 * To append all the rows on the client:
 * If data is null, the data in appEnv.state will be appended
 *  await appendRows(mydata, {caslib: 'public, name: 'masterAccts'}, ['total', 'price'], appEnv)
 *  Notes:
 *    - Use addRows to add new rows to the working table
 *    - use appendTable to append working table to a master table
 */
async function appendRows (data, table, drop, appEnv, save) {
  const handler = (appEnv.source === 'cas') ? _casSQL : _computeSQL;
  const status = await handler(table, drop, appEnv, data, save);
  return status;
}

async function _casSQL (table, drop, appEnv, addData, saveFlag) {
  const tempTable = { caslib: table.caslib, name: 'restafedittemp' };
  const data = (addData != null) ? addData : appEnv.state.data;
  const r = await uploadData(tempTable, data, drop, {}, appEnv, table, saveFlag);
  return r;
}

async function _computeSQL (table, drop, appEnv, addData) {
  const { store, session } = appEnv;
  const { columns } = appEnv.state;
  const data = (addData != null) ? addData : appEnv.state.data;

  const rowCount = data.length;
  if (rowCount === 0) {
    return { msg: 'No data to append', statusCode: 1 };
  }
  const dropList = ['_index_', '_rowIndex'].concat(drop);
  const validCols = [];
  ;
  for (const c in columns) {
    if (dropList.indexOf(c) === -1) {
      validCols.push(c);
    }
  }
  let set = ' ';
  const ncols = validCols.length - 1;
  data.forEach(row => {
    let s = 'set ';
    let i = 0;
    validCols.forEach(c => {
      const d = row[c];
      s = s + c + '=' + value2String(d);
      if (i < ncols) {
        s = s + ', ';
      }
      i++;
    });
    set = set + s + '\n';
  });

  const src = `
    proc sql;
    insert into ${table.libref}.${table.name}
    ${set};
    run;
    proc print data=${table.libref}.${table.name};
    run;
  `;
  const r = await computeRun(store, session, src);
  const st = r.SASJobStatus;
  // console.log('Job  ended with status of ', st);
  // const logs = await computeResults(store, r, 'log');
  if (st === 'failed' || st === 'running') {
    console.log(JSON.stringify(logs, null, 4));
    return { msg: `Job  ended with status of ${st}. See console for logs`, statusCode: 2 };
  }
  return { msg: 'Rows Appended', statusCode: 0 };
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

export default appendRows;
