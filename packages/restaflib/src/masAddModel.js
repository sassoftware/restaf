/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * setup access to MAS
 * @module masSetup
 * @category restaflib/mas
 * @param {object} store - restaf store
 * @param {object} masControl - control  object from masSetup
 * @param {object} models - array of models to add
 * 
 * @returns {object} - masControl used in masRun
 * @alias module: masSetup
 * @example 
 *   let masControl = await masSetup(store, ['modelA', 'modelB']);
 */
import getScoreStep from './getScoreStep';

async function masAddModel (store,masControl, models){
    let  microanalyticScore  = masControl.service;
    for (let i=0; i < models.length; i++) {
        let m = models[ i ];
        if (masControl.steps[m] == null) {
            let result = await getScoreStep(store, microanalyticScore, m);
            masControl.steps[m] = result;
        } 
    }
    return true;
}


	
export default masAddModel;