/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { computeFetchData, casFetchData} from '@sassoftware/restaflib';
import prepFormData from './prepFormData';
/**
 * @description Simplify scrolling using next|prev|top
 * @async
 * @module scrollTable
 * @category restafedit/fetch
 * @param {string} direction direction(next|prev|first)
 * @param {appEnv} appEnv
 * @returns {promise}  result ready for display or null if it did not scroll
 * @example
 *  see fetchRows for custom fetching
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
  ;
  return fetchResults;
}
async function icasScroll (direction, appEnv, payload) {
  const { store, session } = appEnv;
  const { initialFetch, table } = appEnv.appControl;
  const cachePolicy = (appEnv.appControl.cachePolicy == null) ? true : appEnv.appControl.cachePolicy;
  let control = {...initialFetch.qs};

  if (payload != null) {
    control = {...control, ...payload.qs };
    if (control.format == null) {
      control.format = false;
    }
    if (control.where == null) {
      control.where = ' ';
    }
  } else {
    if (direction === 'first') {
      control = { ...initialFetch.qs };
    } else if (direction !== null) {
      const cs = appEnv.state.pagination[direction];
      console.log('cs===', cs);
      if (cs == null) {
        // eslint-disable-next-line no-throw-literal
        throw `Invalid scroll direction ${direction}`;
      }
      console.log('cs=', cs);
      control = { ...cs };
    }
    control.where = appEnv.activeWhere;
  }
  control.table = table;
  try {
    debugger;
    const r = await casFetchData(store, session, control);
    const result = await prepFormData(r.data, appEnv);
    
    appEnv.fetchCount = result.data.length;
    if (appEnv.fetchCount > 0) {
      appEnv.state = {
        cache        : result.cache,
        modified     : [],
        pagination   : { ...r.pagination },
        data         : result.data,
        columns      : result.columns,
        point        : setPoint(r.data.scrollOptions),
        scrollOptions: [].concat(r.data.scrollOptions)
      };
      /*
      if (cachePolicy === true) {
        appEnv.state.data = result.data;
        appEnv.state.columns = result.columns;
      }
      */
    } else {
      if (appEnv.onNoData !== 'keep') {
        appEnv.state.data = [];
      }
    }
    ;
    return result;
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
  const tname = `${table.libref}.${table.name}`.toLowerCase();

  let control = {};

  console.log('payload=', payload);
  /*Treat direction of first as a special case, ignore payload*/
  if (direction === 'first') {/*Treat direction of first as a special case, ignore payload*/
    control = { ...initialFetch };
  } else if (direction !== null) {  /* following normal scroll patterns */
    control = {qs:{}};/* just use what is in the scroll options */
  } else { /* custom scrolling - just honor what is there */
    control = (payload != null) ? { ...payload } : {qs:{}};
  }
    
  if (appEnv.activeWhere != null) { /* add where processing */
    control.qs.where = appEnv.activeWhere;
  }
  control.qs.includeIndex = true;
  let r = null;
  // control.qs.includeIndex = (control.qs.includeIndex == null) ? false : control.qs.includeIndex;
  control.qs.includeIndex = true; /* force to include index */
  try {
    debugger;
    r = await computeFetchData(store, tableSummary, tname, direction, control, 'rows');
    debugger;
  } catch (err) {
    appEnv.state.data = [];
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: Fetch failed. See console for logs';
  }

  let result = null;

  if (r !== null) {
    debugger;
    result = await prepFormData(r, appEnv);
    appEnv.fetchCount = result.data.length;

    if (appEnv.fetchCount > 0) {
      appEnv.state = {
        cache        : result.cache,
        modified     : [],
        pagination   : {...r.pagination},
        data         : result.data,
        columns      : result.columns,
        point        : setPoint(r.scrollOptions),
        scrollOptions: [].concat(r.scrollOptions)
      };
      /*
      if (cachePolicy === true) {
        appEnv.state.data = result.data;
        appEnv.state.columns = result.columns;
      }
      */
    } else {
      appEnv.fetchCount = 0;
      if (appEnv.onNoData !== 'keep') {
        appEnv.state.data = [];
      }
    }
  } else {
    appEnv.fetchCount = 0;
    if (appEnv.onNoData !== 'keep') {
      appEnv.state.data = [];
    }
  }

  return result;
}

function setPoint (scrollOptions) {
  let point;
  if (scrollOptions.length === 0) {
    point = 'all';
  } else if (scrollOptions.indexOf('prev') < 0) {
    point = 'BOF';
  } else if (scrollOptions.indexOf('next') < 0) {
    point = 'EOF';
  }
  return point;
}
export default scrollTable;

//make sure to pass filter setup to override the scroll options
    /*
    if (payload == null) {
      control = { qs: qs };
    } else {
      control = { qs: { ...qs, ...payload.qs } };
    }
    */