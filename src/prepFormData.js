/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */


import commonHandler from './commonHandler';
/**
 * @description reduce fetch results
 * @async
 * @module prepFormData
 * @param {object} result - result from data fetch{schema: [], rows:[]}
 * @param {object} appEnv - app Environment from setup
 * @returns {promise}     - {columns: eColumns, rowsObject: newRows, schema: schema, status: status}
 */
async function prepFormData (result, appEnv, makerow) {
  const { schema, rows } = result;
  const source = appEnv.source;
  const customColumns = appEnv.appControl.customColumns;
  let status = { statusCode: 0, msg: 'Initialization was successful' };

  const makeRowObject = (columns, row, rown) => {

    const rowObj = {_rowIndex: rown, _modified: 0 };
    row.forEach((r, j) => {
      const s = columns[j];
      const name = s.Column.toLowerCase();
      rowObj[name] = r;
    });

    if (customColumns != null) {
      for (const k in customColumns) {
        const c = customColumns[k];
        const name = c.Column.toLowerCase();
        rowObj[name] = c.value;
      }
    }
    return rowObj;
  };

  let newRows = [];
  for (let i = 0; i < rows.length; i++) {
    const t = makeRowObject(schema, rows[i], i);

    const [t1, statusi] = await commonHandler('init', t, i, appEnv);
    status = statusi;
    newRows.push(t1);
  };

  // extend column and make it an object
  const eColumns = {};
  schema.forEach((s, i) => {
    const name = s.Column.toLowerCase();
    s.name = name;
    s.Label = (s.Label == null || s.Label.length === 0) ? s.Column : s.Label;
    if (s.Type == null) {
      s.Type = (s.type == null) ? 'double' : s.type;
    }
    if (s.Type === 'varchar') {
      s.Type = 'char';
    }
    s.Type = s.Type.toLowerCase();
    if (source ==='compute') {
      s.FormattedLength = s.length;
    }
    s.custom = false;
    s.customType = (s.Type === 'char') ? 'text' : 'number';
    eColumns[name] = s;
  });

  // add computed columns to the array.
  if (customColumns != null) {
    for (const k in customColumns) {
      const c = { ...customColumns[k] };
      c.name = k;
      c.custom = true;
      eColumns[k] = c;
      c.customType = (c.Type.toLowerCase() === 'char') ? 'text' : 'number';
    }
  }
  ['_rowIndex', '_modified'].map((k) => {
    let c = {
      Column         : k,
      Type           : 'double',
      Label          : 'Internal' + k,
      FormattedLength: 12,
      customType     : 'number',
      internal       : true
    }
    eColumns[k] = c;
  });

  if (makerow === true) {
    let t = {};
    for (const k in eColumns) {
      t[k] = (eColumns[k].customType === 'text') ? ' ' : 0;
    }
    newRows = [t];
  }
  return {
    cache  : {schema, rows},
    columns: eColumns,
    data   : newRows,
    status
  };
}
export default prepFormData;
