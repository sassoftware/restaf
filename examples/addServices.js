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

let restaf = require("../lib/restaf");
let payload = require("./config")("restaf.env");
let store = restaf.initStore();
let prtUtil = require("../prtUtil");

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup file service
 * ---------------------------------------------------------------------------------
 */

async function setup (payload, ...args) {
  let msg = await store.logon(payload);
  prtUtil.print(`Logon status: ${msg}`);
  let { compute, casManagement, modelPublish, files } = await store.addServices(
    ...args
  );
  console.log(store.getServices());

  let r = store.getXsrfData();
  console.log("current xsrf tokens");
  console.log(r);

  console.log();
  let s = store.rafObject("modelPublish");
  // console.log(s);

  console.log(JSON.stringify(modelPublish.links("getPublishedModel"), null, 4));
  payload = {
    qs: {
      limit: 1000
    }
  };
  r = await store.apiCall(modelPublish.links("getPublishedModel"), payload);

  console.log(JSON.stringify(r.items(), null, 4));

  console.log(JSON.stringify(files.links("files", "link"), null, 4));

  store.endStore();
  console.log(store.getServices());
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
  .catch(e => console.log(e));