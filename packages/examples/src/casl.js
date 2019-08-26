"use strict";

let restaf = require('restaf');
let {config} = require('@restaf/utility');
let payload = config();
let {casSetup} = require('restaf-commons');

let prtUtil = require("../prtUtil");

let store = restaf.initStore();
async function example () {
  let { session } = await casSetup (store, payload);
  // console.log(JSON.stringify(session.links(), null, 4));
  let casl = `
           action datastep.runcode/ single='YES' code = 'data casuser.a; x=1; run;';
           action table.fetch r=r1/
              table= { caslib= 'casuser', name= 'a' } ;
              run;
              action datastep.runcode/ single='YES' code = 'data casuser.b; y=1; run;';
            action table.fetch r=r2/
              table= { caslib= 'casuser', name= 'b' } ;
              run;
           c = {a=10, b=20};
           send_response({a=r1, b=r2, c=c});
        `;

  let p = {
    action: "sccasl.runcasl",
    data  : { code: casl }
  };

  let r = await store.runAction(session, p);
  debugger;

  console.log(r.items().toJS());
  let a = r.items().toJS();
  console.log(a);
  return "done";
}

example()
  .then(r => console.log(r))
  .catch(err => console.log(err));
