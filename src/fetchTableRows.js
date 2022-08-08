/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casFetchRows } from '@sassoftware/restaflib';
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
  const { store, session } = appEnv;
  // eslint-disable-next-line no-useless-catch
  const c = { ...control };
  if (c.table == null) {
    c.table = appEnv.appControl.dataControl.table;
  }
  if (c.where == null) {
    c.where = {};
  }
  if (c.from <= 0 || c.next === -1) {
    return null;
  }
  const r = await casFetchRows(store, session, c);
  const t = await prepFormData(r.data, appEnv);

  appEnv.state = {
    modified   : [],
    pagination : { ...r.pagination },
    currentPage: c,
    data       : [],
    columns    : []
  };

  if (appEnv.appControl.dataControl.cachePolicy === true) {
    appEnv.state.data = t.data;
    appEnv.state.columns = t.columns;
  }

  t.pagination = { ...r.pagination };
  return t;
}
export default fetchTableRows;
