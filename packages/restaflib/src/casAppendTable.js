/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import caslRunBase from './caslRunBase';
import casSaveTable from './casSaveTable';
import programs from './programs';
async function casAppendTable (store, session, input, output, save){
    debugger;
    let src    = programs['commonCasl']() + ' ' +  programs['casAppendTable']();
    let args = {
        masterTable: output,
        setTable   : input,
        save       : (save != null) ? save : false
    };

    let result = await caslRunBase(store, session, src, args);
    let r = result.items('results', 'casResults').toJS();

    if (save === true) {
        await casSaveTable(store, session, output.caslib, output.name );
    }
    return r;    
}
export default casAppendTable;
