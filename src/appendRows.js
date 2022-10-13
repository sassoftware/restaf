/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { computeRun, computeResults } from '@sassoftware/restaflib';
import uploadData from './uploadData';

/**
 * @description Append active table to master table
 * @async
 * @module appendRows
 * @category restafedit/core
 * @param {table} table master table
 * @param {array} columns to drop
 * @param {appEnv} appEnv - appEnv
 * @returns {promise}  - status object
 * @example
 *
 */
async function appendRows (table, drop, appEnv) {
  const handler = (appEnv.source === 'cas') ? _casSQL : _computeSQL;
  const status = await handler(table, drop, appEnv);
  return status;
}

async function _casSQL (table, drop, appEnv) {
  const tempTable = { caslib: table.caslib, name: 'restafedittemp' };
  debugger;
  const r = await uploadData(tempTable, appEnv.state.data, drop, {}, appEnv, table, false);
  console.log(r);
  return r;
}

async function _computeSQL (table, drop, appEnv) {
  const { store, session } = appEnv;
  const { data, columns } = appEnv.state;

  const rowCount = data.length;
  if (rowCount === 0) {
    return { msg: 'No data to append', statusCode: 1 };
  }
  debugger;
  const dropList = ['_index_', '_rowIndex'].concat(drop);
  const validCols = [];
  for (const c in columns) {
    if (dropList.indexOf(c) === -1) {
      validCols.push(c);
    }
  }
  let set = ' ';
  console.log(validCols);
  const ncols = validCols.length - 1;
  debugger;
  data.forEach(row => {
    let s = 'set ';
    let i = 0;
    console.log(row);
    validCols.forEach(c => {
      const d = row[c];
      console.log(c, ' ', d);
      debugger;
      s = s + c + '=' + value2String(d);
      console.log(s);
      if (i < ncols) {
        s = s + ', ';
      }
      console.log(s);
      i++;
    });
    set = set + s + '\n';
    console.log(set);
  });

  const src = `
    proc sql;
    insert into ${table.libref}.${table.name}
    ${set};
    run;
    proc print data=${table.libref}.${table.name};
    run;
  `;
  debugger;
  const r = await computeRun(store, session, src);
  const st = r.SASJobStatus;
  console.log('Job Status: ', r.SASJobStatus);
  if (st === 'failed' || st === 'running') {
    console.log('Job  ended with status of ', st);
  }
  debugger;
  const logs = await computeResults(store, r, 'log');
  console.log(JSON.stringify(logs, null, 4));
  const listings = await computeResults(store, r, 'listing');
  console.log(JSON.stringify(listings, null, 4));
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
