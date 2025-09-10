const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./getLogonPayload.js");
const getOpts = require("./getOpts.js");

run()
  .then((r) => console.log("done"))
  .catch((err) => console.log(JSON.stringify(err, null, 4)));
async function run() {
  debugger; 
  let opts = getOpts();
  console.log("running casl.ds.js");
  let logonPayload = await getLogonPayload();
  console.log('---------------------------------', getOpts());
  let store = restaf.initStore(
    {
      casProxy: true,
      options: {
        proxyServer: null,
        httpOptions : opts
      },
      
    });
  console.log("store", JSON.stringify(store, null, 4));
  let msg = await store.logon(logonPayload);
  console.log(msg);
  let { casManagement } = await store.addServices("casManagement");
  let { session } = await restaflib.casSetup(store, null);

  /*
  let p = {
    action: "datastep.runCode",
    data  : {
      single: "YES",
      code  : "data casuser.score; keep x1 x2;do i = 1 to 20; x1=i; x2=i*10;output;end;run; ",
    },
  };
  */
  let src1 = `
           action datastep.runcode result=results status=rc/ single='YES' code = 'data casuser.score; keep x1 x2;do i = 1 to 20; x1=i; x2=i*10;output;end;run;';
           send_response({results=results, rc=rc});
              `; 
   const src = `
  action datastep.runcode /
  single='YES'
  code = "data casuser.mastertemp;
     keep x1 x2 x3 id;
     length id varchar(15);
     do i = 1 to 15;
     x1=i*100; x2=5; x3=i*100; id=compress(TRIMN('keymaster'||i));
     output;
     end;
     run;
     ";
  `;
   const r = await restaflib.caslRun(store, session, src1);;
  console.log(r);
  console.log("after run action", JSON.stringify(r.items(), null, 4));  
  return "done";
}

