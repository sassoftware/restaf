/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

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
async function computeUpload (store, session, table, csvArray, columns){
  let src = `data ${table.libref}.${table.name}; INFILE datalines delimiter=',' ;\n`;
  let l = '';
  let inx = 'INPUT ';
  for (const k in columns) {
    const c = columns[k];
    inx = inx + c.Column + ' ';
    if (c.Type === 'CHAR') {
      const x = ` ${c.Column} $ ${c.length} \n`;
      l = l + ' ' + x;
    }
  }
  if (l.length > 0) {
    l = 'LENGTH ' + l + ';\n';
  };
  inx = inx + ';\n';

  src = src + ';\n' + l + inx + 'datalines;\n' + csvArray + '\n; run; proc print;run;\n';
  await computeRun(store, session, src);
  return { msg: 'done', statusCode: 0 };
  }
 
export default computeUpload;
