/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const fs = require('fs').promises;

module.exports = async function rimport (store, reports, args) {
	let { file, name, uri } = args.options;
	// delete old version of report
	let p = {
		qs: {
			filter: `eq(name,'${name}')`,
		},
	};
	let oldReport = await store.apiCall(reports.links('reports'), p);
	if (oldReport.itemsList().size > 0) {
		await store.apiCall(oldReport.itemsCmd(name, 'delete'));
	}

	// create an empty report
	let payload = {
		qs: {
			parentFolderUri: uri,
		},
		data: {
			name       : name,
			description: name,
		},
	};
	let newReport = await store.apiCall(reports.links('createReport'), payload);

	// read file and update the content of the new report
	let savedReport = await fs.readFile(file);
	let type = 'json';
	if (file.search('.xml') >= 0) {
		type = 'xml';
	}
	payload = {
		headers: {
			'Content-Type': `application/vnd.sas.report.content+${type}`,
			'Accept'      : '*/*',
		},
		data: `${savedReport}`,
	};
	await store.apiCall(newReport.links('updateContent'), payload);

	return `Import of ${file} as report ${name} completed`;
};