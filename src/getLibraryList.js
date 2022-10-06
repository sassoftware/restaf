/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description get the list of tables in a caslib
 * @async
 * @module getLibraryList
 * @category restafedit/utility
 * @params {appEnv} appEnv
 * @returns {promise}   returns a list of caslib or libref based on source
 * @example
 *
 */

async function getLibraryList (appEnv) {
  const { store, session, servers, source } = appEnv;

  const getLibrefs = async () => {
    const p = {
      qs: {
        start: 0,
        limit: 1000
      }
    };
    const r = await store.apiCall(session.links('librefs'), p);
    return r.itemsList().toJS();
  };

  const getCaslibs = async () => {
    const p = {
      qs: {
        start: 0,
        limit: 1000
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
