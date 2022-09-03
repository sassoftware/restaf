/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casFetchRows, computeFetchData } from '@sassoftware/restaflib';

import prepFormData from './prepFormData';
/**
 * @description Fetch new records based on control argument
 * @async
 * @private
 * @module fetchTableRows obsolete?
 * @category restafedit/core
 * @param {fetchControl} control - info for records to retrieve
 * @param {appEnv} appEnv - appEnv
 * @returns {promise}  - { data:data, columns:ecolumns, pagination: pagination}
 * @example
 *   let control = {qs: {start:0, limit: 10, format: true, where: 'X1 LT 10'}}
 *   Note: start is really an offset, inspite of its name
 *   For compute: All the payload options for the rowSets end point can be used
 *   At this time only the following are supported for cas tables:
 *   stat, limit, format, where
 *   let r = await fetchTableRows(control, appEnv);
 *   r  = {data: <new data arraY, columns: <columns details}
 *   The results are also saved in Appenv.state if cachePolicy is set to true
 *
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function fetchTableRows (control, appEnv) {
  const result = (appEnv.source === 'cas')
    ? await icasRows(control, appEnv)
    : await icomputeRows(control, appEnv);
  return result;
}

async function icasRows (control, appEnv) {
  const { store, session } = appEnv;
  let c = {};
  if (control.qs != null) {
    c = { ...control.qs };
    c.from = c.start + 1;
    c.count = c.limit;
  } else {
    c = { ...control };
  }
  if (c.from <= 0 || c.next === -1) {
    return null;
  }
  if (c.where == null) {
    c.where = ' ';
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
