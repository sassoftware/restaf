/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * setup access to MAS
 * @module masSetup
 * @param {object} store - restaf store
 * @param {object} models - an array of model names
 * @param {object} logonPayload - null|restaf logon payload
 * 
 * @returns {object} - masControl used in masRun
 * @alias module: masSetup
 * @example 
 *   let masControl = await masSetup(store, ['modelA', 'modelB']);
 */
async function masSetup (store,models, logonPayload){
    if (logonPayload != null) {
        await store.logon(logonPayload);
    }
    let {microanalyticScore} = await store.addServices('microanalyticScore');

    let steps = [];
    if (models != null) {
       for (let i=0; i < models.length; i++) {
           let m = models[i];
           let result = await getScoreStep(store, microanalyticScore, m);
           steps[m] = result; 
       }
    }
    return steps;
}

async function getScoreStep (store, microanalyticScore, name) {
    
    let payload = {
      qs: {
          filter: `eq(name,'${name}')`
      }
    };
    
    let modList = await store.apiCall(microanalyticScore.links('modules'), payload);
   // print.itemsList(modList, 'list of all models');
    if (modList.itemsList().size === 0) {
      throw `Error: Model ${name} not found`;
    }
  
    let steps = await store.apiCall(modList.itemsCmd(name, 'steps'));
  
  return steps;
  }
export default masSetup;