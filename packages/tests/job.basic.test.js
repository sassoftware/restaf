const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./getLogonPayload.js");
const getOpts = require("./getOpts.js");
const { get } = require("lodash");

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
  let jesSummary = await restaflib.jobRun(store, "mcpdef1", { a: 1, b: 320, c: 'xxx' });

  console.log(jesSummary);
  console.log(jesSummary.log);
  console.log(jesSummary.listing);
  console.log(jesSummary.status);

  return "done";
  
}

  
