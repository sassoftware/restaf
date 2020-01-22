"use strict";

let restaf = require('@sassoftware/restaf');
let payload = require('./config')();
let {casSetup, print} = require('@sassoftware/restaflib');

let store = restaf.initStore();
async function example () {
  let {session} = await casSetup (store, payload);
  // console.log(JSON.stringify(session.links(), null, 4));
  let casl = `
  cols = {'char', 'char','double', 'REASON', 'JOB','CLAGE'};

  chars = {};

  nums = {};
              length_of_each = dim(cols)/2;
              do i = 1 to length_of_each;
                 if (cols[i] == 'char' or cols[i] == 'varchar') then do;
                    chars = chars + cols[i+length_of_each];
                  end;
                 else if (cols[i] == 'double')  then do;
                     nums = nums + cols[i+length_of_each];
                  end;
              end;
              full_dict = nums + chars;

              send_response(full_dict);


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
