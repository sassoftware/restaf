/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let fs = require('fs').promises;

/**
 * @description upload different artifacts
 * @private
 * @async
 * @module computeUpload
 * @param {store} store 
 * @param {rafobject} columns compute session 
 * @param {object} columns 
 * @param {computeTable} output 
 * @param {array} csv   an array of comma seperated strings  
 * @returns {promise}
 */
async function computeUpload (store, session, columns, output, altSrc){
    // parse source file to figure out what we are uploading
    let table = output;
    if (typeof output === 'object'){
       table = `${output.caslib}.${output.name}`;
    };

    return {msg: "To be implemented", statusCode: 0};
}
export default computeUpload;
