const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./getLogonPayload.js");

run()
  .then((r) => console.log("done"))
  .catch((err) => console.log(JSON.stringify(err, null, 4)));
async function run() {
  let logonPayload = await getLogonPayload();
  let store = restaf.initStore(
    {
      casProxy: true,
      options: {
        proxyServer: null
      }
    });
  let msg = await store.logon(logonPayload);
  console.log(msg);

  let { files } = await store.addServices( "files" );

  let filesList = await store.apiCall( files.links( "files" ) );
  console.log( JSON.stringify( filesList.itemsList().toJS(), null,4 ) );

  let next;
  // do this loop while the service returns the next link or counter is 0
  
  while ( ( next = filesList.scrollCmds( "next" ) ) !== null ) {
    filesList = await store.apiCall( next );
    let l = filesList.itemsList().toJS();
    console.log( JSON.stringify( l, null,4 ) );
    
    for ( let i=0; i< l.length; i++ ) {
      debugger;
      console.log( '-------------------------------', l[i] );
        let f = filesList.itemsCmd( l[i], 'self' );
        if ( f === null ) {
          console.log( l[i], "cannot be deleted" );
          continue;
        }
        let r = await store.apiCall( f );
        let fd = r.links( 'delete' );
        console.log( fd.toJS());
        try {
        let rd = await store.apiCall( fd );

        console.log( l[i],rd.status );
        } catch (error) {
          console.error( 'Error deleting file:', error );
        }
      }
    }
  }


