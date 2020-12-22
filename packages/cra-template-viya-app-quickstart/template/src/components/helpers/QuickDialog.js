/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useState, useEffect} from 'react';
import { PropTypes } from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import {useAppContext} from '../../providers';

function QuickDialog (props) {
    const [open, setOpen] = useState(true);

    let {classes} = useAppContext();

    const handleClick = () => {
      setOpen(false);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    useEffect(() => {
      setOpen(true);
    },[props.msg])
    let t = (typeof props.msg === 'object') ? JSON.stringify(props.msg, null,4) : props.msg;
    let icon =  <Info/>;
    let show = <Snackbar 
            anchorOrigin={{vertical: 'middle',horizontal: 'center'}}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={t}>
            <Button size="small" variant="outlined" color="primary" className={classes.button}
                    oncClick={handleClick} startIcon={icon}>
                    {t}
            </Button>
        </Snackbar>
    
    return show;
};

QuickDialog.propTypes = {
  /** messsage to be displayed in a snackk bar for 3 seconds */
  msg: PropTypes.string.isRequired
}
export default QuickDialog;
