/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function reportList (store, vorpal){

	let reports = store.getServiceRoot('reports');
	let reportsList = await store.apiCall(reports.links('reports'));
	vorpal.log(reportsList.itemsList().toJS());
	let next;
	// do this loop while the service returns the next link or counter is 0

	while ((next = reportsList.scrollCmds('next')) !== null) {
		reportsList = await store.apiCall(next);
		vorpal.log(reportsList.itemsList().toJS());
	}

	return 'done';
};
