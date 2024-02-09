/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import scrollTable from './scrollTable';
import { computeFetchData, casFetchData,  computeSetupTables} from '@sassoftware/restaflib';
/**
 * @description Fetch new records based on control argument
 * @async
 * @module fetchRows
 * @category restafedit/fetch
 * @param {fetchControl} control - info for records to retrieve
 * @param {appEnv} appEnv - appEnv
 * @returns {promise}  - { data:data, columns:ecolumns, pagination: pagination}
 * @example
 *    r = await fetchRows({qs:{start:0, limit: 200, format: false, where=''}, appEnv})
 *    Use this method for custom fetching instead of scrollTable.
 *
 */
async function fetchRows (icontrol, appEnv, table) {
  
  let result;
  if (table) {
    const { store, session } = appEnv;
    let control = {...icontrol};
    if (appEnv.source === 'cas') {
      control.table = table;
      result = await casFetchData(store, session, control);
    } else {
      let tableSummary = computeSetupTables(store, session, table);
      let r  = await computeFetchData(store, tableSummary, table, null,icontrol);
      result = r.rows;
    }
  }  else {
    result = await scrollTable(null, appEnv, icontrol);
  }
  return result;
}

export default fetchRows;
