const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./packages/examples/lib/getLogonPayload.js");

let r = getLogonPayload()
.then ((logonPayload) => {
  console.log("logonPayload", logonPayload);
})
.catch ((err) => {
  console.log("Error getting logon payload", err);
  process.exit(1);
});

