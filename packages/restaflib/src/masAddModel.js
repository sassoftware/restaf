/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * setup access to MAS
 * @module masSetup
 * @param {object} store - restaf store
 * @param {object} masControl - control  object from masSetup
 * @param {object} models - array of models to add
 * 
 * @returns {object} - masControl used in masRun
 * @alias module: masSetup
 * @example 
 *   let masControl = await masSetup(store, ['modelA', 'modelB']);
 */
async function masAddModel (store,masControl, models, options){
  
    let  microanalyticScore  = store.getServiceRoot('microanalyticScore');
        for (let i=0; i < models.length; i++) {
            let m = models[ i ];
            if (options === 'delete') {
                masControl[ m ] = null;
            } else if (masControl[ m ] == null) {
                let result = await getScoreStep(store, microanalyticScore, m);
                masControl[ m ] = result;
            }
    }
    return true;
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
	
export default masAddModel;