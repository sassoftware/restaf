/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { masSetup, masDescribe, masRun } from '@sassoftware/restaflib';
/**
 * @description Score a MAS model
 * @async
 * @private
 * @module masScoring
 * @category builtins
 * @param {string} modelName - published name
 * @param {object} data - data to be scored
 * @param {boolean} uflag - if true, remove the last character(_) from the variable name
 * @param {*} appEnv - appEnv
 * @returns {object} - {status: {statusCode: 0, msg: null}, results: masRun results}
 * @example
 * let result = await appEnv.builtins.masScoring('mycoolmodel', {x1: 1, x2: 2}, appEnv);
 * 
 */
async function masScoring(appEnv, modelName, data, uflag) {
  //setup once per sessison
  // const  { masSetup, masDescribe, masRun } = appEnv.builtins.restaflib;
  let inputs = {};
  let masControl;
  try {
    masControl = await masSetup(appEnv.store, [modelName]);
    let describe = await masDescribe(masControl, modelName);
    inputs = {};
    describe.forEach(d => {
      inputs[d.name] = null;
    });
      // took out the optimiztion - it seems to be causing issues
     // appEnv.appSession.masScoring = { masControl: masControl, inputs: inputs };
    let scenario = {};
    for (let v in inputs) {
       let v1 = (uflag === true) ? v.substring(0, v.length - 1) : v;
       //v1 = v.startsWith('_') ? v.substring(0, v.length - 1) : v;
      scenario[v] = (data[v1] == null) ? null : data[v1];
    }
    let result = await masRun(appEnv.store, masControl, modelName, scenario);
    
    return { status: { statusCode: 0, msg: null }, results: result };
  } catch (err) {
    console.log(err);
    return { status: { statusCode: 2, msg: err }, results: {} };
  }
}

export default masScoring;