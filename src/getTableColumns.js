/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import {caslRun} from '@sassoftware/restaflib';

/**
 * @description get the columns for a table
 * @async
 * @module getTableColumns
 * @category restafedit/utility
 * @param {string} source   - cas or compute
 * @param {object} table    - table object
 * @param {appEnv} appEnv   - app Environment from setup
 *
 * @returns {promise}       - returns an array of table names(cas or SAS)
 * @example
 *  let list = await getTableSummary(appEnv);
 *  returns summary information object. The function also sets the results in appEnv.state.tableSummary
 *  For consistency between cas and compute, rowCount and columnCount are
 *  set for both cases.
 * { 
 *  rowCount: number,
 *  columnCount: number
 *  ...rest...
 *  }
 */

async function getTableColumns (source, table, appEnv) {
  
  const handler = (source === 'cas') ? casTableColumns : computeTableColumns;
  const r = await handler(appEnv, table);
  appEnv.state.tableSummary = r;
  return r;
}
async function casTableColumns(appEnv, table) {
  const {store, session} = appEnv;
  
  const src = `
  rc = checkAndLoadTable(_args_.table.caslib, _args_.table.name);
  if (rc ne true) then do;
    text = 'Unable to access ' ||_args_.table.caslib||'.'||_args_.table.name;   
    rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};
    exit(rx);  
  end; 
  action table.columnInfo r=result/
    table = {caslib= _args_.table.caslib,  name=_args_.table.name};
    run;
  summary = result; 
  send_response({casResults=summary});
  `;    
  let args = {
    table: table
  };
 
 let r = await caslRun(store, session, src, args,true);
 let columns = r.results.casResults.ColumnInfo.rows.map(r => r[0].toLowerCase());
 return columns;
}

async function computeTableColumns(appEnv, table) {
  const { store, session } = appEnv;
  debugger;
  let {libref, name} = table;
  libref = libref.toUpperCase();
  name = name.toUpperCase();
  let p = {
    qs: {
      filter: `eq(name,'${libref}' )`
    }
  };
  const mylib = await store.apiCall(session.links('librefs'), p);
  const selflib = await store.apiCall(mylib.itemsCmd(libref, 'self'));

  p = {
    qs: {
      filter: `eq(name,'${name}' )`
    }
  };
  debugger;
  const tables = await store.apiCall(selflib.links('tables'), p);
  const tablesSelf = await store.apiCall(tables.itemsCmd('self'));
  debugger;
  
  const tableDetails = await store.apiCall(tablesSelf.links('columns'));
  debugger;
  console.log(tableDetails.itemsList().toJS());
  return tableDetails.itemsList().toJS();
}
export default getTableColumns;