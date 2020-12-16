import masAddModel from "@sassoftware/restaflib/src/masAddModel";

/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
async function getScoreStep (store, microanalyticScore, name) {
    
    let payload = {
      qs: {
          filter: `eq(name,'${name.trim()}')`
      }
    };
    console.log(payload);
    let modList = await store.apiCall(microanalyticScore.links('modules'), payload);
   // print.itemsList(modList, 'list of all models');
    if (modList.itemsList().size === 0) {
        console.log('failed to query');
       return null;
    }

    let rafLink = modList.itemsCmd(name, 'steps');
    let allSteps = await store.apiCall(rafLink);
    
    let control = {
        name        : name,
        stepsRafLink: allSteps,
        stepIds     : modList.items(name, 'data','stepIds').toJS()
    }
    return control;
     
}

export default getScoreStep;
	