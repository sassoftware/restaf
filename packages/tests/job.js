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
      filter: "eq(name,'cars_job_v3')"
    }
  }
  debugger;
  let thisJob = await store.apiCall(jobExecution.links('jobs'), payload);

  let id = thisJob.items(thisJob.itemsList(0),'data', 'jobRequest', 'jobDefinition').toJS();

  debugger;
  

  let jobPayload = {
    data: {
      jobDefinition: id,
      arguments:{
        origin:'Asia'
      }
    },
  }
  debugger;
 
  try {
    let job1 = await store.apiCall(thisJob.links('submitJob'), jobPayload);
    debugger;
    let status = await store.jobState(job1, null, 5, 2);
   
    debugger;
    let results = await restaflib.jesSummary(store, status.job);
    console.log('********************************');  
    console.log('results', JSON.stringify(results, null, 4));
    console.log('********************************');
  } catch (error) {
    console.error('Error submitting job:', error);
  }

  return "done";
}

