let restaf = require('@sassoftware/restaf');

let store = restaf.initStore();
console.log(store.config);
let payload = {
    host: process.env.VIYA_PUP,
    token: 'xxxxx',
    tokenType: 'bearer',
    authType: 'server',
    options: {
      computeServerId: '0001'
    }

}
runtest (store, payload)
.then (r => console.log(r))
.catch(err => {
    debugger;
    console.log(JSON.stringify(err, null,4));
});

async function runtest(store, payload) {

    let msg = await store.logon(payload);
    console.log(msg);
    let {compute} =await store.addServices('compute');
    console.log('compute created');
    let session = await store.apiCall(compute.links('createSession'));
   
    let sascode = {
        data: {
          code: [`data _null_; do i = 1 to 100; x=1; end; run; `],
        },
      };
      console.log('executing sas code');
      let job = await store.apiCall(session.links("execute"), sascode);
      console.log('calling job status');
      let p = {
        qs: {
          newState: 'Completed',
          timeout : 5
        }
      }
      let status = await store.jobState(job, p);
  
      if (status.data === "running") {
        throw `ERROR: Job did not complete in allotted time`;
      } else {
        switch (status.data) {
          case "warning":
            console.log(`Warning: check your log for warnings`);
            break;
          case "error":
            throw `Please correct errors and rerun program`;
          default:
            let log = await store.apiCall(status.job.links("log"));
            console.log(log.items().toJS());
            break;
        }
      }
    return true;

}
