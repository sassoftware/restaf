#!/usr/bin/env node
/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
 'use strict';

const restaf     = require('@sassoftware/restaf');
const vorpal     = require('vorpal')();
const fss        = require('fs');
const fs         = fss.promises;
const config     = require('./src/config');
const logon      = require('./src/logon');
const addClient  = require('./src/addClient');
const delClient  = require('./src/delClient');
const listClient = require('./src/listClient');
const detailClient = require('./src/detailClient');

const runCmds    = require('./src/runCmds');

let argv = require('yargs').argv;
let cmdFile = argv.file == null ? null : argv.file;
let envFile = argv.env == null ? null : argv.env;
let host = argv.host == null ? null : argv.host;
let ttl = argv.ttl == null ? null : argv.ttl;
let clientConfigFile = argv.cfile == null ? null : argv.cfile; 
let clientConfig = null;

if (host !== null) {
    process.env.VIYA_SERVER = host;
    console.log(`VIYA_SERVER set to: ${process.env.VIYA_SERVER}`);
}
let payload = config(envFile);

let store  = restaf.initStore({sslOptions: payload.sslOptions});
if (clientConfigFile !== null ) {
    let draw = fss.readFileSync(clientConfigFile, 'utf8');
    clientConfig = JSON.parse(draw);
    console.log(clientConfig);

}

// let clientConfig = (process.env.CLIENTIDCONFIG != null) ? process.env.CLIENTIDCONFIG : null;


runCli(store, cmdFile);

function runCli (store, cmdFile) {
   
    vorpal
        .command('logon')
        .description('Logon to Viya')
        .action((args, cb)=> {
           
            vorpal.activeCommand.prompt({
                type   : 'input',
                name   : 'user',
                message: 'Enter your userid> '
            }, (result) => {
                payload.user = result.user;
                vorpal.activeCommand.prompt ({
                    type   : 'password',
                    name   : 'password',
                    message: 'Enter your password> '
                }, (result)=> {
                    payload.password = result.password;
                    logon(store, payload, vorpal)
                        .then (r => {
                            vorpal.log('Logon Successful');
                            cb();
                        })
                        .catch (err => {
                            vorpal.log(err);
                            cb();
                        });     
                });
            });
        });
    
    vorpal
        .command('list [all]')
            .description('List clients. Use all option to include system clientids')
            .action ((args,cb) => {
                listClient(store, args.all, vorpal)
                .then(r => { vorpal.log(r); vorpal.log(r); cb();})
                .catch(e => { vorpal.log(e); cb();});
            });
    vorpal
        .command('config <config>')
            .description('File containing the configuration for clientid registeration')
            .action ((args,cb) => {
                fs.readFile(args.config, 'UTF8')
                 .then (dataraw => {
                    clientConfig = JSON.parse(dataraw);
                    vorpal.log(`Clientid config set to:`);
                    vorpal.log(JSON.stringify(clientConfig, null,4));
                    cb();
                 })
                 .catch(err => {
                     vorpal.log(err);
                     cb();
                 });
            });
    vorpal
        .command('new <clientid>')
            .alias('add')
            .description('Add a new client with specified name')
            .option('-t --type <type>', 'Grant Type')
            .option('-r --redirect [redirect]', 'Redirect uri')
            .option('-s --secret [secret]', 'Secret')

            .action ((args, cb) => {
               addClient(store, args.clientid, args.options, clientConfig, ttl)
               .then(r => { vorpal.log(r); cb();})
               .catch(e => { vorpal.log(e); cb();});
            });
    vorpal
        .command('delete <clientid>')
            .alias('del')
            .description('Delete specified client')
            .action ((args,cb) => {
                delClient(store, args.clientid)
                .then(r => { vorpal.log(r); cb();})
                .catch(e => { vorpal.log(e); cb();});
            });
     vorpal
			.command('details <clientid>')
			.alias('desc')
			.description('Details of selected clienti')
			.action((args, cb) => {
				detailClient(store, args.clientid)
					.then((r) => {
						vorpal.log(r);
						cb();
					})
					.catch((e) => {
						vorpal.log(e);
						cb();
					});
			});
    vorpal
        .command('token <file>')
        .description('save current oauth token to specified file')
        .action((args, cb) => {
            let token = store.connection().token;
            fs.writeFile(args.file, token)
                .then(r => {
                    vorpal.log(`token written to ${args.file}`);
                    cb();
                })
                .catch(e => {
                    vorpal.log(e);
                    cb();
                });
        });


    vorpal
        .delimiter ('>> ')
        .log('--------------------------------------')
        .log('Welcome to @sassoftware/registerclient')
        .log('Enter help to get a list of all the commands')
        .log('Use logon command to start your SAS Viya session. User must be an admin.')
        .log('');

    if (cmdFile === null) {
        vorpal.show();
    } else {
        logon(store, payload)
            .then (() => runCmds(store, cmdFile, vorpal))
            .then (r  => console.log(r))
            .catch(err => {
                vorpal.log(err);
        });    
    }
}