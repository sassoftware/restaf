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
 * @returns {promise}  - status object
 * @example
 * To add new rows to the working table.
 *  let data = [{x1:1, x2: 30}, {x1:10, x2:50}];
 *  await addRows(data, appEnv);
 *  The columns must match the columns in the working table.
 *
 */
async function addRows (data, appEnv) {
  const table = appEnv.table; /* write to current table */
  const drop = [];
  for (const c in appEnv.state.columns) {
    if (appEnv.state.columns[c].custom === true) {
      drop.push(c);
    }
  }
  const status = await appendRows(table, drop, appEnv, data);
  return status;
}

export default addRows;
