/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let fs = require('fs').promises;

import  uploadSetup from './uploadSetup';
import { saveTable } from './uploadHandlers';
/**
 * @description upload different artifacts
 * @private
 * @async
 * @module casUpload
 * @param {store} store 
 * @param {*} session 
 * @param {*} source 
 * @param {*} output 
 * @param {*} save 
 * @param {*} altSrc 
 * @returns {promise}
 */
async function casUpload (store, session, source, output,save, altSrc){
    // parse source file to fgure out what we are uploading
    
    let fileInfo = uploadSetup(source, output);
    // read the file

    let buf = (altSrc != null) ? altSrc : await fs.readFile(source, fileInfo.fileOptions);

    // transfrom data if necessary for upload
    if (fileInfo.transform !== null) {
        buf = fileInfo.transform(buf, fileInfo);
    }

    // upload using specific upload handlers
    debugger;
    let r = await fileInfo.handler(store, session, buf, fileInfo, save);
    console.log(r.items().toJS());
    if (save === true) {
        let [caslib, name] = output.split('.');
        await saveTable(store, session, caslib, name);
        r = r + '\n' + `   ${output} was saved`;
    }
    return r;
}
export default casUpload;
