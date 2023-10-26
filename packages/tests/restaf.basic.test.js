let restaf = require( 'restaf' );
let getToken = require( './getToken' );
let logonPayload = {
  host    : process.env.VIYA_SERVER,
  authType: 'server',
  token   : getToken(),
  tokenTy
}

const store = restaf.initStore()
let msg = store.logon( logonPayload );
console.log( msg );
let {casManagement, files} = store.addServices( 'casManagement', 'files' );
let fileList = store.apiCall( files.links( 'files' ) );
let casMangementLinks = casManagement.links().toJS()
console.log( fileList.itemsList().toJS() );



