/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

async function masRun (store, masControl, modelName, scenario, step) {
	let steps = masControl[modelName];
	let currentStep = step == null ? steps.itemsList(0) : step;
	let inputs = [];
	for (let r in scenario) {
		let item = { name: r, value: scenario[r] };
		inputs.push(item);
	}
	let scorePayload = {
		data: {
			inputs: inputs
		}
	};
	let result = await store.apiCall(steps.itemsCmd(currentStep, 'execute'),scorePayload);
    let outputs = result.items('outputs').toJS();
    let score = {};
    outputs.map (m => {
        score[m.name] = m.value;
    })
    return score;
}
export default masRun;