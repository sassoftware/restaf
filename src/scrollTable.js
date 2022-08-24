/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// import fetchTableRows from './fetchTableRows';
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
 *
 *  if ( r === null) {
 *     handle when no data was writtten
 *  } else {
 *     handle new data
 * }
 *
 * Make sure you handle exceptions that are thrown.
 *
 * For custom scrolling, pass the scrolling information in the optional third parameter.
 * The content of the payload depends on whether the source is cas or compute.
 * For compute see the documentation for rowset in compute service.<https://developer.sas.com/apis/rest/Compute/#get-a-row-set-from-a-data-set>
 * CAS payload is not as rich the rowset for compute service
 * The payload for CAS is as follows
 *  { start: <number>
 *    count: <number>
 *    format: true|false,
 *    where: <where string>
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
  let control;

  if (direction === 'first') {
    control = { ...initialFetch };
  } else if (direction !== null) {
    control = { ...appEnv.state.pagination[direction] };
    if (control.next === -1 || control.from <= 0) {
      return null;
    }
  }

  if (payload != null) {
    control = { ...payload };
  }

  control.table = table;
  debugger;
  const r = await casFetchRows(store, session, control);

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
    if (appEnv.appControl.cachePolicy === true) {
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
      data       : result.data,
      columns    : result.columns
    };
  }

  return result;
}

export default scrollTable;
