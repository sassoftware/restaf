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
let filename    = 'iris';
let fileType    = 'csv';

let store = restaf.initStore();

async function example () {

    // setup session
    let {session} = await casSetup(store, payload, 'cas');

    // setup header for upload and the rest of the payload
    let JSON_Parameters = {
        casout: {
            caslib: 'casuser', /* a valid caslib */
            name  : `deva` /* name of output file on cas server */
        },

        importOptions: {
            fileType: fileType /* type of the file being uploaded */
        }
    };
    let data = readFile(filename, fileType);

    let p = {
        headers: {'JSON-Parameters': JSON_Parameters},
        data   : data,
        action : 'upload'
    };

    await runAction(store, session, p, 'upload');

    p = {
        action: 'table.tableExists',
        data  : { caslib: 'casuser', name: `deva` }
    };
    await runAction(store, session, p, 'exists');

    p = {
        action: 'table.fetch',
        data  : { table: { caslib: 'casuser', name: `deva` } }
    };
    let result = await runAction(store, session, p, 'fetch');
    printCasTable(result, 'Fetch');

    p = {
        action: 'table.tableDetails',
        data  : { caslib: 'casuser', name: `deva` } 
    };
     await runAction(store, session, p, 'details');
    // noinspection JSUnusedLocalSymbols
    let deleteAction = await store.apiCall(session.links('delete'));
    return "All Done";
}

function readFile (filename, fileType) {
   let data = fs.readFileSync(`./data/${filename}.${fileType}`, 'UTF8');
    // data = fs.readFileSync(`./data/${filename}.${fileType}`);
    return data;
}

example()
    .then (r => console.log(r))
    .catch(err => console.log(err));
