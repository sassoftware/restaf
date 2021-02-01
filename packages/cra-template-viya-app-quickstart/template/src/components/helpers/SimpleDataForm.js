/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';

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
    const { onSubmit, title, disabled } = props;
    const {classes} = useAppContext();


    /*-----------------------------------------
    props = [
       {
                    "name": "text",
                    "label": "",
                    "type": "string"|"number"|"file"|"selection",
                    "attributes": {}
                }
            ];
    ------------------------------------------------*/

    
    useEffect(() => {
        let t = props.data.map(ir => {
            let r = {...ir};
            if (r.label == null) {
                r.label = r.name;
            }
            if (r.multiplier != null ){
                r.value = r.value/r.multiplier;
                if (r.min != null) {
                    r.min = r.min/r.multiplier;
                }
                if (r.max != null) {
                    r.max = r.max/r.multiplier;
                }
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
            let value = s.value;
            if (typeof value === 'string' && (s.type === 'decimal' || s.type === 'number')) {
                value = parseFloat(value * 1.0);
            }
            if (s.multiplier != null) {
                
                value = value*s.multiplier;
            }
            stateAsObj[s.name] = value;
        });
        let r = props.data.map ( d => {
            d.value = stateAsObj[d.name];
            return d;
        })
        onSubmit(r, stateAsObj);
    };
   

    const _scaleFn = (scale) => {
        const fn = (x) => x;
        if (scale === 'log10') {
            fn = (x) => Math.log10(x)
        }
        return fn;
    }

    let table = state.map((s, i) => {
        let t;
        
        let key = `${s.name}`;
        let type = (s.type === 'decimal') ? 'number' : s.type;
        if (s.viewType != null) {
            type = s.viewType;
        }
        if (type === 'file') {
            t = <Grid key={`${key}_grid`} item xs={5} zeroMinWidth>
                    <InputLabel key={key} htmlFor={s.name}>{s.label}</InputLabel>
                    <OutlinedInput
                        key={`${key}1`}
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
            
            t = <Grid item key={`${key}_grid`} xs={5} zeroMinWidth>
                <InputLabel key={`${key}_label`} id={`${s.name}_label`}>{s.label}</InputLabel>
                <Select
                    key={`${key}_select`}
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

        } else if (type === 'slider') {
            let marks = [
                {value: s.min, label: s.min},
                {value: s.max, label: s.max}
            ];
            let scalefn = _scaleFn(s.scale);

            t =   <Grid item key={`${key}_grid`} xs={10} zeroMinWidth>
                <Typography key={`${key}_label`}id={`${s.label}`} gutterBottom>
                    {s.label}
                </Typography>
                <Slider className={classes.slider}
                key={`${key}_slider`}
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
                inputMode: 'decimal',
                step     : "any"
            };
        
            const inputPropsDefault = {
                inputMode: (type === 'string') ? 'text' : 'numeric'
            };

            t = <Grid item key={`${key}_grid`} zeroMinWidth>
                <InputLabel key={s.name} htmlFor={s.name}>{s.label}</InputLabel>
                <OutlinedInput
                    key={`${key}_input`}
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
        return <div key={`${key}_div`} className={classes.divborder}>{t}<br></br></div>;
    });

    let show =  
    <Paper>
    <div key="sdf" className={classes.divborder}>
            <Grid container spacing={3} direction="row">
                <Grid item zeroMinWidth>
                    <Typography key="title" variant="h5">
                    {title}
                    </Typography>
                </Grid>
                <br></br>
                <Grid item>
                   { setdisabled === false ?
                    <Button key="something" variant="contained" color="primary" onClick={_onSubmit}>
                        Submit
                    </Button> : null}
                  </Grid>
            </Grid>
            <Grid container  direction="column">
                {table}
            </Grid>
    </div>
    </Paper>;

    return show;
}
SimpleDataForm.propTypes = {
    /** data  */
    data: PropTypes.object.isRequired,
    /** title */
    title: PropTypes.string.isRequired,

    /** call back on submit */
    onSubmit: PropTypes.func.isRequired,

    /**disable all components if true */
    disabled: PropTypes.boolean
        
}
export default SimpleDataForm;
