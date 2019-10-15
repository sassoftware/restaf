"use strict";

let restaf = require("restaf");
let payload = require('./config')();
let {casSetup, print} = require('restaflib');

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

  print.items(r, 'Cas Results');
 
  return "done";
}

example()
  .then(r => console.log(r))
  .catch(err => console.log(err));
