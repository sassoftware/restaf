const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./getLogonPayload.js");
const getOpts = require("./getOpts.js");


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
  debugger;
  let jesSummary = await restaflib.jesRun(store, "mcpjobdefmyfolder", { a: 200, b: 2, c: 'xxx' },null);
  console.log(jesSummary);
  console.log(jesSummary.log);
  console.log(jesSummary.listing);

  return "done";
  
}
