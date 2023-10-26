
import caslRunBase from './caslRunBase';
import programs from './programs';

/**
 *
 * @description Calls cas server and returns the results(async)
 * 
 * @async
 * @module casTableSummary
 * @category restaflib/cas
 * 
 * @param {store} store     - restaf store
 * @param {casSession} session - cas session
 * @param {table} table     - table
 * @returns {promise}  returns results from cas
 * @example
 */

async function casTableSummary ( store, session, table ) {
  
  const src = `
  action table.tableinfo r=result/
    caslib= _args_.caslib name=_args_.name;
    run;
  summary = {rowcount = result.tableInfo[1, 'Rows'],
     columnCount=result.tableInfo[1, 'Columns'],
     source=result.tableInfo[1]};
`;    

  let result  = await caslRunBase( store, session,src, table, true );
  
  return result.items().toJS();
}

export default casTableSummary;