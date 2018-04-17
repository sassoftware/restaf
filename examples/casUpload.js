/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';

let restaf        = require('../lib/restaf');
let fs            = require('fs');
let prtUtil       = require('../prtUtil');
let casSetup      = require('./lib/casSetup');
let runAction     = require('./lib/runAction');
let printCasTable = require('./lib/printCasTable');

let payload     = require('./config')('restaf.env');
let filename    = 'cars';
let fileType    = 'csv';

let store = restaf.initStore();

async function example () {

    // setup session
    let {session} = await casSetup(store, payload, 'cas');

    // setup header for upload and the rest of the payload
    let JSON_Parameters = {
        casout: {
            caslib: 'casuser', /* a valid caslib */
            name  : filename /* name of output file on cas server */
        },

        importOptions: {
            fileType: fileType /* type of the file being uploaded */
        }
    };

    let p = {
        headers: {'JSON-Parameters': JSON_Parameters},
        data   : readFile(filename, fileType),
        action : 'upload'
    };

    await runAction(store, session, p, 'upload');

    p = {
        action: 'table.tableExists',
        data  : { caslib: 'casuser', name: filename }
    };
    await runAction(store, session, p, 'exists');

    p = {
        action: 'table.fetch',
        data  : { table: { caslib: 'casuser', name: filename } }
    };
   // let result = await runAction(store, session, p, 'fetch');
   // console.log(JSON.stringify(result.items('tables'), null, 4));
    //printCasTable(result, 'Fetch');

    let data = {
        table : {caslib: 'casuser', name: 'cars'},
        inputs: [ {name: 'mpg_highway'} ],
        sets  : [ {groupBy: 'origin'} ] ,
        subSet: [ 'MAX','MIN','MEAN' ]

    };

    p = {
        action: 'simple.mdsummary',
        data  : data
    };

    // result = await runAction(store, session, p, 'summary');
    //console.log(JSON.stringify(result.items('tables'), null, 4));
   // result.items('tables').forEach( (v, k) => {
      //  console.log(k)
  //  });

    data = {
        table: {
            caslib: 'casuser',
            name: 'cars',
            groupBy: [{name: 'ORIGIN'}, {name: 'MAKE'} ],
            orderBy: [{name: 'MAKE'}, {name: 'MODEL'} ],
            vars: [{name: 'mpg_highway'}]

        },
      /*casout: {name: 'test'},*/
       // inputs: [ {name: 'mpg_highway'} ],

       subSet: [ 'MAX','MIN','MEAN' ]
};

    p = {
        action: 'simple.summary',
        data  : data
    }
    // printCasTable(result, 'Fetch');
    let result = await runAction(store, session, p, 'summary');
    console.log(JSON.stringify(result.items('tables'), null, 4));


    // noinspection JSUnusedLocalSymbols
    let deleteAction = await store.apiCall(session.links('delete'));


    return "All Done";
}

function readFile (filename, fileType) {
   let data = fs.readFileSync(`./data/${filename}.${fileType}`);
    return data;
}

example()
    .then (r => console.log(r))
    .catch(err => console.log(err));
