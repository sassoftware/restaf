/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casFetchRows, computeFetchData } from '@sassoftware/restaflib';

import prepFormData from './prepFormData';
/**
 * @description Fetch new records based on control argument
 * @async
 * @module fetchTableRows
 * @category restafedit/core
 * @param {fetchControl} control - info for records to retrieve
 * @param {appEnv} appEnv - appEnv
 * @returns {promise}  - { data:data, columns:ecolumns, pagination: pagination}
 * @example
 *   let control = {from: 10, count:50, format: false};
 *   let r = await fetchTableRows(control, appEnv);
 *   r is a fetchResult object
 *
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function fetchTableRows (control, appEnv) {
  let result = null;
  if (appEnv.source === 'cas') {
    result = await icasRows(control, appEnv);
  } else {
    result = await icomputeRows(control, appEnv);
  }
  return result;
}

async function icasRows (control, appEnv) {
  const { store, session } = appEnv;
  const c = { ...control };
  if (c.table == null) {
    c.table = appEnv.appControl.table;
  }
  if (c.where == null) {
    c.where = {};
  }
  if (c.from <= 0 || c.next === -1) {
    return null;
  }
  
  const r = await casFetchRows(store, session, c);
  
  let t = null;
  if (r !== null) {
    
    t = await prepFormData(r.data, appEnv);

    appEnv.state = {
      modified   : [],
      pagination : { ...r.pagination },
      currentPage: c,
      data       : [],
      columns    : []
    };
    if (appEnv.appControl.cachePolicy === true) {
      appEnv.state.data = t.data;
      appEnv.state.columns = t.columns;
    }
    t.pagination = { ...r.pagination };
  }
  return t;
}

async function icomputeRows (control, appEnv) {
  const { store, tableSummary } = appEnv;
  const { table } = appEnv.appControl;
  const tname = `${table.libref}.${table.name}`.toLowerCase();
  // eslint-disable-next-line prefer-const
  let payload = {
    qs: {
      start : control.from - 1,
      limit : control.count,
      format: (control.format != null) ? false : control.format
    }
  };
  const data = await computeFetchData(store, tableSummary, tname, null, payload);
  ;

  let result = null;
  if (data !== null) {
    result = await prepFormData(data, appEnv);
    appEnv.state = {
      modified   : [],
      pagination : {},
      currentPage: {},
      data       : result.data,
      columns    : result.columns
    };
  }
  return result;
}
export default fetchTableRows;
