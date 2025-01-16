/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */


import commonHandler from './commonHandler.js';
import typeValidation from './typeValidation.js';
/**
 * @description reduce fetch results
 * @async
 * @module prepFormData
 * @param {object} result - result from data fetch{schema: [], rows:[]}
 * @param {object} appEnv - app Environment from setup
 * @param {boolean} makerow - create initial
 * @returns {promise}     - {columns: eColumns, rowsObject: newRows, schema: schema, status: status}
 */
async function prepFormData (result, appEnv, makerow) {
  const { schema, rows } = result;
  const source = appEnv.source;
  const customColumns = appEnv.appControl.customColumns;
  let status = { statusCode: 0, msg: 'Initialization was successful' };
  
  // set up extended columns
  const eColumns = {};
  ;
  //--------------------------------------------------------------------------
  // utility functions
  // function to make a data row object
  const  makeRowObject = (columns, row, rown) => {
    const rowObj = {_rowIndex: rown, _modified: 0 };
    row.forEach((r, j) => {
      const s = columns[j];
      const name = s.Column.toLowerCase();
      rowObj[name] = r;
    });
    // Now add custom columns if any
    if (customColumns != null) {
      addCustomColumns(customColumns, rowObj);
    }
    return rowObj;
  };

  // function to add custom columns to the row object
  const addCustomColumns = (customColumns, rowObj) => {

    for (const k in customColumns) {
      const c = customColumns[k];
      const name = c.Column.toLowerCase();
      rowObj[name] = c.value;
    }
  return rowObj;
  }
  //---------------------------------------------------

  schema.forEach((s, i) => {
    const name = s.Column.toLowerCase();
    s.name = name;
    s.Label = (s.Label == null || s.Label.length === 0) ? s.Column : s.Label;
    s.customType = (s.Type == null) ? 'string' : s.Type.toLowerCase();//keep original type
    // convert type to valid js types
    s.Type = typeValidation((s.Type == null) ? 'string' : s.Type.toLowerCase());
   
    if (source ==='compute') {
      s.FormattedLength = s.length;
    }
    s.custom = false;
    //s.customType = s.Type;
    eColumns[name] = s;
  });

  // add computed columns to the current column set.
  if (customColumns != null) {
    for (const k in customColumns) {
      const c = { ...customColumns[k] };
      c.name = k;
      c.custom = true;
      eColumns[k] = c;
      c.customType = c.Type;
      c.Type = typeValidation((c.Type == null) ? 'string' : c.Type.toLowerCase());
    }
  }

  let internalColumns = ['_rowIndex', '_modified'];
  if (appEnv.table === null) {
    internalColumns.push('_index_');
  }
  internalColumns.map((k) => {
    let c = {
      Column         : k,
      Type           : 'number',
      Label          : 'Internal' + k,
      FormattedLength: 12,
      customType     : 'number',
      internal       : true
    }
    eColumns[k] = c;
  });

  // save it appEnv - need it in init handler for data verification

  appEnv.state.columns = eColumns;

  // Now create appEnv.state.data
  // initialize the data rows with incoming data rows(table case)
  // and add the custom columns if any
  // if no data, then create a row object with custom columns


  ;
  let newRows = [];
  if (rows.length > 0 ) {
    for (let i = 0; i < rows.length; i++) {
      const t = makeRowObject(schema, rows[i], i);
      // run the init handler for each new row object
      let currentRow = Object.assign({}, t);
      const [t1, statusi] = await commonHandler('init', t , currentRow, i, appEnv, status);
      ;
      status = statusi;
      newRows.push(t1);
    };

    // app frame - no data to start with
  } else {
    let rowObj = {_rowIndex: 0, _modified: 0 };
    let t = addCustomColumns(customColumns, rowObj);
    // run the init handler for each new row object
    let currentRow = Object.assign({}, t);
    ;
    let  [t1, statusi] = await commonHandler('init', t, currentRow,  0, appEnv, status);
    ;
    status = statusi;
    newRows[0] = t1;
  }

 /*
  if (makerow === true) {
    let t = {};
    for (const k in eColumns) {
      let type = eColumns[k].Type;
      t[k] = (type === 'string') ? ' ' 
         : (type === 'boolean') ? false 
         : (type === 'number') ? 0
         : (type === 'int') ? 0
         : type === 'object' ? {} 
         : []; 
        
    }
    newRows = [t];
  }
  */

  ;
  appEnv.state = {
    cache  : {schema, rows},
    columns: eColumns,
    data   : newRows,
  }
  
  let res = {
    cache  : {schema, rows},
    columns: eColumns,
    data   : newRows,
    status
  };


return res;
}
export default prepFormData;
