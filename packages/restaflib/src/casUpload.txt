/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import fs from 'fs'; 

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
async function casUpload ( store, session, source, output,save, altSrc ){
    // parse source file to figure out what we are uploading
    const fss = fs.promises
    let table = output;
    
    if ( typeof output === 'object' ) {
       table = `${output.caslib}.${output.name}`;
    }

    let fileInfo = uploadSetup( source, table );
    // read the file

    let buf = ( altSrc != null ) ? altSrc : await fss.readFile( source, fileInfo.fileOptions );

    // transfrom data if necessary for upload
    if ( fileInfo.transform !== null ) {
        buf = fileInfo.transform( buf, fileInfo );
    }

    // upload using specific upload handlers
    
    let r = await fileInfo.handler( store, session, buf, fileInfo, save );
    if ( save === true ) {
        let [ caslib, name ] = table.split( '.' );
        await saveTable( store, session, caslib, name );
        r = r + '\n' + `   ${output} was saved`;
    }
    return r;
}
export default casUpload;
