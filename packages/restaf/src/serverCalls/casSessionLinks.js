/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = function casSessionLinks (uri, urihttp, casHttp, server, casProxyFlag){
 
	let href = (casProxyFlag === true) ? `${uri}/actions` : `${urihttp}/actions`;
	let isIdle = casProxyFlag === true ? `${uri}/isIdle` : `${urihttp}/isIdle`;

    let r =  [
		{
			method        : 'POST',
			href          : href,
			rel           : 'execute',
			uri           : href,
			responseType  : 'application/json',
			type          : 'application/json',
			itemType      : 'application/json',
			title         : 'Run CAS Action',
			customHandling: 'casExecute',
			casHttp       : casHttp,
			server        : server,
			extended      : true
		},
		/*
		{
			method        : 'POST',
			href          : `${urihttp}/actions`,
			rel           : (casProxyFlag === false) ? 'execute' : 'cashttp',
			uri           : `${urihttp}/actions`,
			responseType  : 'application/json',
			type          : 'application/json',
			itemType      : 'application/json',
			title         : 'Run CAS Action',
			customHandling: 'casExecute',
			casHttp       : casHttp,
			server        : server,
			extended      : true
		},
		*/

		{
			method        : 'GET',
			href          : isIdle,
			rel           : 'state',
			uri           : isIdle,
			responseType  : 'application/json',
			type          : 'application/json',
			itemType      : 'application/json',
			title         : 'state',
			customHandling: 'casState',
			casHttp       : casHttp,
			server        : server,
			extended      : true
		}
	];
	return r;
};
