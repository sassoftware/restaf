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
  try {
    let jesSummary = await restaflib.jobRun(store, "mcp_tool_test", { a: 1, b: 320});

    console.log(jesSummary);
    console.log(jesSummary.log);
    console.log(jesSummary.listing);
    console.log(jesSummary.status);
    
  console.log(JSON.stringify('table', jesSummary.tables));
  console.log(Object.keys(jesSummary));
  } catch (err) {
    console.log('error', err);
  }

  return "done";
  
}

  
