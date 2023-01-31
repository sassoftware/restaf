/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * setup access to MAS
 * @module masSetup
 * @category restaflib/mas
 * @param {object} store - restaf store
 * @param {object} models - an array of model names
 * @param {object} logonPayload - null|restaf logon payload
 * 
 * @returns {object} - masControl used in masRun
 * @alias module: masSetup
 * @example 
 *   let masControl = await masSetup(store, ['modelA', 'modelB']);
 */
import getScoreStep from './getScoreStep';
async function masSetup (store,models, logonPayload){
    if (logonPayload != null) {
        await store.logon(logonPayload);
    }
    let { microanalyticScore } = await store.addServices('microanalyticScore');
   
    let control = {
        service: microanalyticScore,
        steps  : {}
    }
    debugger;
    for (let i=0; i < models.length; i++) {
        let m = models[ i ];
        let result = await getScoreStep(store, microanalyticScore, m);
        control.steps[ m ] = result;
    }
    debugger;
    return control;
}
	
export default masSetup;