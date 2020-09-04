/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let sh = require('shelljs');
module.exports = function installPackages (appDirectory, installList){
	return new Promise((resolve) => {
		console.log(`\nInstalling application dependencies in ${appDirectory}\n`);
		let list = `rimraf @sassoftware/restaf-server @sassoftware/restaf @sassoftware/restaflib react-router-dom cross-env shelljs cross-spawn http-proxy-middleware`;
		if (installList !== null) {
			list = list + ' ' + installList;
		}
		sh.exec(`cd ${appDirectory} && yarn add ${list} && npm audit fix`, () => {
			console.log('\nFinished installing packages\n'.green);
			resolve();
		});
	});
};

