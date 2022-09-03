/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import text2Float from './text2Float';
import commonHandler from './commonHandler';
import updateTableRows from './updateTableRows';

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
 * const r = await cellEdit'x1',100, 1, d)
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function cellEdit (name, value, rowIndex, currentData, appEnv) {
  /* do not modify the data directly. caller will probably do a setState */

  let newDataRow = { ...currentData };
  const columns = appEnv.state.columns;
  const { handlers, autoSave } = appEnv.appControl.editControl;

  newDataRow[name] = text2Float(value, columns[name]);
  let status = { statusCode: 0, msg: '' };

  if (handlers[name] != null) {
    const r = await handlers[name](newDataRow, name, rowIndex, appEnv);
    newDataRow = r[0];
    status = r[1];
    if (status.statusCode === 2) {
      return { data: r[0], status };
    }
  }
  let r = await commonHandler('main', newDataRow, rowIndex, appEnv);
  if (autoSave === true) {
    r = await commonHandler('term', r[0], rowIndex, appEnv);
    status = r[1];
    if (status.statusCode === 2) {
      return { data: r[0], status };
    }
    status = await updateTableRows(r[0], appEnv);
  }
  newDataRow = r[0];

  if (appEnv.appControl.cachePolicy === true) {
    appEnv.state.data[currentData._rowIndex] = newDataRow;
  }

  return ({ data: newDataRow, status });
}
export default cellEdit;
