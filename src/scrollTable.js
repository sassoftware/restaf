/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { computeFetchData, casFetchRows } from '@sassoftware/restaflib';
import prepFormData from './prepFormData';
/**
 * @description Simplify scrolling using next|prev|top
 * @async
 * @module scrollTable
 * @category restafedit/core
 * @param {string} direction direction(next|prev|first)
 * @param {appEnv} appEnv
 * @param {object=} payload  override pogination with custom scrolling
 * @returns {promise}  result ready for display or null if it did not scroll
 * @example
 *  let r = await scrollTable('next', appEnv);
 *    r=== { data:data, columns: ecolumns}
 *
 *  if ( r === null) {
 *     handle when no data was retrieved
 *  } else {
 *     handle new data
 * }
 *
 * init handler(if specified) will be executed for each row.
 *
 * Make sure you handle exceptions that are thrown.The library does not handle those and
 * assumes some higher level code will have a catch
 *
 * For custom scrolling, pass the scrolling information in the optional third parameter.
 * The content of the payload depends on whether the source is cas or compute.
 * For compute see the documentation for rowset in compute service.<https://developer.sas.com/apis/rest/Compute/#get-a-row-set-from-a-data-set>
 * CAS payload is not as rich the rowset for compute service
 * At this time the cas is handled thru custom casl code.
 * Future: use rowset from data management API.
 * The payload for CAS is as follows
 *  { qs: {
 *       start: <number>
 *       limit: <number>
 *       format: true|false,
 *       where: <where string>
 * };
 *
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function scrollTable (direction, appEnv, payload) {
  let fetchResults;
  if (appEnv.source === 'cas') {
    fetchResults = await icasScroll(direction, appEnv, payload);
  } else {
    fetchResults = await icomputeScroll(direction, appEnv, payload);
  }
  return fetchResults;
}

async function icasScroll (direction, appEnv, payload) {
  const { store, session } = appEnv;
  const { initialFetch, table } = appEnv.appControl;
  const cachePolicy = (appEnv.appControl.cachePolicy == null) ? true : appEnv.appControl.cachePolicy;
  let control;

  if (payload != null) {
    control = { ...payload };
  } else {
    if (direction === 'first') {
      control = { ...initialFetch };
    } else if (direction !== null) {
      control = { ...appEnv.state.pagination[direction] };
      if (control.next === -1 || control.from <= 0) {
        return null;
      }
    }
  }

  // Need to do this until we change resaflib..

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

  c.table = table;
  const r = await casFetchRows(store, session, c);

  let t = null;
  if (r !== null) {
    t = await prepFormData(r.data, appEnv);
    appEnv.state = {
      modified   : [],
      pagination : { ...r.pagination },
      currentPage: control,
      data       : [],
      columns    : []
    };
    if (cachePolicy === true) {
      appEnv.state.data = t.data;
      appEnv.state.columns = t.columns;
    }
    t.pagination = { ...r.pagination };
    return t;
  }
}

async function icomputeScroll (direction, appEnv, payload) {
  const { store, tableSummary } = appEnv;
  const { table, initialFetch } = appEnv.appControl;
  const cachePolicy = (appEnv.appControl.cachePolicy == null) ? true : appEnv.appControl.cachePolicy;
  let control = null;

  const tname = `${table.libref}.${table.name}`.toLowerCase();

  if (payload == null) {
    if (direction === 'first') {
      control = { ...initialFetch };
    }
  } else {
    control = { ...payload };
  }

  // eslint-disable-next-line prefer-const

  const data = await computeFetchData(store, tableSummary, tname, direction, control);

  let result = null;
  if (data !== null) {
    result = await prepFormData(data, appEnv);
    appEnv.state = {
      modified   : [],
      pagination : {},
      currentPage: {},
      data       : [],
      columns    : []
    };
    if (cachePolicy === true) {
      appEnv.state.data = result.data;
      appEnv.state.columns = result.columns;
    }
  }

  return result;
}

export default scrollTable;
