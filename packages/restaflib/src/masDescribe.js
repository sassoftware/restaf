/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Score using MAS
 * @module masDescribe
 * @param {object} masControl - object from masSetup
 * @param {string} modelName - name of model to be executed
 * @param {string} step      - if not specified it will default to the first step
 * 
 * @returns {object} - return input information
 * @alias module: masDescribe
 * @example
 *    let inputs = restaflib.masDescribe(masControl, 'modela', 'score');
 */
function masDescribe (masControl, modelName, step) {

	let steps = masControl[ modelName ];
	let currentStep = (step == null) ? 'score' : step;
	let desc = steps.items(currentStep, 'data', 'inputs').toJS();
	return desc;
}
export default masDescribe;