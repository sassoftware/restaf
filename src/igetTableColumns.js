import {caslRun} from '@sassoftware/restaflib';
async function igetTableColumns (store, session, source, lib, table) {
  
  const handler = (source === 'cas') ? casTableColumns : computeTableColumns;
  const r = await handler(store, session, lib, table);
  return r;
}
async function casTableColumns(store, session, caslib, table) {
  
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
    table: {caslib: caslib, name: table}
  };
 
 let r = await caslRun(store, session, src, args,true);
 let columns = r.results.casResults.ColumnInfo.rows.map(r => r[0].toLowerCase());
 return columns;
}

async function computeTableColumns(store, session, libref, table) {
  
  libref = libref.toUpperCase();
  table = table.toUpperCase();
  let p = {
    qs: {
      filter: `eq(name,'${libref}')`
    }
  };
  const mylib = await store.apiCall(session.links('librefs'), p);
  const selflib = await store.apiCall(mylib.itemsCmd(libref, 'self'));

  p = {
    qs: {
      filter: `eq(name,'${table}')`
    }
  };
  
  const tables = await store.apiCall(selflib.links('tables'), p);
  if (tables.itemsList().size === 0) {
    console.log(`Table ${table} not found in ${libref}`);
    return [];
  }
  const tablesSelf = await store.apiCall(tables.links('self'));
  const tableDetails = await store.apiCall(tablesSelf.itemsCmd(table, 'self'));
  const columnraf = await store.apiCall(tableDetails.links('columns'));
  
  const columns = columnraf.itemsList().toJS();
  return columns;
}
export default igetTableColumns;