/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Score using MAS
 * @module masScore
 * @category restaflib/mas
 * @param {store} restaf store
 * @param {string} modelName - name of model to be executed
 * @param {object} scenario - can be [{name: var1, value: value1},{...} ] or {varname: value,...}
 * @returns {promise} - returns scoring results
 * @alias module: masScore
 * @example
 * async function example (store, model) {
 *   let scenario = {
 *    prescriber_count : 1,
 *    strength_per_unit: 15,
 *    age              : 74,
 *    avg_opioid_prescriber_rate: 10.4,
 *    doctorshop_med : 1,
 *    max_avg_med_90 : 10,
 *    max_mme_per_day: 40,
 *    max_opioid_prescriber_rate: 13.21,
 *    opioid_days: 3
 * };
 * 
 * let result = await restaflib.masScore (store, model, scenario);
 * print.object(result, 'scoring result');
 * }
 */
import masSetup from './masSetup';
import masRun from './masRun';

async function masScore ( store, modelName, scenario ) {
	let masControl = await masSetup( store,[ modelName ] );
    let r = await masRun( store,masControl, modelName, scenario, 'score', 'execute' );
    return r;
}
export default masScore;