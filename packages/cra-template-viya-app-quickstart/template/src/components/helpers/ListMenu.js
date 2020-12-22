/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useAppContext} from '../../providers';

function ListMenu (props) {
    let { menus, onSelect} = props;
    let {classes} = useAppContext();
      
    let newMenu = [];
    menus.forEach((m, key) => {
        let hide = (m.hide != null && m.hide === true) ? true : false;
        if (hide !== true) {
            newMenu.push(
                <ListItem key={key} button onClick={() => onSelect(key, m)}>
                    <ListItemText primary={m.props.text} />
                </ListItem>)
        }
    });
    let show =
        <Fragment>
            <List component="nav" dense className={classes.list}>
                {newMenu}
            </List>
        </Fragment>;

    return show;
}
ListMenu.propTypes = {
    /** Menu to be displayed */
    menus: PropTypes.array.isRequired,

/** Selection handler */
    onSelect: PropTypes.func.isRequired,

/** default classes */
    classes: PropTypes.object.isRequired

}
export default ListMenu;
