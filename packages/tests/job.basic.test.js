const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./getLogonPayload.js");
const getOpts = require("./getOpts.js");
const { get } = require("lodash");

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
  let jesSummary = await restaflib.jobRun(store, "mcpflow", { a: 1, b: 2, c: 'xxx' });

  console.log(jesSummary);
  console.log(jesSummary.log);
  console.log(jesSummary.listing);

  return "done";
  
}
async function getContent(store, id) {
    let { files } = await store.addServices("files");
    let payload = {
      qs: {
        filter: `eq(id,'${id}')`
      }
    }
    debugger;
    let f = await store.apiCall(files.links("files"), payload);
    let context = f.itemsList(0);

    let contentRaf = f.itemsCmd(f.itemsList(0), 'content');
    let text = await store.apiCall(contentRaf);
    console.log(text.items());
    return text.items();
  }
  
