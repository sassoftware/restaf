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
	let stepControl = masControl[ modelName ];
	if (stepControl === null) {
		return [];
	}
	let currentStep = (step === null) ? stepControl.stepIds[0]:step;
	let desc = stepControl.stepsRafLink.items(currentStep, 'data', 'inputs');
	if (desc === null) {
		return [];
	} 

	return desc.toJS();
}
export default masDescribe;