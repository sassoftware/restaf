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
  let id = 'b4266400-f3d2-4a6d-abcd-4514365adbce' ;
  let c1 = await getContent(store, id);
  console.log(c1);
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
  
    return "done";
  }


