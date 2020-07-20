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

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup multiple services
 * ---------------------------------------------------------------------------------
 */

let restaf = require('@sassoftware/restaf');

module.exports = async function addServices (args, testInfo) {
  let { store, logger } = testInfo;
  let s = await store.addServices(...args);
  let l = Object.keys(s);
  logger.info(l, 'list of services');

  // test adding existing service
  let s1 = args[ 0 ];
  console.log(s1);
  let t1 = await store.addServices(s1);
  console.log(t1 !== null);

  let t2 = await store.addServices('reports', 'dataMining');
  return l;

};

