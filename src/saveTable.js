/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @description Persists the inmemory cas table.
 * @async
 * @module saveTable
 * @category restafedit/dataMgmt
 * @param {appEnv} appEnv
 * @param {object=} table - save the inmemory table
 * @returns {promise}  Status object
 * @example
 * Saves the current cas table and leave the inmemory table intact.
 * This is a noop if source is compute.
 **/

import { casSaveTable } from '@sassoftware/restaflib';

async function saveTable (appEnv, table) {
  const { store, session } = appEnv;

  if (appEnv.source === 'compute') {
    return { msg: 'Action does not apply to SAS 9 tables', statusCode: 0 };
  }
  const t = (table != null) ? table : appEnv.appControl.table;
  await casSaveTable(store, session, t, true, true);
  return { msg: 'Table saved', statusCode: 0 };
}
export default saveTable;
