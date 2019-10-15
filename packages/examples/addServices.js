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

let restaf = require("restaf");
let payload = require('./config')();
let store = restaf.initStore();
let restaflib = require('restaflib');
let {print} = restaflib;

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup file service
 * ---------------------------------------------------------------------------------
 */

async function setup (payload, ...args) {

  let {caslBase, jsonToDict} = restaflib;
  console.log(caslBase);
  console.log(jsonToDict);

  let msg = await store.logon(payload);
  print.object(msg, `Logon status`);
  debugger;
  let { compute, casManagement, modelPublish, files } = await store.addServices(
    ...args
  );
  console.log('List of active services');
  console.log(store.getServices());


  debugger;
  let r = store.getXsrfData();
  print.titleLine('current xsrf tokens for services');
  print.object(r);


  /*
  let s = store.rafObject("modelPublish");
  // console.log(s);

  console.log(JSON.stringify(modelPublish.links("getPublishedModel"), null, 4));
  payload = {
    qs: {
      limit: 1000
    }
  };
  */

  debugger;
  r = await store.apiCall(modelPublish.links("getPublishedModel"), payload);

  print.itemsList(r, 'Published Models');

  // console.log(JSON.stringify(files.links("files", "link"), null, 4));

  store.endStore();
  return true;
}

setup(
  payload,
  "reports",
  "reportImages",
  "reportTransforms",
  "compute",
  "files",
  "casManagement",
  "modelPublish",
  "jobExecution"
)
  .then(r => console.log(r))
  .catch(e => {
       console.log('failed');
       console.log(e);
  });
