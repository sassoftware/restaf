/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let sh = require('shelljs');
module.exports = installPackages = (appDirectory) => {
	return new Promise((resolve) => {
		console.log(`\nInstalling application dependencies in ${appDirectory}\n`);
		sh.exec(`cd ${appDirectory} && yarn add rimraf @sassoftware/restaf-server @sassoftware/restaf @sassoftware/restaflib cross-env cross-spawn http-proxy-middleware && npm audit fix`, () => {
			console.log('\nFinished installing packages\n'.green);
			resolve();
		});
	});
};
