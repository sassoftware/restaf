/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let fs = require('fs').promises;

makeIndex('./src/components/viewers')
	.then(() => makeIndex('./src/components/helpers'))
	.catch((err) => {
		console.log(err);
	});
async function makeIndex (dir) {
	let files = await fs.readdir(dir);
	let exp = '/* generated with createRoutes.js */ \n';
	let exportListNames = 'export default {\n';

	let exportList = [];
	files.forEach((file) => {
		let [ name, ext ] = file.split('.');
		if (ext === 'js' && name !== 'index') {
			let imp = `import ${name} from './${name}'; \n`;
			exp = exp + imp;
			exportList.push(name);
			exportListNames = exportListNames + `${name},\n`;
		}
	});

	exportListNames = exportListNames + '};';

	exp = exp + exportListNames;
	console.log(exp);
	await fs.writeFile(`${dir}/index.js`, exp);
}
