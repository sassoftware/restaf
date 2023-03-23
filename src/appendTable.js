/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casAppendTable, computeAppendTable } from '@sassoftware/restaflib';

/**
 * @description Append active table to the master table
 * @async
 * @module appendTable
 * @category restafedit/dataMgmt
 * @param {table} table master table
 * @param {appEnv} appEnv - appEnv
 * @param {boolean=} save - useful only for cas.ignored for compute
 * @returns {promise}  - status object
 * @example
 *   const status = appendTable({caslib: 'public', 'name:'master'}, appEnv);
 *   Append working table to the specified master table.
 *
 */
async function appendTable (table, appEnv, save) {
  
  const handler = (appEnv.source === 'cas') ? casAppendTable : computeAppendTable;
  const saveFlag = (save != null) ? true : save;
  const result = await handler(appEnv.store, appEnv.session, appEnv.table, table, saveFlag);
  
  return result;
}

export default appendTable;
