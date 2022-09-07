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
 * @param {rafobject} session compute session 
 * @param {computeTable} table - name of table to be created
 * @param {object} data - rows of data objects
 * @param {object} columns columns
 * @returns {promise}
 */
async function computeUpload (store, session, table, data, columns){
   // move the code from restafedit after further testing...
   return {msg: 'Placeholder', statusCode: 0};
  }
 
export default computeUpload;
