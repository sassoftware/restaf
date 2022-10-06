/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { computeFetchData, casRowSets } from '@sassoftware/restaflib';
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
  const useEntry = (appEnv.source === 'cas') ? icasScroll : icomputeScroll;
  const fetchResults = await useEntry(direction, appEnv, payload);
  return fetchResults;
}

async function icasScroll (direction, appEnv, payload) {
  const { store, session } = appEnv;
  const { initialFetch, table } = appEnv.appControl;
  const cachePolicy = (appEnv.appControl.cachePolicy == null) ? true : appEnv.appControl.cachePolicy;
  let control;

  if (payload != null) {
    control = { ...payload.qs };
    if (control.where == null) {
      control.where = ' ';
    }
  } else {
    if (direction === 'first') {
      control = { ...initialFetch.qs };
    } else if (direction !== null) {
      debugger;
      control = { ...appEnv.state.pagination[direction] };
    }
    control.where = appEnv.activeWhere;
  }

  debugger;
  control.table = table;
  console.log(control);
  debugger;

  try {
    debugger;
    const r = await casRowSets(store, session, control);
    debugger;
    let t = null;
    if (r !== null) {
      t = await prepFormData(r.data, appEnv);
      appEnv.state = {
        modified  : [],
        pagination: { ...r.pagination },
        data      : [],
        columns   : []
      };
      if (cachePolicy === true) {
        appEnv.state.data = t.data;
        appEnv.state.columns = t.columns;
      }
      return t;
    }
  } catch (err) {
    console.log(err);
    appEnv.state.data = [];
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: Fetch failed. See console for logs';
  }
}

async function icomputeScroll (direction, appEnv, payload) {
  const { store, tableSummary } = appEnv;
  const { table, initialFetch } = appEnv.appControl;
  const cachePolicy = (appEnv.appControl.cachePolicy == null) ? true : appEnv.appControl.cachePolicy;
  let control = null;
  const tname = `${table.libref}.${table.name}`.toLowerCase();
  debugger;
  if (payload == null) {
    if (direction === 'first') {
      control = { ...initialFetch };
    }
  } else {
    control = { ...payload };
  }
  if (appEnv.activeWhere != null) {
    control.qs.where = appEnv.activeWhere;
  };

  // eslint-disable-next-line prefer-const

  let data = null;
  debugger;
  try {
    debugger;
    data = await computeFetchData(store, tableSummary, tname, direction, control);
    debugger;
  } catch (err) {
    console.log(err.toJS());
    appEnv.state.data = [];
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: Fetch failed. See console for logs';
  }

  let result = null;
  console.log('------ ', data);
  debugger;
  if (data !== null) {
    result = await prepFormData(data, appEnv);
    appEnv.state = {
      modified  : [],
      pagination: {},
      data      : [],
      columns   : []
    };
    if (cachePolicy === true) {
      appEnv.state.data = result.data;
      appEnv.state.columns = result.columns;
    }
  } else {
    console.log('setting state data to zero length');
    debugger;
    appEnv.state.data = [];
  }

  return result;
}

export default scrollTable;
