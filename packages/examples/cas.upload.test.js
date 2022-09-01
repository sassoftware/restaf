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
let fs = require('fs');
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});

test('upload SAS program using restaflib', async () => {
	expect.assertions();
	let l = await testFunctions.casUploadProgram2(true, testInfo);
	expect(l).toMatchSnapshot();
});


test('upload a CSV using restaflib', async () => {
	expect.assertions();
	let l = await testFunctions.casUploadCsv2(true, testInfo);
	expect(l).toMatchSnapshot();
});

test('upload a CSV using restaflib+altsrc', async () => {
	expect.assertions();
	let l = await testFunctions.casUploadCsv3(true, testInfo);
	expect(l).toMatchSnapshot();
});


test.only('upload a CSV using casUpload', async () => {
	expect.assertions();
	let l = await testFunctions.casUploadnew(true, testInfo);
	expect(l).toMatchSnapshot();
});

test('append cas table', async () => {
	expect.assertions();
	let l = await testFunctions.casAppendTable1(true, testInfo);
	expect(l).toMatchSnapshot();
});


test('upload a score hdat and score it using restaflib', async () => {
	expect.assertions();
	let l = await testFunctions.casUploadhdat(true, testInfo);
	expect(l).toMatchSnapshot();
});

test('upload astore using restaflib', async () => {
	expect.assertions();
	let l = await testFunctions.casUploadAst(true, testInfo);
	expect(l).toMatchSnapshot();
});
