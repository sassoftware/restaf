/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/** 
 * lib
 */
 import caslRunBase from './caslRunBase';
 import programs from './programs';
/**
 * @private
 * @description Fetch rows from cas Tables
 * 
 * @async
 * @module casFetchData
 * @category restaflib/cas
 * @param {store}    store    - restaf store
 * @param {rafObject}  session  - cas session
 * @param {object}    payload  - info to read data
 * @returns {promise} returns data and data for scrolling.
 * 
 * @example
 *  async function test_casFetchData () {
 *    let {session} = await casSetup(store);
 *    let payload = {
 *     from  : 1,
 *     count : 20,
 *     format: true,
 *     where :  <string>
 *     table : {caslib: 'Public', name: 'cars'}
 *    };
 * 
 *   let result = await restaflib.casFetchData(store, session, payload);
 *   console.log(result.data.schema);
 *   console.log('The next start is at:' + result.pagination.next.from);
 *   console.log(result.data.rows[0].toString());
 * 
 *   while (result.pagination.next.from !== -1) {
 *     console.log('The start is at: ' + result.pagination.next.from);
 *     result = await restaflib.casFetchData(store, session, result.pagination.next);
 *     console.log('The next start is at:' + result.pagination.next.from);
 *     console.log(result.data.rows[0].toString());
 *   };
 *   console.log('--------------------------------------- scroll backwards');
 *
 *   while (result.pagination.prev.from !== -1) {
 *     console.log('The start is at: ' + result.pagination.prev.from);
 *     result = await restaflib.casFetchData(store, session, result.pagination.prev);
 *     console.log('The previous start is at: ' +  result.pagination.prev.from);
 *     console.log(result.data.rows[0].toString());
 *   };
 *
 *   await store.apiCall(session.links('delete'));
 * }
 */


async function casFetchData (store, session, payload){
    let src    = programs['commonCasl']() + ' ' +  programs['casFetchData']();
    let result = await caslRunBase(store, session, src, payload);
    return result.items('results', 'casResults').toJS();    
}
export default casFetchData;
