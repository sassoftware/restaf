/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let sh = require('shelljs');
let fs = require('fs');
let jsonFormat = require('json-format');

module.exports = function createFromTemplate (repo, template, reactAppName, appName, appDir, scriptTag, title) {
	return new Promise((resolve,reject) => {
        console.log('Creating app with template');
        console.log(`git clone ${repo} ${reactAppName} -b ${template}`);
        if (sh.exec(`git clone ${repo} ${reactAppName} -b ${template}`).code === 0) {
            console.log(`Using ${template} as template`);

            // Files for the root directory
            let dockfile = require('./templates/dockfile')(appName);
            fs.writeFileSync(appDir + '/Dockerfile', dockfile, 'utf8');

            let env = require('./templates/env')(appName);
            fs.writeFileSync(appDir + '/.env', env, 'utf8');

            let envlocal = require('./templates/envlocal')(appName);
            fs.writeFileSync(appDir + '/.env.local', envlocal, 'utf8');

            let server = require('./server')(appName);
            fs.writeFileSync(appDir + '/server.js', server, 'utf8');


            // src directory

            let setupProxy = require('./templates/src/setupProxy.js')(appName);
            fs.writeFileSync(appDir + '/src/setupProxy.js', setupProxy, 'utf8');

            // src?providers

            /*
            sh.mkdir(appDir + '/src/providers');

            let AppContext = require('./templates/src/providers/AppContext')();
            let AppProvider = require('./templates/src/providers/AppProvider')();
            let ind3 = require('./templates/src/providers/index')();
            let withAppContext = require('./templates/src/providers/withAppContext')();
            let setupViya = require('./templates/src/providers/setupViya')();
            let itemsListViewer = require('./templates/src/components/ItemsListViewer')();
            fs.writeFileSync(appDir + '/src/providers/AppContext.js', AppContext, 'utf8');
            fs.writeFileSync(appDir + '/src/providers/AppProvider.js', AppProvider, 'utf8');
            fs.writeFileSync(appDir + '/src/providers/index.js', ind3, 'utf8');
            fs.writeFileSync(appDir + '/src/providers/withAppContext.js', withAppContext, 'utf8');
            fs.writeFileSync(appDir + '/src/providers/setupViya.js', setupViya, 'utf8');
            fs.writeFileSync(appDir + '/src/components/ItemsListViewer.js', itemsListViewer, 'utf8');
            */
            
            // finally update the package.json

            let jString = fs.readFileSync(appDir + '/package.json', 'utf8');
            let pjson = JSON.parse(jString);
            pjson.name = `${reactAppName}`;
            pjson.scripts.buildapp = `node createRoutes && cross-env REACT_APP_APPNAME=${appName} react-scripts build`;
            pjson.scripts.startdapp = `node createRoutes && cross-env REACT_APP_APPNAME=${appName} react-scripts start`;
            pjson.scripts.dkrbuild = `docker build -f Dockerfile -t ${appName} .`;
            pjson.scripts.dkrrun = `docker run --env-file .env  -p 5000:8080 -t ${appName}`;
            
            fs.writeFileSync(appDir + '/package.json', jsonFormat(pjson), 'utf8');

            // now run yarn and install all the packages (except custom install)
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
