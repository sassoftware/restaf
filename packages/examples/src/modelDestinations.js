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

"use strict";

let restaf  = require('restaf');
let {config} = require('@restaf/utility');
let payload = config();
let store   = restaf.initStore();
let prtUtil = require("../prtUtil");

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup file service
 * ---------------------------------------------------------------------------------
 */

async function setup (payload, ...args) {
  let msg = await store.logon(payload);
  prtUtil.print(`Logon status: ${msg}`);
  debugger;
  let { modelPublish } = await store.addServices(...args);
  prtUtil.view(modelPublish, 'ModelPublish root links');

  payload = {
    qs: {
      limit: 1000
    }
  };

  // get list of publish destinations

  let r1 = await store.apiCall(modelPublish.links('destinations'));
  prtUtil.view(r1, 'Destinations at the start of this example');

  // remove old copy of our test publish destination
  if (r1.itemsList().indexOf('test_dest') >= 0) {
    console.log('test_dest exists');
    let r = await store.apiCall(r1.itemsCmd('test_dest', 'delete'));
    console.log(r.status);
  }

  payload = {

      data: {
        name            : 'test_dest',
        casServerName   : 'cas-shared-default',
        casLibrary      : 'casuser',
        destinationTable: 'testdest'
      }
    };
  
  console.log('creating destinations');
  console.log(JSON.stringify(modelPublish.links('createDestinationCAS'), null,4));
  let r2 = await store.apiCall (modelPublish.links('createDestinationCAS'), payload);
  
  prtUtil.view(r2,'createdestination');

  r1 = await store.apiCall(modelPublish.links('destinations'));
  prtUtil.view(r1, 'current destinations');


  return true;
}

setup(payload, "modelPublish")
  .then(r => console.log(r))
  .catch(e => {
    console.log('error');
    console.log(e);
  });
