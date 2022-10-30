/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import appendRows from './appendRows';

/**
 * @description Add new rows to current table
 * @async
 * @module addRows
 * @category restafedit/dataMgmt
 * @param {rowObjectArray=} data data to add to current table
 * @param {appEnv} appEnv - appEnv
 * @param (boolean=) save Save the table(defaultis true)
 * @returns {promise}  - status object
 * @example
 * To add new rows to the working table.
 *  let data = [{x1:1, x2: 30}, {x1:10, x2:50}];
 *  await addRows(data, appEnv);
 *  The columns must match the columns in the working table.
 *
 */
async function addRows (data, appEnv, save) {
  const table = appEnv.table; /* write to current table */
  ;
  const drop = [];
  for (const c in appEnv.state.columns) {
    if (appEnv.state.columns[c].custom === true) {
      drop.push(c);
    }
  }
  let d = (Array.isArray(data) === true) ? data : [data];
  const status = await appendRows(d, table, drop, appEnv, save);
  return status;
}

export default addRows;
