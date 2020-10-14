#!/usr/bin/env node
/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Reference: https://medium.com/@chrisjpatty/extending-create-react-app-to-make-your-own-app-generator-5d7b1ddc246

let argv = require('yargs').argv;
let colors = require('colors');

let installPackages = require('./installPackages');
let createReactApp = require('./createReactApp');
let updateTemplates = require('./updateTemplates');
let createFromTemplate = require('./createFromTemplate');

let reactAppName = process.argv[ 2 ];
let scriptTag = argv.script == null ? ' ' : argv.script;
let installList = argv.i == null ? null : argv.i;
let title = argv.title == null ? 'SAS/Viya Application' : argv.title;
let appName = argv.webapp == null ? 'viyademo' : argv.webapp;
let appDirectory = `${process.cwd()}/${reactAppName}`;
let template = argv._[ 1 ];



let repo = argv.repo == null ? 'https://github.com/sassoftware/restaf' : argv.repo;


console.log('------------------------------------------------');
console.log(`Local Repo   : ${reactAppName}`);
console.log(`appName      : ${appName}`);
console.log(`title        : ${title}`);
console.log(`scriptTag    : ${scriptTag}`);
console.log(`install      : ${installList}`);
console.log(`appDirectory : ${appDirectory}`);
console.log(`template     : ${template}`);
console.log(`template Repo: ${argv.repo}`);
console.log('------------------------------------------------');

const run = async () => {
	if (template == null) {
		let success = await createReactApp(reactAppName);
		if (!success) {
			console.log('Something went wrong while trying to create a new React app using create-react-viya-app'.red);
			return false;
		}
		await installPackages(appDirectory, installList, true);
		await updateTemplates(appDirectory, appName, scriptTag, title);
	} else {
		let success = await createFromTemplate(repo, template, reactAppName, appName, appDirectory, scriptTag, title);
		
		if (!success) {
			console.log('Something went wrong while creating new React app using create-react-viya-app'.red);
			return false;
		}
		if (installList !== null) {
			await installPackages(appDirectory, installList, false);
		}
	}
};

if (reactAppName== null) {
	console.log('Application directory required'.red);
	process.exit(0);
}
run()
	.then(() => {
		console.log('\nApplication has been created successfully \n'.green);
		console.log(`\nPlease configure .env file to suite your needs\n`.green);

		console.log(`This application is setup to access SAS Viya using the libraries listed below`);
		let t = [
			{ Library: 'restaf', Purpose: 'Use this to make API calls to SAS Viya' },
			{ Library: 'restaflib', Purpose: 'Use this for common SAS Viya usage patterns' },
			{ Library: 'restaf-server', Purpose: 'Authenticate with SAS Viya and server up the app' }
		];
		console.table(t);
		if (installList !== null) {
			console.log(`Additional libraries installed: ${installList}`);
		}
		console.log(
			`\nFor development run this command:    
		        yarn dev`.cyan
		);
		console.log(
			`\nFor standard application mode run this command(after npm run build)
			    yarn app`.cyan
		);
	})
	.catch((err) => {
		console.log(`${err}`.red);
	});