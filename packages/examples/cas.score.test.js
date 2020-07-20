/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';
let testFunctions = require('./testFunctions');
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});

test('Upload sasast and score', async () => {
	expect.assertions();
	let l = await testFunctions.casScoreAst(false, testInfo);
	expect(l).toMatchSnapshot();
});


test('Upload hdat and score', async () => {
	expect.assertions();
	let l = await testFunctions.casScoreHdat(false, testInfo);
	expect(l).toMatchSnapshot();
});

test('score thru Mas', async () => {
	expect.assertions();
	if (process.env.MASMODEL != null) {
		let l = await testFunctions.masScore(false, testInfo);
		expect(l).toBe('done');
	} 
});

test('test bad model name', async () => {
	expect.assertions();
	let l = await testFunctions.casScoreAstFail(false, testInfo);
	expect(l).toBe('done');
});