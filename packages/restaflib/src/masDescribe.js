/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Score using MAS
 * @module masDescribe
 * @param {object} masControl - object from masSetup
 * @param {string} modelName - name of model to be executed
 * @param {string} step      - if not specified it will try to find score or execute
 * 
 * @returns {object} - return input information
 * @alias module: masDescribe
 * @example
 *    let inputs = restaflib.masDescribe(masControl, 'modela', 'score');
 */
function masDescribe (masControl, modelName, step) {
	let stepControl = masControl.steps[ modelName ];
	if (stepControl === null) {
		return [];
	}
	let currentStep = null;
	if (step == null) {
		let stepIndex = stepControl.stepIds.findIndex(x => (x === 'execute') ||( x === 'score'));
		if (stepIndex === -1 ) {
			return [];
		} else {
			currentStep = stepControl.stepIds[stepIndex];
		}
	} else {
		let stepIndex = stepControl.stepIds.findIndex(x => (x === step));
		if ( stepIndex === -1) {
			return [];
		} else {
			currentStep = step;
		}
	}
	let desc = stepControl.stepsRafLink.items(currentStep, 'data', 'inputs');
	if (desc === null) {
		return [];
	} 

	return desc.toJS();
}
export default masDescribe;