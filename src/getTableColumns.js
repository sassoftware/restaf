/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description get the columns for a table
 * @async
 * @module getTableColumns
 * @category restafedit/utility
 * @param {string} source   - cas or compute
 * @param {object} table    - table object
 * @param {appEnv} appEnv   - app Environment from setup
 *
 * @returns {promise}       - returns an array of table names(cas or SAS)
 * @example
 *  let list = await getTableSummary(appEnv);
 *  returns summary information object. The function also sets the results in appEnv.state.tableSummary
 *  For consistency between cas and compute, rowCount and columnCount are
 *  set for both cases.
 * { 
 *  rowCount: number,
 *  columnCount: number
 *  ...rest...
 *  }
 */
import igetTableColumns from './igetTableColumns';
async function getTableColumns (source, table, appEnv) {
  let name = table.name;
  let libname = (source === 'cas') ? table.caslib : table.libref;
  debugger;
  let columns = await igetTableColumns(
    appEnv.store, appEnv.session, source, libname, name);
  return columns;
}
export default getTableColumns;