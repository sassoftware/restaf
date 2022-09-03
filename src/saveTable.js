/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @description Save the current table to disk
 * @async
 * @module saveTable
 * @category restafedit/core
 * @param {appEnv} appEnv
 * @param {object=} table - save the table to disk
 * @returns {promise}  Status object
 * @example
 * Saves the current cas table and leaves the inmemory table intact.
 * If you want to save some other inmemory table pass the optional second parameter
 * This is a noop for SAS Tables
 **/

import { casSaveTable } from '@sassoftware/restaflib';

async function saveTable (appEnv, table) {
  const { store, session } = appEnv;

  if (appEnv.source === 'compute') {
    return { msg: 'Action does not apply to SAS 9 tables', statusCode: 0 };
  }
  const t = (table != null) ? table : appEnv.appControl.table;
  await casSaveTable(store, session, t);
  return { msg: 'Table saved', statusCode: 0 };
}
export default saveTable;
