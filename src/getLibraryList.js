/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description get the list of tables in a caslib
 * @async
 * @module getLibraryList
 * @category restafedit/utility
 * @param {appEnv} appEnv
 * @returns {promise}   returns a list of caslib or libref based on source
 * @example
 *  let list = await getLibraryList(appEnv);
 *  If the source is cas, the method returns a list of caslibs
 *  If the source is compute, the method returns a list of librefs
 */

async function getLibraryList (appEnv) {
  const { store, session, servers, source } = appEnv;

  const getLibrefs = async () => {
    const p = {
      qs: {
        start: 0,
        limit: 100
      }
    };
    const r = await store.apiCall(session.links('librefs'), p);
    return r.itemsList().toJS();
  };

  const getCaslibs = async () => {
    const p = {
      qs: {
        start: 0,
        limit: 100
      }
    };
    const rafLink = servers.itemsCmd(servers.itemsList(0), 'caslibs');
    const r = await store.apiCall(rafLink, p);
    return r.itemsList().toJS();
  };

  const handler = (source === 'cas') ? getCaslibs : getLibrefs;
  const libs = await handler(appEnv);
  return libs;
}

export default getLibraryList;
