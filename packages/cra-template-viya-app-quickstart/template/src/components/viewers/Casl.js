/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
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

import helpers from '../helpers';
import { useLocation } from 'react-router-dom';
import FileSelectorButton from '../helpers/FileSelectorButton';

/**
 *
 * @param {
 *
 * } props
 */
function Casl (props) {
    let { store, classes, restaflib } = props;
    let {casSetup, caslRun} = restaflib;

    let [ currentTab, setCurrentTab ] = useState(0);
    let [ computeInfo, setComputeInfo ] = useState({
        session: null,
        result : "Please select a file to run",
        fname  : null,
        msgText: null,
        msgIcon: null,
    });

    let location = useLocation();
    let { initialTab, tabs } = location.state;

    let currentInfo = useRef(null);
      

    let tabsBar = tabs.map((t, i) => {
        return <Tab label={t.label} value={i} key={i} className={classes.tab} />;
    });


    const _tabView = () => {
          
        let tabn = currentTab === -1 ? initialTab : currentTab;
        let V = computeInfo.result !== null ? helpers[ tabs[ tabn ].component ] : helpers[ 'NoData' ];
        let MsgIcon = (computeInfo.msgIcon === 'warning') ? <Warning /> : (computeInfo.msgIcon === 'error') ? <Error /> : <Info />;
        let msgText = (computeInfo.msgText === null) ? 'Please select a casl file to run' : computeInfo.msgText;
        return <Fragment>
            <Button size="small" variant="outlined" color={computeInfo.msgIcon === 'error' ? 'secondary' : computeInfo.msgIon === 'warning' ? 'primary' : 'default'} className={classes.button}
                startIcon={MsgIcon}>{msgText}</Button>
                  <V {...props} computeInfo={computeInfo} />
               </Fragment>;
    };

    const _tabSelection = (ev, newValue) => {
        setCurrentTab(newValue);
    };

    useEffect(() => {
        casSetup(store, null)
            .then((r) => {
                setComputeInfo({ session: r.session, result: null, msgText: null, msgIcon: null, fname: null });
                currentInfo.current = r.session;
            })
            .catch((err) => {
                alert(JSON.stringify(err, null,4));
            });

        return () => {
            let session = currentInfo.current;
            currentInfo.current = null;
            if (session != null) {
                return session.links('delete');
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _onFileSelect = (src, name) => {
        if (src !== null) {
            caslRun(store, computeInfo.session, src, null)
                .then((r) => {
                    let msgIcon = Warning;
                    let msgText = 'Selected file: ' + name;
                    let status = 'completed';

                    msgText = `${msgText} ......  SAS job Status: ${status}`;
                    msgIcon = status === 'warnings' ? 'warning': status === 'error' ? 'error' : 'info';

                    setComputeInfo({
                        session: computeInfo.session,
                        result : r,
                        fname  : name,
                        msgText: msgText,
                        msgIcon: msgIcon,
                    });
                })
                .catch((err) => {
                    let msgIcon = 'error';
                    let msgText = 'Selected file: ' + name;
                    msgText = `${msgText}    Job completed with status of failed`;
                    setComputeInfo({
                        session: computeInfo.session,
                        result : err,
                        fname  : name,
                        msgText: msgText,
                        msgIcon: msgIcon
                    });
                
                });
        }
    };
   
   
    let show =
        <div>
            <Fragment>
                <FileSelectorButton label="Select Casl Program to run..." onSelect={_onFileSelect} classes={classes}></FileSelectorButton>
            </Fragment>
            <AppBar position="static">
                <Paper square>
                    <Tabs value={currentTab} onChange={_tabSelection} indicatorColor="primary"
                        textColor="primary">
                        {tabsBar}
                    </Tabs>
                </Paper>
            </AppBar>
            {_tabView()}
        </div>;
    return show;
}
	

export default Casl;

