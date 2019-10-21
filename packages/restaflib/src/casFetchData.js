/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/** 
 * lib
 */
/**
 *
 * Fetch rows from cas Tables
 * 
 * @async
 * @module casFetchData
 * 
 * @param {object} store    - restaf store
 * @param {object} session  - cas session
 * @param {object} table    - table {caslib: x, name: y}
 * @param {object} control  - what to read {from: n, count:n , format: true|false}
 * @returns {object}   see doc. {pagination information and data}
 */
import caslRunBase from './caslRunBase';
import programs from './programs';

async function casFetchData (store, session, table, control){
    debugger;
    let src    = programs['commonCasl']() + ' ' +  programs['casFetchData']();
    debugger;
    let appEnv = {...control, table};
    let result = await caslRunBase(store, session, src, appEnv);
    debugger;
   // console.log(JSON.stringify(result.items(), null,4));
    return result.items('results', 'casResults').toJS();    
}
export default casFetchData;
