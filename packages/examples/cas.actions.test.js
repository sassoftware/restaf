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

test('CAS Session', async () => {

	let r = await testFunctions.casSession(testInfo);
	expect(r).toBe('done');
});

test('CAS Echo', async () => {

	let r = await testFunctions.casEcho(testInfo);
	expect(r).toBe('done');
});

test('CAS DataStep and Fetch', async () => {
	let r = await testFunctions.casDSandFetch(testInfo);
	expect(r).toMatchSnapshot();
});

test('CAS Tables', async () => {
	let r = await testFunctions.casTables(testInfo);
	expect(r).toBe('done');
});

test('CAS upload csv', async () => {
	let r = await testFunctions.casUploadCsv(testInfo);
	expect(r).toMatchSnapshot();
});