/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casAppendTable, computeAppendTable } from '@sassoftware/restaflib';

/**
 * @description Append active table to master table
 * @async
 * @module appendTable
 * @category restafedit/core
 * @param {table} table master table
 * @param {appEnv} appEnv - appEnv
 * @returns {promise}  - status object
 * @example
 *
 */
async function appendTable (table, appEnv) {
  const handler = (appEnv.source === 'cas') ? casAppendTable : computeAppendTable;
  const result = await handler(appEnv.store, appEnv.session, appEnv.table, table);
  return result;
}

export default appendTable;
