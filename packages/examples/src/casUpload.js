/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the 'License');
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an 'AS IS' BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';

let restaf     = require('restaf');
let fs         = require('fs');
let prtUtil    = require('../prtUtil');
let {casSetup} = require('restaf-commons');

let printCasTable = require('../lib/printCasTable');

let {config} = require('@restaf/utility');
let payload = config();

let filename = 'cars';
let fileType = 'csv';

let store = restaf.initStore();

async function example () {
  // setup session
  let { session } = await casSetup(store, payload);

  // setup header for upload and the rest of the payload
  let JSON_Parameters = {
    casout: {
      caslib: 'casuser' /* a valid caslib */,
      name  : filename /* name of output file on cas server */
    },

    importOptions: {
      fileType: fileType /* type of the file being uploaded */
    }
  };

  let p = {
    headers: { 'JSON-Parameters': JSON_Parameters },
    data   : readFile(filename, fileType),
    action : 'table.upload'
  };

  await store.runAction(session, p);

  p = {
    action: 'table.tableExists',
    data  : { caslib: 'casuser', name: filename }
  };
  await store.runAction(session, p);

  p = {
    action: 'table.fetch',
    data  : { table: { caslib: 'casuser', name: filename } }
  };

  let data = {
    groupByLimit: 25000,

    inputs: [
      {
        name: 'MPG_City'
      }
    ],

    orderBy: [ 'MPG_City', 'Origin', 'Type' ],

    orderByAgg: [ 'SUM' ],

    orderByDesc: [ 'MPG_City' ],

    subSet: [ 'SUM' ],

    table: {
      caslib          : 'casuser',
      computedOnDemand: 'false',

      groupBy: [
        {
          format: '$.',
          name  : 'Origin'
        },
        {
          format: '$.',
          name  : 'Type'
        }
      ],

      name: 'CARS'
    }
  };
  p = {
    action: 'simple.summary',
    data  : data
  };

  let result = await store.runAction(session, p);
  console.log(JSON.stringify(result.items('tables'), null, 4));

  // noinspection JSUnusedLocalSymbols
  let deleteAction = await store.apiCall(session.links('delete'));

  return 'All Done';
}

function readFile (filename, fileType) {
  let data = fs.readFileSync(`./data/${filename}.${fileType}`);
  return data;
}

example()
  .then(r => console.log(r))
  .catch(err => console.log(err));
