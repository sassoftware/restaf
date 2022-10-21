/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import scrollTable from './scrollTable';
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
async function fetchRows (control, appEnv) {
  const result = await scrollTable(null, appEnv, control);
  return result;
}

export default fetchRows;
