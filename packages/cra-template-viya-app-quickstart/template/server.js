/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let restafServer = require('@sassoftware/viya-appserverjs');
restafServer.icli(null/*customRoutes */, true, customize);

//function customRoutes(options) {
// }


// Supported key values are: APPENV and SWAGGEROPTIONS
// Move what you set in appenv.js to the APPENV object below.
// This will let you run on K9s without the need to mount the location of appenv.js
// Also gives you more flexibility to access other resources to fill in APPENV.

// SWAGGEROPTION is for viya-apiserverjs - to allow you to set to override swagger options


function customize (key) {
	let info = {
		APPENV: {
			homeNotes: process.env.HOMENOTES
		}
	};
	return info[key];
}
