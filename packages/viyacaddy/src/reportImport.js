/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const fs = require('fs').promises;
const rimport = require('./rimport');

module.exports = async function reportImport (store, args, vorpal) {
	let { dir, files } = args;
	let { folder, uri } = args.options;

	let folders = store.getServiceRoot('folders');
	let reports = store.getServiceRoot('reports');
	
	if (uri == null) {
		let p = {
			qs: {
				filter: `eq(name,'${folder}')`,
			},
		};
		let folderList = await store.apiCall(folders.links('folders'), p);
		uri = folderList.itemsCmd(folder, 'self', 'link', 'uri');
	}

	if (files[0] === '*') {
		files = await fs.readdir(dir);
	} 

	let n = files.length;
	for (let i = 0; i < n; i++) {
		let f = files[ i ];
		let ix = f.lastIndexOf('.');
		let name = (ix !== -1) ? f.substr(f, ix) : f;
	
		let newArgs = {
			options: {
				file: `${dir}/${f}`,
				name: name,
				uri : uri
			},
		};

		run1(store, reports, newArgs, (err, r) => {
			vorpal.log(err ? JSON.stringify(err, null,4) : r);
		});
		
	}
	
	return 'Imports started';
};

function run1 (store, reports, args, cb) {
	rimport(store, reports, args)
		.then((r) => cb(null, r))
		.catch((e) => cb(e));
}