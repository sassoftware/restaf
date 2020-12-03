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
    let { microanalyticScore } = await store.addServices('microanalyticScore');
   
    let steps = [];
    if (models != null) {
       for (let i=0; i < models.length; i++) {
           let m = models[ i ];
           let result = await getScoreStep(store, microanalyticScore, m);
           steps[ m ] = result;
       }
    } else {
        let modList = await store.apiCall(microanalyticScore.links('modules'));
        let size = modList.itemsList().size;  /* TBD: Handle list of models with paging */
        for (let i = 0; i < size; i++) {
            let m = modList.itemsList(i);
            let rafLink = modList.itemsCmd(m, 'steps');
            if (rafLink === null) {
                steps[m] = null;
            } else {
                let result = await store.apiCall(rafLink);
                steps[ m ] = result;       
            }
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
       return null;
    }
   
    let rafLink = modList.itemsCmd(name, 'steps');
    if (rafLink != null) {
        let steps = await store.apiCall(rafLink);
        return steps;
    } else {
        return null;
    }
}
	
export default masSetup;