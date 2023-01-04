import {caslRun, computeRun} from '@sassoftware/restaflib';

/**
 * @description get the list of tables in a specific library
 * @async
 * @module getTableSummary
 * @category restafedit/utility
 * @param {appEnv} appEnv   - app Environment from setup
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

async function getTableSummary (appEnv) {
  const handler = (appEnv.source === 'cas') ? casTableSummary : computeTableSummary;
  const r = await handler(appEnv);
  appEnv.state.tableSummary = r;
  return r;
}
async function casTableSummary(appEnv) {
  const {store, session, table} = appEnv;
  const src = `
  action table.tableinfo r=result/
    caslib= _args_.caslib name=_args_.name;
    run;
  summary = result.tableInfo[1];
  summary.rowCount = result.tableInfo[1, 'Rows'];
  summary.columnCount = result.tableInfo[1, 'Columns'];
  send_response({casResults=summary});
`;    
 let r = await caslRun(store, session, src, table);
 return r.results.casResults;
}

async function computeTableSummary(appEnv) {
  const {store, tableSummary, table} = appEnv;
  const tname = `${table.libref}.${table.name}`.toUpperCase();
  const tableInfo = tableSummary.tables[tname];
  const t1 = await store.apiCall(tableInfo.self);
  return t1.items().toJS();
}
export default getTableSummary;