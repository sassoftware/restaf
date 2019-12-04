#!/usr/bin/env node --no-warnings
/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const restaf = require('restaf');
const vorpal = require('vorpal')();
const config = require('./config');
const logon = require('./src/logon');
const runCmds = require('./src/runCmds');
const upload = require('./src/upload');
const fs     = require('fs');

let servers = null;
let argv = require('yargs').argv;
let cmdFile = argv.file == null ? null : argv.file;
let envFile = argv.env == null ? null : argv.env;

debugger;
// setup handling of https
let initOpts = { pem: null, rejectUnathorized: 1 };
if (process.env.PEMFILE != null) {
	console.log(`pem file set to: ${process.env.PEMFILE}`);
	let pem =
		process.env.pemFile != null
			? fs.readFileSync(process.env.pemFile, 'utf8')
			: null;
	initOpts = { pem: pem, rejectUnauthorized: 0 };
}

let store = restaf.initStore(initOpts);
let payload = config(envFile);

runCli(store, cmdFile);

function runCli (store, cmdFile) {
	vorpal
		.command('logon')
		.description('Logon to Viya')
		.action((args, cb) => {
			vorpal.activeCommand.prompt(
				{
					type   : 'input',
					name   : 'user',
					message: 'Enter your userid> '
				},
				result => {
					payload.user = result.user;
					vorpal.activeCommand.prompt(
						{
							type   : 'password',
							name   : 'password',
							message: 'Enter your password> '
						},
						result => {
							payload.password = result.password;
							logon(store, payload)
								.then(r => {
									servers = r.servers;
									vorpal.log('Logon Successful');
									cb();
								})
								.catch(err => {
									vorpal.log(err);
									cb();
								});
						}
					);
				}
			);
		});

	vorpal
		.command(
			'upload',
			'Upload resources (data, code and astore)to cas tables'
		)
		.description('upload code, data or astore to sashdat')
		.validate(args => {
			if (args.options.file == null || args.options.output == null) {
				return 'Both file and output must be specified';
			}
			return true;
		})
		.option(
			'-f --file <file>',
			'Currently supported extensions: sas, ds2, casl, sashdat, sasb7dat, astore , csv'
		)
		.option(
			'-o --output <output>',
			'output castable(caslib.name)- name will be upper-cased'
		)

		.action((args, callback) => {
			upload(store, servers, args, vorpal)
				.then(r => {
					vorpal.log(r);
					callback();
				})
				.catch(err => {
					vorpal.log(err);
					callback();
				});
		});

	vorpal
		.delimiter('>> ')
		.log('Welcome to viyacaddy')
		.log('Enter help to get a list of all the commands')
		.log('Use logon command to logon')
		.log('');

	if (cmdFile === null) {
		vorpal.show();
	} else {
		logon(store, payload)
			.then(r => {
				servers = r.servers;
				console.log(`command file: ${cmdFile}`);
				return runCmds(store, cmdFile, vorpal);
			})
			.then(r => console.log(r))
			.catch(err => {
				vorpal.log(err);
			});
	}
}
