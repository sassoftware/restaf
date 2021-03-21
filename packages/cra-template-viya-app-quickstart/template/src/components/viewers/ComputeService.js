/*
 * Copyright Â© 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Warning from '@material-ui/icons/Warning';
import Error from '@material-ui/icons/Error';
import Info from '@material-ui/icons/Info';

import { computeSetup, computeRun } from '@sassoftware/restaflib/dist/restaflib.js';
import helpers from '../helpers';
import { useLocation } from 'react-router-dom';
import FileSelectorButton from '../helpers/FileSelectorButton';

/**
 *
 * @param {
 *
 * } props
 */
function ComputeService(props) {
	let { store, classes } = props;
	let [currentTab, setCurrentTab] = useState(0);
	let [computeInfo, setComputeInfo] = useState({
		session: null,
		result: null,
		fname: null,
		msgText: null,
		msgIcon: null,
		err: null,
	});
	let [runStatus, setRunStatus] = useState(null);

	let location = useLocation();
	let { initialTab, tabs } = location.state;

	let currentInfo = useRef(null);

	let tabsBar = tabs.map((t, i) => {
		return <Tab label={t.label} value={i} key={i} className={classes.tab} />;
	});

	const _tabView = () => {
		let tabn = currentTab === -1 ? initialTab : currentTab;
		let V = computeInfo.result !== null ? helpers[tabs[tabn].component] : helpers['NoData'];
		let tabType = tabs[tabn].type;
		let MsgIcon =
			computeInfo.msgIcon === 'warning' ? <Warning /> : computeInfo.msgIcon === 'error' ? <Error /> : <Info />;
		let msgText = computeInfo.msgText === null ? 'Please select a SAS program to run' : computeInfo.msgText;
		return (
			<Fragment>
				<Button
					size="small"
					variant="outlined"
					color={
						computeInfo.msgIcon === 'error'
							? 'secondary'
							: computeInfo.msgIon === 'warning'
							? 'primary'
							: 'default'
					}
					className={classes.button}
					startIcon={MsgIcon}>
					{msgText}
				</Button>
				<V {...props} type={tabType} computeInfo={computeInfo} />
			</Fragment>
		);
	};

	const _tabSelection = (ev, newValue) => {
		setCurrentTab(newValue);
	};
	const _runCode = async (src) => {
		let session = currentInfo.current;
		if (session === null) {
			session = await computeSetup(store, null, null);
			currentInfo.current = session;
		}
		let r = await computeRun(store, session, src, null, 'wait', 2);
		return { result: r, session: session };
	};

	useEffect(() => {
		return () => {
			let session = currentInfo.current;
			currentInfo.current = null;
			debugger;

			if (session != null) {
				return session.links('delete');
			}
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const _onFileSelect = (src, name) => {
		if (src !== null) {
			setRunStatus('Running...');

			_runCode(src)
				.then((r) => {
					let { session, result } = r;

					let msgIcon = Warning;
					let msgText = 'Selected file: ' + name;
					let status = 'completed';
					debugger;

					msgText = `${msgText} ......  SAS job Status: ${status}`;
					msgIcon = status === 'warnings' ? 'warning' : status === 'error' ? 'error' : 'info';
					debugger;
					setComputeInfo({
						session: session,
						result: result,
						fname: name,
						msgText: msgText,
						msgIcon: msgIcon,
						error: null,
					});
					setRunStatus(null);
				})
				.catch((err) => {
					let msgIcon = 'error';
					let msgText = 'Selected file: ' + name;
					msgText = `${msgText}    Job completed with status of failed`;
					debugger;
					setComputeInfo({
						session: computeInfo.session,
						result: null,
						fname: name,
						msgText: msgText,
						msgIcon: msgIcon,
						error: JSON.stringify(err, null, 4),
					});
					setRunStatus(null);
				});
		}
	};

	let show = (
		<div>
			<Fragment>
				<FileSelectorButton
					label="Select Compute Program to run..."
					onSelect={_onFileSelect}
					classes={classes}></FileSelectorButton>
			</Fragment>
			<AppBar position="static">
				<Paper square>
					<Tabs value={currentTab} onChange={_tabSelection} indicatorColor="primary" textColor="primary">
						{tabsBar}
					</Tabs>
				</Paper>
			</AppBar>
			{_tabView()}
			{runStatus}
			{computeInfo.error}
		</div>
	);
	return show;
}

export default ComputeService;
