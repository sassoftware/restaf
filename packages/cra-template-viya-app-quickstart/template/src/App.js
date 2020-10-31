import React from 'react';

// import PropTypes from 'prop-types';
import AppRouter from './AppRouter';
import defaultStyles from './defaultStyles';

//
// To start at a different component change the code below
//
function App (props) {
	let { store, appOptions } = props;
	let { host } = appOptions.logonPayload;
	let appName = appOptions.logonPayload.appName;

	let classes = defaultStyles()();

	let show = (
			<AppRouter
				host={host}
				appName={appName}
				classes={classes}
				{...props}>
			</AppRouter>
	);

	return show;

}
export default App;
