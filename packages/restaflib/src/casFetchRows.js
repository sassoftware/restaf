/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import caslRunBase from './caslRunBase';
import programs from './programs';
/** 
 * lib
 */
/**
 *
 * @description Fetch rows from cas Tables
 * 
 * @async
 * @module casFetchRows
 * @category restaflib/cas
 * @param {store}    store    - restaf store
 * @param {rafObject}    session  - cas session
 * @param {object}    payload  - info to read data
 * @returns {promise} returns data and data for scrolling.
 * 
 * @example
 *  async function test_casFetchRows () {
 *    let {session} = await casSetup(store);
 *    let payload = {
 *     from  : 1,
 *     count : 20,
 *     format: true,
 *     table : {caslib: 'Public', name: 'cars'}
 *    };
 * 
 *   let result = await restaflib.casFetchRows(store, session, payload);
 *   console.log(result.data.schema);
 *   console.log('The next start is at:' + result.pagination.next.from);
 *   console.log(result.data.rows[0].toString());
 * 
 *   while (result.pagination.next.from !== -1) {
 *     console.log('The start is at: ' + result.pagination.next.from);
 *     result = await restaflib.casFetchRows(store, session, result.pagination.next);
 *     console.log('The next start is at:' + result.pagination.next.from);
 *     console.log(result.data.rows[0].toString());
 *   };
 *   console.log('--------------------------------------- scroll backwards');
 *
 *   while (result.pagination.prev.from !== -1) {
 *     console.log('The start is at: ' + result.pagination.prev.from);
 *     result = await restaflib.casFetchRows(store, session, result.pagination.prev);
 *     console.log('The previous start is at: ' +  result.pagination.prev.from);
 *     console.log(result.data.rows[0].toString());
 *   };
 *
 *   await store.apiCall(session.links('delete'));
 * }
 */


async function casFetchRows (store, session, payload){
    
    if (payload.where == null) {
        payload.where = ' ';
    }
    let src    = programs['commonCasl']() + ' ' +  programs['casFetchRows']();
    
    let result = await caslRunBase(store, session, src, payload);
    let r = result.items('results', 'casResults').toJS();
    console.log(result.items().toJS());
    if ( r.data == null) {
        r.data = {rows: []};
    }
    return r;    
}
export default casFetchRows;
