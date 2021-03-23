/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import viewers from './components/viewers';
import appMenus from './appMenus';
import Header from './components/helpers/Header';
function AppRouter(props) {
	// const [setRef, dimensions] = useParentSize();
	let title;

	let homeState = {};
	console.log(viewers);

	let switches = appMenus.map((m, key) => {
		let Comp = viewers[m.component];
		let path = `/${m.component}`;
		if (m.component === 'Home') {
			title = m.props.title;
			m.props.appMenus = appMenus;
			homeState = m.props;
			return (
				<Route path={path} key={key} render={(match) => <Comp appProps={m.props} {...props} match={match} />} />
			);
		} else {
			return <Route path={path} key={key} render={(match) => <Comp {...props} match={match} />} />;
		}
	});
	switches.push(<Redirect key="redirect" to={{ pathname: '/Home', state: homeState }} />);

	return (
		<Router>
			<div id="App" className="sm-navy w-100 h-100">
				<Header title={title} menu={appMenus} {...props}></Header>
				<Switch>{switches}</Switch>
			</div>
		</Router>
	);
}

export default AppRouter;
