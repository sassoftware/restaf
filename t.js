let restaf = require('@sassoftware/restaf');
let restaflib = require('@sassoftware/restaflib');


let logonPayload = {
    host: process.env.VIYA_SERVER,
    clientID: 'sas.ec',
    clientSecret: '',
    user: 'sastest1',
    password: 'Go4thsas',
}
function printit(title, l) {
  console.log('---------------------------------------------- ', title);
  console.log('links ', l.links().keySeq().toJS());
  console.log('items', l.items().toJS());
  console.log('itemsCmd ', l.itemsCmd());
  if (l.itemsCmd() != null) {
     console.log('itemscmd ', l.itemsCmd().toJS());
  }
}
const runit = async (table) => {
  let {libref, name} = table;
    let store = restaf.initStore();
    let msg = await store.logon(logonPayload);

    let session = await restaflib.computeSetup(store, null, logonPayload);
    printit('session', session);
    debugger;

    // get the libref api for the incoming libref
    let p = {
        qs: { filter: `eq(name,'${libref}')`}
      };
    console.log(p);
    let currentLibrefs = await store.apiCall(session.links('librefs'), p);

    // In theory this should have link
    printit('currentLibrefs', currentLibrefs);
    
    debugger;
    let rlink = currentLibrefs.itemsCmd(libref, 'self');
    let currentLibrefSelf = await store.apiCall(rlink);
    printit('currentLibrefSelf', currentLibrefSelf);
    
    p = {
      qs: { filter: `eq(name,'${name}')`}
    };
    let tables = await store.apiCall(currentLibrefSelf.links('tables'));
    printit('tables', tables);

    let tableSelf =  await store.apiCall(tables.itemsCmd(name, 'self'));
    printit('tableSelf', tableSelf);
    
    let data =  await store.apiCall(tableSelf.links('rowSet'));
    printit('data', data);

    let columns =  await store.apiCall(tableSelf.links('columns'));
    printit('columns', columns);

    let schema = [];
    debugger;
    let items = columns.items().toJS();
    console.log(items);
    for(let cx in items) {
      let c = items[cx];
      let newcol = {
        name: c.name.toLowerCase(),
        Label: c.data.label,
        length: c.data.length,
        type  : c.data.type,
        custom: false
      }
      console.log(newcol);
      schema.push(newcol);
    }
    console.log(JSON.stringify(schema));
    /*
    let tablesx = await store.apiCall(tables.links('self'));
    console.log(tablesx.links().keySeq().toJS());
  */

    

}

runit({libref: 'SASHELP', name: 'AIR'}) 
.then ( r => console.log('done'))
.catch( err => {
  console.log('error');
  console.log(JSON.stringify(err))
});