/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import text2Float from './text2Float';
import commonHandler from './commonHandler';
import updateTableRows from './updateTableRows';
import handlerResult from './handlerResult';
import saveTable from './saveTable';

/**
 * @description Process edit of a cell and optionally save the data
 * @async
 * @module cellEdit
 * @category restafedit/core
 * @param {string} name     - name of the field (lower case)
 * @param {*} value         - the new value for name field
 * @param {number} rowIndex - row Index ( index in the data array on client)
 * @param {rowObject} currentData  - RowObject for the entire row prior to change
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - {data: updated data, status: status }
 * @example
 * data schema {column1: value, column2, value,...}
 * status schema {statusCode: 0|1|2, msg: some string}
 * The currentData object is also updated with the latest values.
 *
 * const r = await cellEdit'x1',100, 1, d, appEnv)
    - If the column has an handler it will be called.
    - If 'main" handler is specified, it will be called.
    - If autoSave is true
      - The 'term' handler(if specified) will be called
      - The data for that row will be persisted to the server
 */
async function cellEdit (name, value, rowIndex, currentData, appEnv) {
  /* do not modify the data directly. caller will probably do a setState */

  let newDataRow = { ...currentData };
  const columns = appEnv.state.columns;
  const { handlers, autoSave } = appEnv.appControl.editControl;
  const iautoSave = (autoSave == null) ? true : autoSave;
  const cachePolicy = (appEnv.appControl.cachePolicy == null) ? true : appEnv.appControl.cachePolicy;

  let status = { statusCode: 0, msg: '' };
  if ( name != null ) {
    newDataRow[name] = text2Float(value, columns[name]);
    if (handlers[name] != null) {
      let r1 = await handlers[name](newDataRow, name, rowIndex, appEnv);
      let r = handlerResult(r1, newDataRow, name, status);
      newDataRow = r[0];
      status = r[1];
      if (status.statusCode === 2) {
        return { data: r[0], status };
      }
    }
  } else {
    let r1 = await commonHandler('init', newDataRow, rowIndex, appEnv, status);
  }

  let r = await commonHandler('main', newDataRow, rowIndex, appEnv, status);
 //  r = handlerResult(r, newDataRow, null, status);
  status = r[1];
  if (status.statusCode === 2) {
    return { data: r[0], status: r[1] };
  }
  r[0]._modified = 1;
  if (iautoSave === true && appEnv.table != null) {
    r = await commonHandler('term', r[0], rowIndex, appEnv, status);
   // r = handlerResult(r, newDataRow, null, status);
    status = r[1];
    if (status.statusCode === 2) {
       return { data: r[0], status: r[1] };
    }

    await updateTableRows(r[0], appEnv);
    if (appEnv.appControl.editControl.autoSaveTable === true) {
      saveTable(appEnv);
    }
   // r[0]._modified = 0;
  } 
  newDataRow = r[0];
  if (cachePolicy === true) {
    appEnv.state.data[currentData._rowIndex] = newDataRow;
  }
  return ({ data: newDataRow, status });
}
export default cellEdit;
