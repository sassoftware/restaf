/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import fetchTableRows from './fetchTableRows';
import { computeFetchData } from '@sassoftware/restaflib';
import prepFormData from './prepFormData';
/**
 * @description Simplify scrolling using next|prev|top
 * @async
 * @module scrollTable
 * @category restafedit/core
 * @param {string} direction direction(next|prev|first)
 * @param {appEnv} appEnv
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
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function scrollTable (direction, appEnv) {
  let fetchResults;
  if (appEnv.source === 'cas') {
    debugger;
    fetchResults = await icasScroll(direction, appEnv);
    debugger;
  } else {
    fetchResults = await icomputeScroll(direction, appEnv);
  }
  return fetchResults;
}

async function icasScroll (direction, appEnv) {
  const { initialFetch, table } = appEnv.appControl;
  let control;
  if (direction === 'first') {
    control = { ...initialFetch };
    control.table = table;
  } else {
    control = appEnv.state.pagination[direction];
    if (control.next === -1) {
      return null;
    }
  }
  debugger;
  console.log(control);
  const t = await fetchTableRows(control, appEnv);
  debugger;
  return t;
}

async function icomputeScroll (direction, appEnv) {
  const { store, tableSummary } = appEnv;
  const { table } = appEnv.appControl;

  const tname = `${table.libref}.${table.name}`.toLowerCase();

  // eslint-disable-next-line prefer-const

  const payload = { qs: { limit: appEnv.appControl.initialFetch.count } };
  const data = await computeFetchData(store, tableSummary, tname, direction, payload);

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
