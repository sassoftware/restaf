/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Fragment } from 'react';

import Button from '@material-ui/core/button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FileSelectorButton from './FileSelectorButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {useAppContext} from '../../providers';

function SimpleDataForm(props) {

    const [state, setState] = useState([]);
    const {onSubmit, title, disabled } = props;
    let {classes} = useAppContext();

    useEffect(() => {

        
        let t = props.data.map(r => {
            if (r.label == null) {
                r.label = r.name;
            }
            return r;
        })
        setState(t);
        
    }, [props.data])

    let setdisabled = (disabled === true) ? true : false;

    const _fileSelected = (name, src, fname, file) => {
        
        let t = [].concat(state);
        let f = t.find(s => s.name === name);
        f.value = { name: fname, src: src, file: file }
        setState(t);
    }

    const _handleSelect = (name, value) => {
        let t = [].concat(state);
        let f = t.find(s => s.name === name);
        f.value = value;
        setState(t);
    }

    const _onSubmit = () => {
        let stateAsObj = {};
        state.forEach((s) => {
            stateAsObj[s.name] = s.value;
            if (typeof s.value === 'string' && (s.type === 'decimal' || s.type === 'number')) {
                s.value = parseFloat(s.value * 1.0)
            }
            
        })
        onSubmit(state, stateAsObj);
    };
   

    let table = state.map((s, i) => {
        let t;
        let type = (s.type === 'decimal') ? 'number' : s.type

        if (type === 'file') {
            t = <Grid item zeroMinWidth>
                    <InputLabel key={`${s.name}_`} htmlFor={s.name}>{s.label}</InputLabel>
                    <OutlinedInput
                        key={`${s.name}__`}
                        id={s.name}
                        label={s.label}
                        type="string"
                        value={s.value.name}
                        className={classes.input}
                        disabled={true}
                        name={s.name}
                        variant="filled"
                        endAdornment={<FileSelectorButton label={""} classes={classes}
                            onSelect={(src, fname, file) => _fileSelected(s.name, src, fname, file)} />}
                    />
                    </Grid>
        } else if (type === 'select') {
            
            t = <Grid item zeroMinWidth>
                <InputLabel id={`${s.name}_label`}>{s.label}</InputLabel>
                <Select
                    labelId={`${s.name}_id`}
                    id={s.name}
                    value={s.value}
                    disabled={setdisabled}
                    onChange={(event) => _handleSelect(s.name, event.target.value)}
                >
                    {s.selections.map((svalue) => {
                        return <MenuItem value={svalue} key={`${svalue}_m`}>{svalue}</MenuItem>
                    })}
                </Select>
            </Grid>

        } else if (s.type === 'slider') {
            let marks = [
                {value: s.min, label: s.min},
                {value: s.max, label: s.max}
            ];
            let scalefn = (s.scalen == null) ? (x)=>x : s.scalen;
            t =   <Grid item zeroMinWidth>
                <Typography id="`${s.label}`" gutterBottom>
                    {s.label}
                </Typography>
                <Slider className={classes.slider}
                key={`${s.name}__`}
                value={s.value}
                aria-label={s.label}
                aria-labelledby="`${s.label}`"
                step={s.step}
                scale={scalefn}
                min={s.min}
                max={s.max}
                marks={marks}
                valueLabelDisplay="on"
                onChange={(event, value) => _handleSelect(s.name,value)}
            />
            </Grid>

        } else {
            const inputPropsDecimal = {
                inputmode: 'decimal',
                step     : "any"
            };
        
            const inputPropsDefault = {
                inputmode: (type === 'string') ? 'text' : 'numeric'
            };

            t = <Grid item zeroMinWidth>
                <InputLabel key={s.name} htmlFor={s.name}>{s.label}</InputLabel>
                <OutlinedInput
                    key={`${s.name}__`}
                    id={s.name}
                    type={type}
                    value={s.value}
                    inputProps={(s.type === 'decimal') ? inputPropsDecimal : inputPropsDefault}
                    onChange={(event) => _handleSelect(s.name,event.target.value)}
                    className={classes.input}
                    disabled={false}
                    name={s.name}

                />
            </Grid>
        }
        return <div className={classes.divborder}>{t}<br></br></div>;
    });

    let button = (
        <Grid item>
            { setdisabled === false ?
                <Button key="something" variant="contained" color="primary" onClick={_onSubmit}>
                    Submit
                </Button> : null}
        </Grid>
    );
    table.push(button);

    let show =  
    <Paper>
    <div className={classes.divborder}>
            <Grid container xs={12} direction="column">
                <Grid item zeroMinWidth>
                    <Typography variant="subtitle1">
                        {title}
                    </Typography>
                </Grid>
                {table}
            </Grid>
    </div>
    </Paper>

    return show;
}
export default SimpleDataForm;
