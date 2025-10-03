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

  try {
    let { files } = await store.addServices("files");
    let n = "_webout.json_1f28a11b-a676-4365-a98f-afd8cc1ef972";
    let payload = {
      qs: {
        filter: `eq(name, "_webout.json")`
      }
    }
    let f = await store.apiCall(files.links("files"), payload);
    console.log(JSON.stringify(f.itemsList().toJS(), null, 4));
    console.log(f.items(f.itemsList(1)).toJS());
    let c = await store.apiCall(f.itemsCmd(f.itemsList(1), 'content'));
    console.log(c.items().toJS());
    console.log(f.itemsList(0));

  } catch (err) {
    console.error('Error in files test:', err);
    console.log(JSON.stringify(err, null, 4));

  }
}


