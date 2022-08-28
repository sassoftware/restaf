/* eslint-disable no-tabs */
/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casUpload, casAppendTable } from '@sassoftware/restaflib';

/**
 * @description Get unique values for a specific column
 * @async
 * @module uploadData
 * @category restafedit/core
 * @param {object} output table
 * @param {array}  data
 * @param {array}  drop fields to delete
 * @param {object} addon columns
 * @param {appEnv} appEnv   - app Environment from setup
 * @param {object=} masterTable if specified the data will be appended to this table
 * @param {boolean} saveFlag if true, the masterTable will be saved
 * @returns {promise}       - {an array of unique values }
 * @example
 *  let selectList = await distinctValues('company', appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {company:['IBM', 'Microsoft', 'SAS'] }
 */

async function uploadData (table, data, drop, addon, appEnv, masterTable, saveFlag) {
  const { store, session } = appEnv;
  debugger;
  let t = data[0];
  for (let j = 0; j < drop.length; j++) {
    delete t[drop[j]];
  }
  t = { ...addon, ...t };
  const columns = Object.keys(t);

  let csvArray = columns.join(',') + '\n';
  debugger;
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
    csvArray = csvArray + valArray.join(',') + '\n';
  }
  debugger;
  console.log(csvArray);
  console.log(casUpload);
  console.log(_casTableUpload);
  let result;
  if (appEnv.source === 'cas') {
    debugger;
    result = await _casTableUpload(
      store,
      session,
      table,
      csvArray,
      masterTable,
      saveFlag
    );
  } else {
    result = {};
  }
  debugger;
  // console.log(result.items().toJS());
  return result;
}

async function _casTableUpload (store, session, table, csvArray, masterTable, saveFlag) {
  debugger;
  console.log('calling casUpload');
  const t = `${table.caslib}.${table.name}`;
  // upload the table (with replace option)
  let r = await casUpload(store, session, null, t, true, csvArray);
  console.log('end of casUpload');
  debugger;
  if (masterTable != null) {
    debugger;
    r = await casAppendTable(store, session, table, masterTable, saveFlag);
    return r;
  }
}
export default uploadData;
