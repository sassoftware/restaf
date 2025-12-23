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
    let jesSummary = await restaflib.jesRun(store, "mcp_tool_test", { a: 1, b: 320});
    console.log('jesSummary', jesSummary);
    console.log(JSON.stringify(jesSummary.tables,null,2));
  //  console.log('table', JSON.stringify(jesSummary.tables));
  } catch (err) {
    console.log('jesrun error');
    console.log('error', err);
  }

  return "done";
  
}

  
