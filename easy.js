let restaf    = require('@sassoftware/restaf');
let restaflib = require('@sassoftware/restaflib');

let store = restaf.initStore();
let payload = {
    host: "http://lax95d01.unx.sas.com:8012",
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
  debugger;
  console.log(store.config);
  let computeSession = await restaflib.computeSetup(store, null, payload);
  console.log(store.store.config);
  debugger;
  let macros = {
    x1: 10,
    x2: 20
  };
  let src = `
ods html style=barrettsblue; 
/*
data work.dtemp1;
total = &x1 + &x2;
run;
proc print;run; 
*/ 
proc print data=sashelp.cars;run;
ods html close;
run;
  `;
  console.log(Date());
  let computeSummary = await restaflib.computeRun(
    store,
    computeSession,
    src,
    macros,
    10
  );
  console.log(Date());
  // Fetch data
  
  data = await restaflib.computeFetchData(
    store,
    computeSummary,
    "DTEMP1",
    "next",
    { offset: 0, limit: 1 }
  );
  console.log(JSON.stringify(data, null,4));

  // show log
  let log = await restaflib.computeResults(store, computeSummary, "log");
 console.log(JSON.stringify(log, null, 4));

// show ods
  let ods = await restaflib.computeResults(store, computeSummary, "ods");
 // console.log(ods);
  return 'done';

}
