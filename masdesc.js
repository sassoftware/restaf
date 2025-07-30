const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./packages/examples/lib/getLogonPayload.js");

let params = {model: 'cancer10000'};
_masDescribe(params)
  .then((r) => console.log("done", r))
  .catch((err) => console.log(JSON.stringify(err, null, 4)));


async function _masDescribe(params) {
 // setup
  let { masSetup, masDescribe } = restaflib;
  let store = restaf.initStore({});
  let logonPayload = await getLogonPayload();
  let inputs = {};
  let masControl;
  let {model} = params;
  try {
    masControl = await masSetup(store, [model], logonPayload);
    let describe = await masDescribe(masControl, model, null, true);
    return { content: [{ type: 'text', text: JSON.stringify(describe) }] };
  } catch (err) {
    console.log(err);
    await store.logoff();
    return { content: [{ type: 'text', text: JSON.stringify(err) }] };
  }
}