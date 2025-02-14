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
  ;
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

  // handle init and term for all types of forms
  // user will edit newData in place.
  let reservedLabels = ["init", "term", "initApp", "termApp", "main", "_appProps", "_appSubmit"];
  if (reservedLabels.includes(name) === true) {  
    let r = await commonHandler(name, newDataRow, currentData, rowIndex, appEnv, status);
    if (r[1].statusCode === 2) {
      // keep state data as is and return message.
      console.log(`Error in ${name}  handler`, r[1].msg);
      return ({ data: currentData, status: r[1] });
    } else {
      // update state data with new data
      appEnv.state.data[rowIndex] = r[0];
      if (cachePolicy !== false) {
        appEnv.state.data[rowIndex] = r[0];
      }
      return { data: r[0], status: r[1] };
      }
    }

  // The rest of the processing for specific cell edits

  // now make sure the specified name is a valid column name
  if (columns[name] == null) {
    return { data: currentData, status: { statusCode: 2, msg: `Column ${name} not found` } };
  }

  // make sure that the incoming value type matches the column type
  if (appEnv.tableFormat !== true) { // No checking if the data is from a formatted table
    if (validateValueType(value, columns[name].Type) === false) {
      console.log(`Type of value does not match ${name} type. Type of ${name} is ${columns[name].Type}`);  
      return { data: currentData, status: { statusCode: 2, msg: `Type of value does not match ${name} type` } };
    }
  }

  // update the working copy with the new value
  // Yes I know text2Float is not the best name for this function - may change it before production push
  newDataRow[name] = text2Float(value, columns[name]);
  
  // if the is onEdit(onChange) handler specified call it.
  if (handlers[name] != null) {
   let r = await onEditHandler(name, newDataRow,currentData, rowIndex, appEnv, status);
   if (r[1].statusCode === 2) {
    console.log(`Error in onEdit handler for ${name}`, status.msg);
    console.log(`Bypassing main handler`); 
    return { data: currentData, status: r[1] };
   }
   // update newDataRow with the result of the onEdit handler;
   newDataRow = r[0];
   status = r[1];
  }
  // now drive main handler
  let r = await commonHandler("main", newDataRow, currentData, rowIndex, appEnv, status);
  if (r[1].statusCode === 2) {
    // fall all the way back to the original data prior to onEdit handler
    console.log(`Error in main handler for ${name}`, r[1].msg);
    return { data: currentData, status: r[1] };
  }

  // Now we have successfully edited the data, let's see if we need to save it
  // only in the case of tables and autoSave is true
  
  r[0]._modified = 1;
  newDataRow = r[0];
  status = r[1];
  if (cachePolicy !== false) {
    appEnv.state.data[currentData._rowIndex] = newDataRow;
  }
  // update state data with new data
  appEnv.state.data[rowIndex] = newDataRow;
  // if editing table, see if we need to save the table
  if (iautoSave === true && appEnv.table != null) {
    r = await commonHandler("term", r[0], newDataRow, rowIndex, appEnv, status);
    status = r[1];
    if (status.statusCode === 2) {
      console.log(`Error in term prior to saving data for ${name} row ${rowIndex}`, status.msg);
      return { data: newDataRow, status: r[1] };
    }
    
    appEnv.state.data[rowIndex] = r[0];

    // Now update the table rows
    await updateTableRows(r[0], appEnv);
    // need better error handling in saveTable
    if (appEnv.appControl.editControl.autoSaveTable === true) {
      await saveTable(appEnv);
    }
  }

  
  return { data: newDataRow, status };
}
export default cellEdit;
