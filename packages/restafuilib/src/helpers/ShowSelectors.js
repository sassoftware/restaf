/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/button';

import Select from '@material-ui/core/Select';
 
function ShowSelectors (props){
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
          },
        formControl: {
             margin: theme.spacing(3),
         },
        container: {
          display : 'flex',
          flexWrap: 'wrap',
        },
        paper: {
          padding     : theme.spacing(3, 2), 
          marginLeft  : theme.spacing(2),
          marginRight : theme.spacing(2),
          marginTop   : theme.spacing(3),
          marginBotton: theme.spacing(3)
        },
        selectField: {
          marginLeft  : theme.spacing(2),
          marginRight : theme.spacing(2),
          marginTop   : theme.spacing(3),
          marginBotton: theme.spacing(3),
          width       : 200,
        },
        dense: {
          marginTop: 19,
        },
        menu: {
          width: 200,
        },
        button: {
          color  : 'primary',
          padding: '0 30px'
        }
      }));
    let {selectors, selectedValues,handleChange, onSubmit} = props;
    const classes = useStyles();
    if (selectors === null) {
      return null;
    }
 
    ;
    let t = [];
    for (let key in selectors) {
        let inputProps = {name: key, id: key};
        let tsub =
          <FormControl variant="outlined" margin="normal">
            <InputLabel htmlFor= {key}>{key}</InputLabel>
            <Select 
                value={selectedValues[key]}
                onChange={handleChange}
                inputProps = {inputProps}
                className = {classes.selectField}
                >
            {selectors[key].map(m => <MenuItem value={m.value}>{m.label}</MenuItem>)}
            </Select>
        </FormControl>;
        t.push(tsub);
    }
    let button = 
                 <FormControl>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                       Apply
                     </Button>
                </FormControl>;
    t.push(button);

    let outerForm = 
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
        <Paper className={classes.paper} >
        <FormControl className={classes.formControl}>
            <FormLabel> Filter Targets</FormLabel>
            <FormGroup>
                {t}
            </FormGroup>
        </FormControl>
        </Paper>
        </Container>
      </React.Fragment>;


    return outerForm;
}

export default ShowSelectors;