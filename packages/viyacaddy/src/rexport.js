/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
const fs = require('fs').promises;

module.exports = async function rexport (store, reports, args) {
	let { dir, name } = args.options;

	// get content from the report
	let p = {
		qs: {
			filter: `eq(name,'${name}')`,
		},
	};
	let result = await store.apiCall(reports.links('reports'), p);
	if (result.itemsList().size === 0) {
		throw `Report named ${name} does not exist`;
	}
	if (result.itemsList().size > 1) {
		throw `Multiple reports named ${name} exist`;
	}

	let myreport = result.itemsList(0);
	let rep1 = await store.apiCall(result.itemsCmd(myreport, 'self'));
	p = {
		headers: {
			accept: 'application/vnd.sas.report.content+json',
		},
	};
	let content = await store.apiCall(rep1.links('content'), p);

	//write content to a specified file
	await fs.writeFile(`${dir}/${name}.json`, JSON.stringify(content.items()));
	return `Export of report ${name} to ${dir}/${name}.json completed`;
};
