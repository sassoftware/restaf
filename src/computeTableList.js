/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description get the list of tables in a caslib
 * @async
 * @module computeTableList
 * @private
 * @category restafedit/utility
 * @param {string} lib   - libref of interest
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - returns an array of table names
 * @example
 *  let status = await distinctValues('company', appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {company:['IBM', 'Microsoft', 'SAS'] }
 */

async function computeTableList (lib, appEnv, payload) {
  const { store, session } = appEnv;

  lib = lib.toUpperCase();
  let p = {
    qs: {
      filter: `eq(name,'${lib}')`
    }
  };
  const mylib = await store.apiCall(session.links('librefs'), p);
  
  if (mylib.itemsList().size === 0) {
    console.log('caslib not found');
    return [];
  }
  
  const selflib = await store.apiCall(mylib.itemsCmd(lib, 'self'));
  p = payload;
  if (p == null) {
    p = {
      qs: {
        limit: 1000,
        start: 0
      }
    };
  }

  const tables = await store.apiCall(selflib.links('tables'), p);
  return tables.itemsList().toJS();
}
export default computeTableList;
