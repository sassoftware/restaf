/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';

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

// import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
 
function ShowScore (props){
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
          },
        paper: {
          padding     : theme.spacing(3, 2), 
          marginLeft  : theme.spacing(2),
          marginRight : theme.spacing(2),
          marginTop   : theme.spacing(3),
          marginBotton: theme.spacing(3),

        },
        formControl: {
             margin: theme.spacing(3),
         },
        container: {
          display : 'flex',
          flexWrap: 'wrap',
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
      }));

    let [ score, setScore ] = useState(props.score);
    let [ model, setModel ] = useState(props.model);

    const classes = useStyles();

    useEffect(() => {
      setScore(props.score);
      setModel(props.model);
      console.log(`setting score as ${props.score}`);
    },[ props.score, props.model ])

    debugger;
  

    let key = 'Score'
    let t = 
         <FormControl variant="outlined" margin="normal">
            <InputLabel htmlFor= {key}>{key}</InputLabel>
            <Input id={key} type="text"
                value={score}
                className = {classes.inputField}
                disabled={true}
            />
            </FormControl>;

    let outerForm = 
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
        <Paper className={classes.paper} >
        <FormControl className={classes.formControl}>
            <FormLabel> {model.label}</FormLabel>
            <FormGroup>
                {t}
            </FormGroup>
        </FormControl>
        </Paper>
        </Container>
      </React.Fragment>


    return outerForm;
}

export default ShowScore;