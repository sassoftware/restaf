import masAddModel from "@sassoftware/restaflib/src/masAddModel";

/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
/**
 * @private
 * @module getScoreStep
 * @category restaflib/mas
 * @param {*} store 
 * @param {*} microanalyticScore 
 * @param {*} name 
 * @returns {promise}
 */
async function getScoreStep (store, microanalyticScore, name) {
    
    let payload = {
      qs: {
          filter: `eq(name,'${name.trim()}')`
      }
    };
    debugger;
    let modList = await store.apiCall(microanalyticScore.links('modules'), payload);
   // print.itemsList(modList, 'list of all models');
    if (modList.itemsList().size === 0) {
       return null;
    }
    debugger;
    let rafLink = modList.itemsCmd(name, 'steps');
    let allSteps = await store.apiCall(rafLink);
    debugger;
    let control = {
        name        : name,
        stepsRafLink: allSteps,
        stepIds     : modList.items(name, 'data','stepIds').toJS(),
        microanalyticScore: microanalyticScore
    }
    console.log(control);
    debugger;
    return control;
     
}

export default getScoreStep;
	