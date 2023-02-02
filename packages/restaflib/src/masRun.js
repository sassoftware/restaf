/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Score using MAS
 * @module masRun
 * @param {store} restaf store
 * @category restaflib/mas
 * @param {object} masControl - object from masSetup
 * @param {string} modelName - name of model to be executed
 * @param {object} scenario - can be [{name: var1, value: value1},{...} ] or {varname: value,...}
 * @param {string} stepName  - if not specified it will default to score or execute
 * 
 * @returns {promise} - returns scoring results
 * @alias module: masrun
 * @example
 * async function example (models, payload) {
 *   await store.logon(payload);
 * let masControl = await restaflib.masSetup(store, models);
 * let defaults = {
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
 * let inp = restaflib.masDescribe(masControl, models[0], 'score');
 * print.object(inp, 'describe for score model');
 * inp = inp.map((n) => {
 *   n.value = defaults[n.name];
 *   return n;
 * });
 * print.object(inp, 'updated input for score model');
 * let result = await restaflib.masRun (store, masControl, models[0], inp, 'score');
 * print.object(result, 'scoring result');
 * }
 */
async function masRun (store, masControl, modelName, scenario, step, cmd) {
	let stepControl = masControl.steps[modelName];
	;
	let inputIsArray = false;
	let inputs = [];
	if (Array.isArray(scenario) === false) {
		for (let r in scenario) {
			let item = { name: r, value: scenario[r] };
			inputs.push(item);
		}
	} else {
		inputIsArray = true;
	}
	let scorePayload = {
		data: {
			inputs: (inputIsArray === true) ? scenario : inputs
		}
	};
	let currentStep = null;
	//TBD: Need to convert stepId from array to object for cleaner coding
	;
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
	if (cmd == null) {
		cmd = 'execute';
	}
	

	;
	let rafLink = stepControl.stepsRafLink.itemsCmd(currentStep,cmd);
	if (rafLink === null) {
		let t= [
			{
			name : 'Error',
			type : 'string',
			value: `name: ${modelName} step: ${step} operation: ${cmd} is an invalid combination`
			}
		];
		return t;
	}

	let result = await store.apiCall(rafLink, scorePayload);
	let outputs = result.items('outputs').toJS();

	let score;
	if (inputIsArray === true) {
		score = outputs;
	} else {
		score = {};
		outputs.map (m => {
			score[m.name] = m.value;
		});
	}
    return score;
}
export default masRun;