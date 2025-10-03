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
  try {
    let result = await restaflib.jobRun(store, 'cars_job_v4', { origin: 'Asia' });
    console.log(Object.keys(result));
    console.log(Object.keys(result.tables ));
    
  } catch (error) {
    console.error('Error submitting job:', error);
  }

  return "done";
}

