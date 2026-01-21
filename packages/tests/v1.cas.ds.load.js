let restaf = require("@sassoftware/restaf");
let  restaflib = require("@sassoftware/restaflib");
let  getLogonPayload = require("./getLogonPayload.js");
let getOpts = require("./getOpts.js");

run()
  .then((r) => console.log("done"))
  .catch((err) => console.log(JSON.stringify(err, null, 4)));

async function run() {
  let logonPayload = await getLogonPayload();

  let store = restaf.initStore(
    {
      casProxy: true,
      options: {
        proxyServer: null,
        httpOptions: getOpts(),
      }
    });
  let msg = await store.logon(logonPayload);
  let { session } = await restaflib.casSetup( store, null );
	
	let table = {
		caslib: 'samples' /* a valid caslib */,
		name  : 'costchange'
	};
	
	let r = await restaflib.casLoadTable( store, session, table );
	console.log( r );


	await store.apiCall( session.links( 'delete' ) );
	return 'done';

}