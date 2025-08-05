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
  console.log(msg);
  let { casManagement } = await store.addServices("casManagement");
  let { session } = await restaflib.casSetup(store, null);

  let p = {
    action: "datastep.runCode",
    data  : {
      single: "YES",
      code  : "data casuser.score; keep x1 x2;do i = 1 to 20; x1=i; x2=i*10;output;end;run; ",
    },
  };
  let r = await store.runAction(session, p);
  console.log(r);
  console.log("after run action", JSON.stringify(r.items(), null, 4));  
  return "done";
}

