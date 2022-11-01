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
 * @module prepFormData
 * @param {object} result - result from casFetchRow(rows and schema)
 * @param {object} appEnv - app Environment from setup
 * @returns {promise}     - {columns: eColumns, rowsObject: newRows}
 */
async function prepFormData (result, appEnv) {
  const { schema, rows } = result;
  const source = appEnv.source;
  const customColumns = appEnv.appControl.customColumns;
  let status = { statusCode: 0, msg: 'Initialization was successful' };

  const makeRowObject = (columns, row, rown) => {
    const rowObj = { _rowIndex: rown };
    row.forEach((r, i) => {
      const s = columns[i];
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

  const newRows = [];
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

  return {
    columns: eColumns,
    data   : newRows,
    status
  };
}
export default prepFormData;
