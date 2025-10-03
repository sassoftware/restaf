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
  let jesSummary = await restaflib.jesRun(store, "cars_job_v4", { origin: 'Asia' },null);
  console.log(Object.keys(jesSummary));
  console.log(Object.keys(jesSummary.tables));
  /*
  console.log(Object.keys(jesSummary.tables ));
  console.log(jesSummary.tables['cars_job_v4']);
  */


  return "done";
  
}
