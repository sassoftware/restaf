/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect, useState, useRef} from 'react';
import { PropTypes } from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import { CheckCircle } from '@material-ui/icons';
import {useAppContext} from '../../providers';

function QuickNotes (props) {
    const [open, setOpen] = useState(true);
    const [logInfo, setLogInfo]   = useState({timeStamp: null, log: null, completed: false});
    let {store, classes, appOptions} = useAppContext;
    let jobTracker = appOptions.appEnv.jobTracker;
    let lastStamp = useRef(null);
    const _handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    let show = null;
    
    useEffect(() => {
      const interval = setInterval(() => {
        let j = store.getAppData('_jobStatus');
        if (j !== null) {
          let jobStatus = j.toJS();
          if (jobStatus.timeStamp !== lastStamp.current) {
            lastStamp.current = jobStatus.timeStamp;
            setLogInfo({timeStamp: jobStatus.timeStamp, log: jobStatus.log, completed: jobStatus.completed});
            setOpen(true);
          }
        }
      }, jobTracker.delay*1000);
      return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if ( logInfo.log !== null) {
        let t = `@ ${logInfo.timeStamp}: ${logInfo.log}`;
        let icon = (logInfo.completed === true) ? <CheckCircle/> : <Info/>;
        let c= (logInfo.completed === true) ? 'primary': 'default';

        show = <Snackbar 
                anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}
                open={open}
                autoHideDuration={jobTracker.viewTime*1000}
                onClose={_handleClose}
                message={t}>
                <Button size="small" variant="outlined" color={c} className={classes.button}
                        startIcon={icon}>
                        {t}
                </Button>
            </Snackbar>
    }
    return show;
};

QuickNotes.propTypes = {
  /** msg to be displayed */
  msg: PropTypes.string.isRequired,

  /** title for dialog */
  title: PropTypes.string.isRequired
}
export default QuickNotes;
