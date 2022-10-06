/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
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
 *
 */

async function casTableList (lib, appEnv) {
  const { store, servers } = appEnv;
  const casServer = servers.itemsList(0);

  let p = {
    qs: {
      filter: `eq(name,'${lib}' )`
    }
  };
  const mylib = await store.apiCall(servers.itemsCmd(casServer, 'caslibs'), p);
  p = {
    qs: {
      limit: 1000,
      start: 0
    }
  };

  const tlist = await store.apiCall(mylib.itemsCmd(lib, 'tables'));
  return tlist.itemsList().toJS();
}
export default casTableList;
