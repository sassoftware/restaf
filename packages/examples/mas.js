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

let restaf = require('@sassoftware/restaf');
let payload = require('./config')();
let store = restaf.initStore();
let restaflib = require('@sassoftware/restaflib');
let {print} = restaflib;

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup file service
 * ---------------------------------------------------------------------------------
 */

async function example (payload, models) {
  await store.logon(payload);
  let masControl = await restaflib.masSetup(store, models);
  let defaults = {
    prescriber_count : 1,
    strength_per_unit: 15,
    age              : 74,

    avg_opioid_prescriber_rate: 10.4,

    doctorshop_med : 1,
    max_avg_med_90 : 10,
    max_mme_per_day: 40,

    max_opioid_prescriber_rate: 13.21,

    opioid_days: 3
  };
  
  let inp = restaflib.masDescribe(masControl, models[0], 'score');
  print.object(inp, 'describe for score model');
  
  inp = inp.map((n) => {
    n.value = defaults[n.name];
    return n;
  });

  print.object(inp, 'updated input for score model');

  let result = await restaflib.masRun (store, masControl, models[0], inp, 'score');
  print.object(result, 'scoring result');
 
}
example (payload, [ 'manuelsgradientboost2' ])
  .then(r => console.log('done'))
  .catch(e => {
       console.log('failed');
       console.log(e);
  });


