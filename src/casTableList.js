/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description get the list of tables in a caslib
 * @async
 * @module casTableList
 * @private
 * @category restafedit/utility
 * @param {string} lib   - caslib of interest
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - returns an array of table names
 * @example
 *   list = await casTableList('sashelp', appEnv);
 *   This method is primarily useful for UI's that want to display a table selector
 */

async function casTableList (lib, appEnv, payload) {
  const { store} = appEnv;

  // get links for the current caslib
  let p = {
    qs: {
      filter: `eq(name,'${lib}')`
    }
  };
   
  const mylib = await store.apiCall(appEnv.servers.itemsCmd(appEnv.casServerName, 'caslibs'), p);

  // if caslib was not found
  if (mylib.itemsList().size === 0) {
    console.log('caslib not found');
    return [];
  }
  
  p = payload;
  if (p == null) {
    p = {
      qs: {
        limit: 1000,
        start: 0
      }
    };
  }

  const tlist = await store.apiCall(mylib.itemsCmd(lib, 'tables'), p);
  return tlist.itemsList().toJS();
  
}
export default casTableList;
