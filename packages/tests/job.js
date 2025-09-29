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
  let { jobExecution } = await store.addServices("jobExecution");
  let payload= {
    qs: {
      filter: "eq(name,'mcpsasjson_jobdef')"
    }
  }
  let thisJob = await store.apiCall(jobExecution.links('jobs'), payload);
  console.log(thisJob);
  let id = thisJob.items(thisJob.itemsList(0),'data', 'jobRequest', 'jobDefinitionUri');
  console.log(id);
 
  let jobPayload = {
    data: {
      jobDefinitionUri: id
    }
  }
  
  let result = await store.apiCall(thisJob.links('submitJob'), jobPayload);
  console.log(result);

  return "done";
}

