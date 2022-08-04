/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import fetchTableRows from './fetchTableRows';
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
async function scrollTable (direction,appEnv) {
    const {initialFetch, table} = appEnv.appControl.dataControl;
    
    let control;
    if (direction === 'first') {
        control = {...initialFetch};
        control.table = table;
    } else {
        control = appEnv.state.pagination[direction];
        if (control.next === -1) {
           return null;
        }
    }
    let t = await fetchTableRows(control, appEnv);
    return  t;
        
}
export default scrollTable;
