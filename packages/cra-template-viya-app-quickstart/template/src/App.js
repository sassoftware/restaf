/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// import PropTypes from 'prop-types';
import AppRouter from './AppRouter';
import defaultStyles from './defaultStyles';
import { AppContext } from './providers';

//
// To start at a different component change the code below
//
function App(props) {
	let { store, appOptions } = props;
	let { host } = appOptions.logonPayload;
	let appName = appOptions.logonPayload.appName;

	let classes = defaultStyles()();
	let contextValue = { classes: classes, ...props };
	// to keep the session active for longer than the default
	if (appOptions.logonPayload.keepAlive != null) {
		let interval = 120;
		let timeout = 14400;
		if (appOptions.logonPayload.timers != null) {
			let opts = appOptions.logonPayload.timers.split(',');
			interval = parseInt(opts[0]);
			timeout = parseInt(opts[1]);
		}
		console.log(`Keepalive is active`);
		store.keepViyaAlive(appOptions.logonPayload.keepAlive, interval, timeout, () => {
			console.log('timed out at', Date());
			let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
			window.open(`${appOptions.logonPayload.host}/SASLogon/timedout`, 'Timed Out', params);
			return true;
		});
	}

	let show = (
		<AppContext.Provider value={contextValue}>
			<AppRouter host={host} appName={appName} classes={classes} {...props}></AppRouter>
		</AppContext.Provider>
	);

	return show;
}
export default App;
