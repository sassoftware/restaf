/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
let fs = require('fs').promises;
module.exports = async function runCmds (store, cmdFile, vorpal) {
	vorpal.log('Starting command file processing');
	let cmds = await fs.readFile(cmdFile, 'UTF8');
	vorpal.log('------------------------------------');
	vorpal.log(cmds);
	vorpal.log('------------------------------------');

	let cmdArray = cmds.split(/\r?\n/);
	let n = cmdArray.length;
	vorpal.log(`No of lines in cmd file: ${n}`);
	for (let i = 0; i < n; i++) {
		let cmd = cmdArray[ i ];
		if (cmd.substr(0, 1) !== '#') {
			if (cmd != null && cmd.length > 0) {
				vorpal.log('------------------------------------');
				vorpal.log(`Command in line[${i + 1}]: ${cmd}`);
				try {
					await vorpal.exec(cmd);
					vorpal.log('------------------------------------');
				} catch (err) {
					vorpal.log(err);
				}
			}
		}
	}
	return 'All cmds processed - waiting on completion';
};

