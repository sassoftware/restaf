/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let sh = require('shelljs');
let fs = require('fs');
let jsonFormat = require('json-format');

module.exports = function createFromTemplate (repo, template, reactAppName, appName, appDir) {
	return new Promise((resolve,reject) => {
        console.log('Creating app with template');
        console.log(`git clone ${repo} ${reactAppName} -b ${template}`);
        if (sh.exec(`git clone ${repo} ${reactAppName} -b ${template}`).code === 0) {
            console.log(`Using ${template} as template`);
            let dockfile = require('./templates/dockfile')(appName);
            fs.writeFileSync(appDir + '/Dockerfile', dockfile, 'utf8');

            let env = require('./templates/env')(appName);
            fs.writeFileSync(appDir + '/.env', env, 'utf8');

            let envlocal = require('./templates/envlocal')(appName);
            fs.writeFileSync(appDir + '/.env.local', envlocal, 'utf8');

            let jString = fs.readFileSync(appDir + '/package.json', 'utf8');
            let pjson = JSON.parse(jString);
            pjson.name = `${reactAppName}`;

            fs.writeFileSync(appDir + '/package.json', jsonFormat(pjson), 'utf8');
            sh.cd(appDir);
            if (sh.exec('yarn').code === 0) {
                resolve(true);
            } else {
                reject('yarn install failed');
            }
        } else {
            reject('cloning of template failed');
        }
		});
};
