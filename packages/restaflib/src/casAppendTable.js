/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import caslRunBase from './caslRunBase';
import casSaveTable from './casSaveTable';
import programs from './programs';
/** 
* @description Append a cas table to a master cas table 
* @async
* @module casAppendTable
* @category restaflib/cas
* @param {store} store   - store
* @param {rafObject} session - cas session
* @param {casTable} input Input table with new rows {caslib: xxx, name: nnn}
* @param {casTable} output  Master table {caslib: xxx, name: nnn}
* @param {boolean}  saveflag If true the master table will be saved to disk
* @param {*} payload -
* @returns {promise} - return 
* @example
*    let status = restaflib.casAppendTable(store, session, 'casuser.temp', 'public.master', true));
*   
*/
async function casAppendTable (store, session, input, output, save){
    let src    = programs['commonCasl']() + ' ' +  programs['casAppendTable']();
    let args = {
        masterTable: output,
        setTable   : input,
        save       : (save != null) ? save : false
    };
    let result = await caslRunBase(store, session, src, args);
    let r = result.items('results', 'casResults').toJS();

    if (save === true) {
        await casSaveTable(store, session, output );
    }
    return r;    
}
export default casAppendTable;
