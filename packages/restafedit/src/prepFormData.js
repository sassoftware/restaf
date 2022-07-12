/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */


/* 
* output
* extended columns and data ready for use in dataform and table
*/
import commonHandler from './commonHandler';
/**
 * @description reduce fetch results
 * @private
 * @async
 * @function prepFormData
 * @param {object} result - result from casFetchRow(rows and schema)
 * @param {object} appEnv - app Environment from setup
 * @returns {promise}     - {columns: eColumns, rowsObject: newRows}
 */
async function prepFormData (result, appEnv) {
  const {schema, rows} =  result;
  const customColumns = appEnv.appControl.dataControl.customColumns;
  
  const makeRowObject = (columns, row) => {
    let rowObj = {};
    row.forEach((r, i) => {
      let s = columns[i];
      let name = s.Column.toLowerCase();
      if (s.Label == null) {
        s.Label = s.Column;
      }
      rowObj[name] = r;
    });

    if (customColumns != null) {
      for (let k in customColumns) {
        let c = customColumns[k];
        let name = c.Column.toLowerCase();
        rowObj[name] = c.value;
      }
    }
    return rowObj;
  };


  let newRows = [];
  for (let i=0; i < rows.length; i++) {
     let t = makeRowObject(schema, rows[i]);
     
     let [t1,status] = await commonHandler('init', t, i, appEnv);
     
     if (status.code !== 0) {
       console.log(JSON.stringify(status, null,4));
     }
     newRows.push(t1);
    };
  
  //extend column and make it an object
  let eColumns = {};
  schema.forEach((s,i) => {
      let name = s.Column.toLowerCase();
      s.name    = name;
      s.Label   = (s.Label == null || s.Label.length === 0) ? s.Column : s.Label;
      s.custom  = false;
      eColumns[name] = s;
    });

  // add computed columns to the array.
  if (customColumns != null) {
    for (let k in customColumns) {
      let c = { ...customColumns[k] };
      c.name = k;
      c.custom = true;
      eColumns[k] = c;
    }
  }

  
  return {
    columns: eColumns,
    data   : newRows
  };

}
export default prepFormData;
