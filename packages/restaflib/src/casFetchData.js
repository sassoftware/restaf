/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
 import caslRunBase from './caslRunBase';
 import programs from './programs';
/**
 * @description Fetch rows from cas Tables
 * @async
 * @module casFetchData
 * @category restaflib/cas
 * @param {store}    store    restaf store
 * @param {rafObject}  session  cas session
 * @param {object}    payload   info to read data
 * @returns {promise} returns data and data for scrolling.
 * @example
 * let payload = { start:0, limit:20, format: false, table: {caslib: 'casuser', name: 'sales'}} ;
 * let result = await casFetchData(store, session, payload);
 *   result = {
 *      data : {rows: array of row data,  schema=<schema for table>},
 *      pagination: {next: {<page>}, prev: {<page>}
 *   }
 *   page = {start: <number>, limit: <number>, format: <true:false> table: <caslib: <string>, name:<string>}
 * }
 *  Will return a row of length 0 if no data is found.
 *  Will throw exceptions if cas code fails(ex: fetch action fails)
 */
async function casFetchData (store, session, payload){
    let src    = programs['commonCasl']() + ' ' +  programs['casFetchData']();
    let result = await caslRunBase(store, session, src, payload);
    
    return result.items('results', 'casResults').toJS();    
}
export default casFetchData;
