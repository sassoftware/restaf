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

async function casTableList (lib, appEnv) {
  const { store, servers } = appEnv;
  const casServerx = appEnv.casServerName;
  /*
  const casServer = servers.itemsList(0);
  console.log(appEnv.casServerName);
  console.log(casServer);
  */
  let p = {
    qs: {
      filter: `eq(name,'${lib}' )`
    }
  };
  console.log('p', p);
  console.log('lib', lib);
  console.log('cx: ' , casServerx);
  let t = servers.itemsCmd(casServerx, 'caslibs')
  const mylib = await store.apiCall(servers.itemsCmd(casServerx, 'caslibs'), p);
  p = {
    qs: {
      limit: 1000,
      start: 0
    }
  };

  if (mylib.itemsList().size === 0) {
    console.log('no items found for ' + lib );
    return [];
  } else {
    const tlist = await store.apiCall(mylib.itemsCmd(lib, 'tables'), p);
    return tlist.itemsList().toJS();
  }
}
export default casTableList;
