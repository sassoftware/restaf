/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */



import React, { useState, Fragment,  } from 'react';
// import { PropTypes } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useLocation } from 'react-router-dom';
import helpers from '../helpers';
// import QuickNotes from '../helpers/QuickNotes';


function CommonViewer (props) {
	let { classes } = props;
	let [ currentTab, setCurrentTab ] = useState(0);
	let { initialTab, tabs } = useLocation().state;

	// Tab handling -- a good candidate as an helper component- wait for more usage examples
	const _createTabBar = () => {
		let tabn = currentTab === -1 ? initialTab : currentTab;
		let tabsBar = tabs.map((t, i) => {
			return <Tab size="small" label={t.label} value={i} key={i} className={classes.tab} />;
		});
		let vTab = (
				<Tabs
					orientation="horizontal"
					variant="scrollable"
					value={tabn}
					onChange={_tabSelection}
					aria-label="Horizontal tabs example"
					className={classes.tab}>
					{tabsBar}
				</Tabs>
		);
		return vTab;
	};

	const _tabSelection = (ev, value) => {
		setCurrentTab(value);
	};

	const _tabView = () => {
		let tabn = currentTab === -1 ? initialTab : currentTab;
		let V = helpers[tabs[tabn].component];
		return (
			<Fragment>
				<V {...props} />
			</Fragment>
		);
	};
	
	let show = (
		<div className={classes.content}>
			<Grid container spacing={3} direction="column">
				<Grid item>
					<Fragment>{_createTabBar()}</Fragment>
				</Grid>
			</Grid>
			<Grid item>
				{_tabView()}
			</Grid>
		</div>
		
	);
	return show;
}

CommonViewer.propTypes = {
	/** your props*/
};

export default CommonViewer;
