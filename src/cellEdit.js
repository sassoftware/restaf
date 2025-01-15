/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import text2Float from "./text2Float";
import commonHandler from "./commonHandler";
import updateTableRows from "./updateTableRows";
import onEditHandler from "./onEditHandler";
import saveTable from "./saveTable";
import validateValueType from "./validateValueType";

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

async function cellEdit(name, value, rowIndex, _icurrentData, appEnv) {
  /* do not modify the data directly. caller will probably do a setState */
  debugger;
  // make a copy for modification - allows for recovery if there is an error
  let currentData = appEnv.state.data[rowIndex];
  // all modifications in newDataRow
  let newDataRow = Object.assign({}, currentData);
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
  // user will edit newData in place.
  if (name === "init" || name == null) {  
    let r = await commonHandler("init", newDataRow, currentData, rowIndex, appEnv, status);
    return { data: r[0], status: r[1] };
  }

  // Handle term for apps like appBuilder
  if (name === 'term') {
    let r = await commonHandler("term", newDataRow, currentData, rowIndex, appEnv, status);
    return { data: r[0], status: r[1] };
  }

  // Handle onEdit for all types of forms - cell calculations + main handler
  debugger;

  // is it a valid column name?
  if (columns[name] == null) {
    return { data: appEnv.state.data, status: { statusCode: 2, msg: `Column ${name} not found` } };
  }

  // is it a valid value for the column type
  if (validateValueType(value, columns[name].Type) === false) {
    console.log(`Type of value does not match ${name} type. Type of ${name} is ${columns[name].Type}`);  
    return { data: currentData, status: { statusCode: 2, msg: `Type of value does not match ${name} type` } };
  }

  newDataRow[name] = text2Float(value, columns[name]);
  debugger;
  if (handlers[name] != null) {
   let r = await onEditHandler(name, newDataRow,currentData, rowIndex, appEnv, status);
    debugger;
    newDataRow = r[0];
    status = r[1];
    if (status.statusCode === 2) {
      return { data: r[0], status };
    }
  }
  
  let r = await commonHandler("main", newDataRow, currentData, rowIndex, appEnv, status);
  status = r[1];
  r[0]._modified = 1;
  if (status.statusCode === 2) {
    return { data: r[0], status: r[1] };
  }
 
  // if editing table, see if we need to save the table
  if (iautoSave === true && appEnv.table != null) {
    r = await commonHandler("term", r[0], currentData, rowIndex, appEnv, status);
    status = r[1];
    if (status.statusCode === 2) {
      return { data: r[0], status: r[1] };
    }
    debugger;
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
