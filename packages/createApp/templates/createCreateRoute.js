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
module.exports = function createCreateRoute () {
	let code = `
 /*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 /* generated */
let fs = require('fs').promises;

makeIndex('./src/components/viewers')
	.then(() => makeIndex('./src/components/helpers'))
	.catch((err) => {
		console.log(err);
    });
    
async function makeIndex(dir) {

	let files = await fs.readdir(dir);
    let exp = '/* generated with createRoutes.js */ \n';
    let exportListNames = 'export default {\n';

	let exportList = [];
	files.forEach((file) => {
		let [name, ext] = file.split('.');
		if (ext === 'js' && name !== 'index') {
			let imp = "import " + name "  from "  + "'"+name+"'"; \n';
			exp = exp + imp;
            exportList.push(name);
            exportListNames = exportListNames + ' ' + name ', \n';
		}
	});


    exportListNames = exportListNames + '};';

	exp = exp + exportListNames;
	console.log(exp);
    await fs.writeFile(dir + '/index.js', exp);
    `;
	return code;

};
