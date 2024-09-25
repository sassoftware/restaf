/* eslint-disable no-tabs */
/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casUpload, casAppendTable, casLoadTable, computeRun } from '@sassoftware/restaflib';

/**
 * @description Upload client data to a new table on server
 * @async
 * @module uploadData
 * @category restafedit/dataMgmt
 * @param {object} output table
 * @param {array}  data if null, data from appEnv.state will be uploded.
 * @param {array}  drop fields to drop from the output
 * @param {object} addon columns additional columns(useful for adding key fields)
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - returns status object
 * @example
 *  let r = await uploadData({caslib:...}, null, ['total], {version: 10}, appEnv)
 */

async function uploadData (table, data, drop, addon, appEnv, masterTable, saveFlag) {
  const { store, session } = appEnv;
  // eslint-disable-next-line prefer-const
  if (data === null) {
    data = appEnv.state.data;
  };
  ;
  const t = Object.keys(data[0]);
  let dropArray = ['_index_', '_rowIndex', '_modified'];
  if (drop !== null && drop.length > 0) {
    dropArray = dropArray.concat(drop);
  }
  const columns = t.filter(c => {
    return !(dropArray.indexOf(c) >= 0);
  });
  
  const tempCols = {};
  columns.forEach(k => {
    tempCols[k] = appEnv.state.columns[k];
  });
  let csvArray = null;
  if (appEnv.source === 'cas') {
    csvArray = columns.join(',') + '\n';
  };

  for (let i = 0; i < data.length; i++) {
    let temp = data[i];
    temp = { ...temp, ...addon };
    const valArray = [];
    columns.forEach((c, l) => {
      let v = temp[c];
      if (typeof v === 'string') {
        v = v.trim();
      }
      valArray[l] = v;
    });
    if (csvArray === null) {
      csvArray = valArray.join(',') + '\n';
    } else {
      csvArray = csvArray + valArray.join(',') + '\n';
    }
  }

  let result;
  if (appEnv.source === 'cas') {
    result = await _casTableUpload(
      store,
      session,
      table,
      csvArray,
      masterTable,
      saveFlag
    );
  } else {
    result = await _computeUpload(
      store,
      session,
      tempCols,
      table,
      csvArray
    );
  }
  return result;
}

// TBD: switch to a datastep with arrays for each column. More reliable
async function _computeUpload (store, session, columns, table, csvArray) {
  let src = `data ${table.libref}.${table.name}; INFILE datalines delimiter=',' ;\n`;
  let l = '';
  let inx = 'INPUT ';
  for (const k in columns) {
    const c = columns[k];
    inx = inx + c.Column + ' ';
    if (c.Type === 'string') {
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
async function _casTableUpload (store, session, table, csvArray, masterTable, saveFlag) {
  const t = `${table.caslib}.${table.name}`;
  let r = await casUpload(store, session, null, t, true, csvArray);

  await casLoadTable(store, session, table);
  if (masterTable != null) {
    r = await casAppendTable(store, session, table, masterTable, saveFlag);
    return r;
  } else {
    return r;
  }
}
export default uploadData;
