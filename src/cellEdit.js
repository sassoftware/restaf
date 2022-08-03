/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import text2Float from "./text2Float";
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
 * @param {rowObject} data  - RowObject for the entire row prior to change
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - {data: updated data, status: status }
 * @example
 * data schema {column1: value, column2, value,...}
 * status schema {status: 0|1|2, msg: some string}
 * 
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function cellEdit (name, value, rowIndex, data, appEnv) {
   /* do not modify the data directly. caller will probably do a setState */
    let newDataRow = (data !== null) ? {...data} : {...appEnv.state.data[rowIndex]}
    let columns = appEnv.state.columns;
    const {handlers,autoSave} = appEnv.appControl.editControl;

    newDataRow[name] = text2Float(value, columns[name]);
    let status = {status: 0, msg: ''};
  
    if (handlers[name] != null) {
        let r = await handlers[name](newDataRow, name, rowIndex, appEnv);
        newDataRow = r[0];
        status = r[1];
    } 
    let r = await commonHandler("main", newDataRow, rowIndex, appEnv);
    if (autoSave === true) {
        r = await commonHandler("term",r[0], rowIndex, appEnv);
        await updateTableRows(newDataRow, appEnv);
    }
    newDataRow = r[0]; 
    status.msg = status.msg + ' / ' + r[1];

    if (appEnv.appControl.dataControl.cachePolicy === true) {
        appEnv.state.data[rowIndex] = newDataRow;
    }

    return ({data: newDataRow, status: status});
    
}
export default cellEdit;
