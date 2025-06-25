const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");



let logonPayload = {
  host     : process.env.VIYA_SERVER,
  token    : getToken(),
  tokenType: "bearer",
  authType : "server",
};


let store = restaf.initStore(
  { casProxy: true, 
    options : {
       proxyServer: null
    }});

run()
  .then((r) => console.log("done"))
  .catch((err) => console.log(JSON.stringify(err, null, 4)));
async function run() {
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
  console.log('-----------------');
  console.log(r.items().toJS());
  
  console.log("-------------------------");
  p = {
    action: "builtins.echo",
    data  : {
      code: "data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; ",
    },
  };
 // let r1 = await store.runAction(session, p);

  console.log('---------------------------------------');
  let reports = await store.addServices("reports");
  let uri  = await restaflib.getReportUri(store, 'Retail Insights');
  console.log(uri);
  return "done";
}

function getToken() {
  let fs = require("fs");
  let j = fs.readFileSync(process.env.SASTOKEN, "utf8");
  let js = JSON.parse(j);
  let token = js.Default["access-token"];
  console.log("token", token);
  return token;
}
