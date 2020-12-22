/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Fragment } from 'react';
import {PropTypes} from 'prop-types';
import Button from '@material-ui/core/Button';

import FirstPage from '@material-ui/icons/FirstPage';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import LastPage from '@material-ui/icons/LastPage';
import Refresh from '@material-ui/icons/Refresh';

function ScrollMenu (props) {
    let { folder, onSelect, refresh } = props;
    let paginationCmds = [ 'first', 'prev', 'next', 'last' ];
    let paginationIcons = [ <FirstPage />, <ChevronLeft />, <ChevronRight />, <LastPage /> ];
    
    let cmds = folder.scrollCmds().keySeq().toJS();
    
      
    let menu = [];
    cmds.forEach((c, rel)  => {
        let t = <Button  onClick= {() => onSelect(c) } key={rel}>
            {paginationIcons[paginationCmds.findIndex(cmd => cmd === c)]}
        </Button>;
        menu.push(t);
    });
    if (refresh === true){
        let t = <Button  onClick= {() => onSelect('self') } key={'self'}>
                <Refresh/>
                </Button>;
        menu.push(t);
    }
    return (
        <Fragment>
            {menu}
        </Fragment>
    )
}

ScrollMenu.propTypes = {
    /** Object returned by store.apiCall to reports*/
        folder      : PropTypes.object.isRequired,
    /** callback on scroll selection */
        onSelect: PropTypes.func.isRequired,
    /** refresh - if true show refresh button */
        refresh: PropTypes.bool
    }
export default ScrollMenu;
