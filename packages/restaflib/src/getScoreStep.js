import masAddModel from "@sassoftware/restaflib/src/masAddModel";

/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
async function getScoreStep (store, microanalyticScore, name) {
    
    let payload = {
      qs: {
          filter: `eq(name,'${name}')`
      }
    };
    
    let modList = await store.apiCall(microanalyticScore.links('modules'), payload);
   // print.itemsList(modList, 'list of all models');
    if (modList.itemsList().size === 0) {
       return null;
    }
   

    let cmds = modList.itemsCmd(name);
    if (cmds === null) {
        return null;
    }
    let cmdList = cmds.keySeq().toJS();
    console.log(cmdList);
    let stepName = 'steps';
    if (cmdList.find((c => c === stepName)) == null) {
        stepName = cmdList[0];
    }
    debugger;
    console.log(stepName);
    let rafLink = modList.itemsCmd(name, stepName);
    if (rafLink != null) {
        let steps = await store.apiCall(rafLink);
        debugger;
        let result = {
            rafLink : steps,
            stepName: stepName,
            steps   : steps.items().keySeq().toJS()
        }
       
        return result;
    } else {
        debugger;
        return null;
    }
}

export default getScoreStep;
	