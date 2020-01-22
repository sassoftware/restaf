/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let restaf = require('@sassoftware/restaf');
let payload = require('./config')();
let restaflib = require('@sassoftware/restaflib');
let {print} = restaflib;

let store = restaf.initStore();

async function test_caslRun () {
    let {session} = await restaflib.casSetup (store, payload);
    /* Recommendation: Store the casl code in a repository */
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
    let args   = {a: "this is arguments", b: "more data"};
  
    let result = await restaflib.caslRun (store, session, casl, args);
    // print.object(result, 'Cas Results');
    console.log(`Job status: ${result.status}`);
    print.object(result.log, 'Log');
    print.object(result.disposition, 'Disposition');
    print.object(result.results, 'Data of real interest');
    await store.apiCall(session.links('delete'));
    return 'done';
   }
  
   test_caslRun()
    .then (r => console.log(r))
    .catch(err => console.log(err));
