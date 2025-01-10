/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import text2Float from "./text2Float";
import commonHandler from "./commonHandler";
import updateTableRows from "./updateTableRows";
import onEditHandler from "./onEditHandler";
import saveTable from "./saveTable";

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

async function cellEdit(...args) {
  if (args.length === 3) {
    let [name, value, appEnv] = args;
    return await icellEdit(name, value, 0, appEnv.state.data[0], appEnv);
  } else if (args.length === 5) {
    let [name, value, rowIndex, currentData, appEnv] = args;
    return await icellEdit(name, value, rowIndex, currentData, appEnv);
  } else {
    return { data: null, status: { statusCode: 2, msg: "Invalid arguments to cellEdit" } };
  }
}
async function icellEdit(name, value, rowIndex, currentData, appEnv) {
  /* do not modify the data directly. caller will probably do a setState */
  debugger;
  let newDataRow = { ...currentData };
  const columns = appEnv.state.columns;
  const { handlers, autoSave } = appEnv.appControl.editControl;
  const iautoSave = autoSave == null ? true : autoSave;
  const cachePolicy =
    appEnv.appControl.cachePolicy == null
      ? true
      : appEnv.appControl.cachePolicy;
  appEnv.handlers = handlers;
  let status = { statusCode: 0, msg: "" };
  debugger;

  // handle init and term for all types of forms
  if (name === "init" || name == null) {  
    let r = await commonHandler("init", newDataRow, rowIndex, appEnv, status);
    return r;
  }

  // Handle term for apps like appBuilder
  if (name === 'term') {
    let r = await commonHandler("term", newDataRow, rowIndex, appEnv, status);
    return r;
  }

  // Handle onEdit for all types of forms - cell calculations + main handler
  debugger;
  newDataRow[name] = text2Float(value, columns[name]);
  debugger;
  if (handlers[name] != null) {
   let r = await onEditHandler(name, newDataRow, rowIndex, appEnv, status);
    debugger;
    newDataRow = r[0];
    status = r[1];
    if (status.statusCode === 2) {
      return { data: r[0], status };
    }
  }
  
  let r = await commonHandler("main", newDataRow, rowIndex, appEnv, status);
  status = r[1];
  r[0]._modified = 1;
  if (status.statusCode === 2) {
    return { data: r[0], status: r[1] };
  }
 
  if (iautoSave === true && appEnv.table != null) {
    r = await commonHandler("term", r[0], rowIndex, appEnv, status);
    status = r[1];
    if (status.statusCode === 2) {
      console.log(status);
      return { data: r[0], status: r[1] };
    }
    await updateTableRows(r[0], appEnv);
    if (appEnv.appControl.editControl.autoSaveTable === true) {
      saveTable(appEnv);
    }
  }


  newDataRow = r[0];

  if (cachePolicy !== false) {
    appEnv.state.data[currentData._rowIndex] = newDataRow;
  }

  return { data: newDataRow, status };
}
export default cellEdit;
