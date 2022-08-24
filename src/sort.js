/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description sort data for seelected column
 * @async
 * @module sort
 * @private
 * @category restafedit/core
 * @param {string} columnName    column name
 * @param {string} direction  A|D   (A=ascending, B=descending)
 * @param {array}  data if null, the data cached in appEnv will be used.
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       returns the sorted array
 * @example
 *  let status = await distinctValues('company', appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {company:['IBM', 'Microsoft', 'SAS'] }
 */

async function sort (columnName, appEnv, payload) {
  return [];
};
export default sort;
