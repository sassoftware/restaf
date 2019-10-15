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

// running a  compute job

"use strict";

let restaf  = require("restaf");
let payload = require('./config')();
let restaflib = require('restaflib');
let {computeSetup, computeRun, print, getLog} = restaflib;

let store = restaf.initStore();

async function example (store, logonPayload) {


  let session = await computeSetup(store, null, logonPayload);

  // Now run a simple data step in that session

  let src =  `data _null_; do i = 1 to 100; x=1; end; run; `;
  
  // Execute code and print the log
  let computeSummary = await computeRun(store, session, null, src);
  let log = await getLog (store, computeSummary);
  print.logListLines(log);
  return 'alldone';
  }

// Run the example
example(store, payload)
  .then(status => console.log(status))
  .catch(err => console.log(err));
