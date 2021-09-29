#!/usr/bin/env node
/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const restaf  = require('@sassoftware/restaf');
const vorpal  = require('vorpal')();
const config  = require('./src/config');
const logon   = require('./src/logon');
const runCmds = require('./src/runCmds');
const upload = require('./src/upload');
const tableImport = require('./src/tableImport');
const reportImport = require('./src/reportImport');
const reportExport = require('./src/reportExport');
const caslibList = require('./src/caslibList');
const reportList = require('./src/reportList');
const tablesList = require('./src/tablesList');
const privateCR  = require('./src/privateCR');
const fs = require('fs');

let argv = require('yargs').argv;
let cmdFile = argv.file == null ? null : argv.file;
let host = argv.host == null ? null : argv.host;
let envFile = argv.env == null ? null : argv.env;

console.log('cmdFile:', cmdFile);
console.log('host ', host);
console.log('env ', envFile);

if (host !== null) {
    process.env.VIYA_SERVER = host;
    console.log(`VIYA_SERVER set to: ${process.env.VIYA_SERVER}`);
}

let payload = config(envFile);

console.log(payload);
let store = restaf.initStore();

// let store = restaf.initStore();


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
								.then(() => {
									vorpal.log('Logon Successful');
									cb();
								})
								.catch(err => {
									vorpal.log(JSON.stringify(err,null,4));
									cb();
								});
						}
					);
				}
			);
		});
	
	vorpal
		.command('privatecr')
		.alias('cr')
		.description('Create a domain, create credentials and register cr')
		.validate((args) => {
			if (args.options.file == null ) {
				return 'Specify config file';
			}
			return true;
		})
		.option('-f --file <file>', 'JSON configuration file')
		.action((args, callback) => {
			privateCR(store, args, vorpal)
				.then((r) => {
					vorpal.log(r);
					callback();
				})
				.catch((err) => {
					vorpal.log(err);
					callback();
				});
		});

	vorpal

		.command(
			'upload',
			'Upload resources (data, code and astore)to cas tables')
		.hidden()
		.description('upload code, data or astore to sashdat')
		.validate(args => {
			if (args.options.file == null || args.options.output == null) {
				return 'Both file and output must be specified';
			}
			return true;
		})
		.option(
			'-f --file <file>',
			'Currently supported extensions: sas, ds2, casl, sashdat, sasb7dat, astore , sasast, csv'
		)
		.option(
			'-o --output <output>',
			'output castable(caslib.name)- name will be upper-cased'
		)

		.action((args, callback) => {
			upload(store, args, vorpal)
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
		.command('tables import <dir> [files...]', 'import .sas, .ds2, .sashdat, .sasb7dat, .astore , .sasast, .csv')
		.description('Import .sas, .ds2, .sashdat, .sasb7dat, .astore , .sasast, .csv into CAS Tables')
		.validate((args) => {

			let options = args.options;
			if (options.caslib == null) {
				return 'Target caslib must be specified';
			}
			return true;
		})
		// .option('-d --dir <dir>', 'input directory')
		.option('-c --caslib <caslib>', 'target caslib')

		.action((args, callback) => {
			tableImport(store, args, vorpal)
				.then((r) => {
					vorpal.log(r);
					callback();
				})
				.catch((err) => {
					vorpal.log(err);
					callback();
				});
		});
	
	

	vorpal
		.command('reports list', 'List all reports')
		.description('List all the VA reports')
		.action((args, callback) => {
			reportList(store, vorpal)
				.then(r => callback())
				.catch(err => {
					vorpal.log(err);
					callback();
				});
		});
	
	vorpal
		.command('reports import <dir> [files...]', 'import VA reports')
		.description('Import VA reports')
		.validate((args) => {
			let options = args.options;
			if (options.folder == null && options.uri == null) {
				return('Specify either folder or uri');
			}
			return true;
		})
		// .option('-d --dir <dir>','input directory')
		.option('-f --folder <folder>', 'name of output folder(ex: Public)')
		.option('-u --uri <uri>', 'specify parentUri in place of folder name')

		.action((args, callback) => {
			reportImport(store, args, vorpal)
				.then((r) => {
					vorpal.log(r);
					callback();
				})
				.catch((err) => {
					vorpal.log(err);
					callback();
				});
		});
	vorpal
		.command('reports export [files...]', 'Export report')
		.description('Export VA reports')
		.validate((args) => {
			if (args.options.dir == null) {
				vorpal.log('Destination directory must be specified');
				return false;
			}
			return true;
		})
		.option('-d --dir <dir>', 'destination path(without filename')

		.action((args, callback) => {
			reportExport(store, args, vorpal)
				.then((r) => {
					vorpal.log(r);
					callback();
				})
				.catch((err) => {
					vorpal.log(err);
					callback();
				});
		});
	
	vorpal
		.command('caslibs', 'List all caslibs')
		.description('List all active caslibs')
		.action((args, callback) => {
			caslibList(store, args, vorpal)
				.then(() => {
					callback();
				})
				.catch((err) => {
					vorpal.log(err);
					callback();
				});

		});
	
	vorpal
		.command('tables list <caslib> ', 'List tables in a caslib')
		.description('List tables in a specified caslib')
		.action((args, callback) => {
			tablesList(store, args, vorpal)
				.then(() => {
					callback();
				})
				.catch((err) => {
					vorpal.log(err);
					callback();
				});
		});
	
	vorpal
		.delimiter('>> ')
		.log('Welcome to @sassoftware/viyacaddy')
		.log('Enter help to get a list of all the commands')
		.log('Use logon command to start your SAS Viya session')
		.log('');

	if (cmdFile === null) {
		vorpal.show();
	} else {
		logon(store, payload)
			.then(()=> {
				vorpal.log(`command file: ${cmdFile}`);
				return runCmds(store, cmdFile, vorpal);
			})
			.then(r => console.log(r))
			.catch(err => {
				vorpal.log(JSON.stringify(err,null,4));
			});
	}
}
