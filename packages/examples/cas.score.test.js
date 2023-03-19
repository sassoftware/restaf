/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
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