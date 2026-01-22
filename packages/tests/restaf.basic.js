let restaf = require('@sassoftware/restaf' );
let  getLogonPayload = require("./getLogonPayload.js");
let getOpts = require("./getOpts.js");
console.log(restaf.endStore);
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
  let { casManagement } = await store.addServices("casManagement");

  return msg;
}
