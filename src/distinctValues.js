/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import casTableUnique from './casTableUnique';
import sasTableUnique from './sasTableUnique';

/**
 * @description Get unique values for a specific column
 * @async
 * @private
 * @module distinctValues
 * @category restafedit/core
 * @param {object} table {caslib: xxx, name: yyy}
 * @param {string} columnName    column name
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - {an array of unique values }
 * @example
 *  let selectList = await distinctValues('company', appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {company:['IBM', 'Microsoft', 'SAS'] }
 */

async function distinctValues (table, columnName, appEnv, payload) {
  let data;
  if (appEnv.source === 'cas') {
    data = await casTableUnique(table, columnName, appEnv, payload);
  } else {
    data = await sasTableUnique(table, columnName, appEnv, payload);
  }
  return data;
};
export default distinctValues;
