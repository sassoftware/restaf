/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import casTableUnique from './casTableUnique';
import computeTableUnique from './computeTableUnique';

/**
 * @description Get unique values for a specific column
 * @async
 * @module distinctValues
 * @category restafedit/utility
 * @param {string} columnName    column name
 * @param {appEnv} appEnv   - app Environment from setup
 * @param {casTable|computeTable=} table Optionally point to a different table
 * @returns {promise}       - {an array of unique values }
 * @example
 *  let selectList = await distinctValues('company', appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {company:['IBM', 'Microsoft', 'SAS'] }
 */

async function distinctValues (columnName, appEnv, table) {
  let data;
  const t = (table != null) ? table : appEnv.appControl.table;
  if (appEnv.source === 'cas') {
    data = await casTableUnique(t, columnName, appEnv);
  } else {
    data = await computeTableUnique(t, columnName, appEnv);
  }
  return data;
};
export default distinctValues;
