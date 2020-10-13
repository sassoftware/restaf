/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
const fs = require('fs').promises;
const rexport = require('./rexport');

module.exports = async function reportExport (store, args, vorpal) {
	let { dir }   = args.options;
	let { files } = args;
	let reports = store.getServiceRoot('reports');

	for (let i = 0; i < files.length; i++){
		let newArgs = {
			options: {
				name: files[ i ],
				dir : dir
			}
		};
		run1(store, reports, newArgs, ((err, r) => {
			vorpal.log(err ? JSON.stringify(err, null,4) : r);
		}));
	}
	return 'Exports started';
};

function run1 (store, reports, args, cb) {
	rexport(store, reports, args)
		.then(r => cb(null, r))
		.catch(e => cb(e));
}
