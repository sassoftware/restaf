/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect,Fragment } from 'react';
import { PropTypes } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Home from '@material-ui/icons/Home';
import Menu from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useHistory } from 'react-router-dom';
import ListMenu    from './ListMenu';
import QuickNotes from '../helpers/QuickNotes';

/**
 * 
 * @param Displays an Header at the top of the page 
 * 
 */
function Header (props) {

    let [ menuIsOpen, setMenuIsOpen ] = useState(false);
    const {store, title, classes, menu, appOptions} = props;
    let history = useHistory();
    let [ admin, setUserAdmin ] = useState(null);
      
    async function isUserAdmin (store) {
        

        let { identities } = await store.addServices('identities');
        let c = await store.apiCall(identities.links('currentUser'));
        let r = await store.apiCall(identities.links('currentUserAdmin'));
        let name = c.items('name');
        let admin = (r.items() === true) ? `${name}:admin` : name;
        setUserAdmin(admin);
        return true;
    }
    useEffect(() => {
        isUserAdmin(store)
            .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const _logout = () => {
        let url = `${window.location.protocol}//${window.location.host}/${props.appName}/logout`;
        window.location.replace(url);
    };

    const _handleClickAway = (open) => {
        setMenuIsOpen(open);
      };
    const _toggleMenu = (state) =>  {
          
        setMenuIsOpen(state);
    };

    const _routeTo = (m) => {
            let payload = {
                pathname: `/${m.component}`,
                state   : m.props,
            };
            setMenuIsOpen(false);
            history.push(payload);
    };
    
    let jobTracker = appOptions.appEnv.jobTracker;
    /*
    if (jobTracker == null) {
        jobTracker = {
            delay   : 5,
            viewTime: 6
        }
    } 
    */
    return (
        <div>
        
            <AppBar position="static" className={classes.appBar1}>
                <Toolbar>
                    <IconButton size="small"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => _toggleMenu(true)}>
                        <Menu />
                    </IconButton>

                    <IconButton size="small"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => history.push('/Home')}>
                        <Home />
                    </IconButton>

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {title}
                    </Typography>
                    <div>
                        <Typography variant="caption" color="inherit" className={classes.grow}>
                            {admin}
                        </Typography>
                        
                        <Divider orientation="horizontal" flexItem></Divider>
                        
                        <Button size="small"
                            className={classes.button}
                            color="inherit"
                            aria-label="Menu"
                            fontSize="small"
                            onClick={() => _logout()}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
           
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={menuIsOpen}
                onClose={()=> _toggleMenu(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton  size="small" onClick={() => _toggleMenu(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <ClickAwayListener onClickAway={()=>_handleClickAway(false)}>
                <Fragment>
                   <ListMenu menus={menu} onSelect={_routeTo} classes={classes} />
                   </Fragment>
                </ClickAwayListener>
            </Drawer>
            {jobTracker != null ?<QuickNotes store={store} jobTracker={jobTracker} classes={classes} /> : null}
            <br></br>
            
        </div>
    );

}

Header.propTypes = {
    menu   : PropTypes.array.isRequired,
    /** classes object for material-ui components */
    classes: PropTypes.object.isRequired,
    /** restaf store */
    store  : PropTypes.object.isRequired,
    /** Text to display in the Header */
    title  : PropTypes.string.isRequired

};


export default Header;
