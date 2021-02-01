/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Grid } from '@material-ui/core';
import SimpleDataForm from './SimpleDataForm';
import {useAppContext} from '../../providers';
import Fab from '@material-ui/core/Fab';
import WarningRounded from '@material-ui/icons/WarningRounded';
import Done from '@material-ui/icons/Done';

function RunMasModel (props) { 
	let [masControl, setMasControl]= useState(null);
	let [state, setState] = useState({data: null, name: null, score: null});
	let {store, restaflib, classes} = useAppContext();

	const _setUp = async () => {
		let name = props.name;
		let control = await restaflib.masSetup(store, []);
		await restaflib.masAddModel(store, control, [name]);
		if (control.steps[name] == null) {
			throw {Error: 'Model not found'}
		}
		let desc = restaflib.masDescribe(control, [name], 'score');
		let metaData = props.viewData;
		let data;
		if (metaData !== null ) {
			data = desc.map(d => {
				let n = d.name.toLowerCase();
				if (metaData[n] != null) {
					d = {...d, ...metaData[n]}
				}
				return d;
			})
		} else {
			data = desc;
		}
		let r = {data: data, name: name, score: null};
        return {masControl: control, newState: r};
    }
    useEffect(() => {
        _setUp()
            .then((r) => {
				setMasControl(r.masControl);
                setState(r.newState)
            })
            .catch((err) => {
                alert(JSON.stringify(err, null,4));
			})
	}, [props.name]);
	
	const _userInputs = (newData) => {
        _score(newData)
            .then(r => {
				let t = {data: newData, score: r, name: state.name}
                setState(t);
            })
            .catch(err => {
                alert(JSON.stringify(err, null,4));
            })
    }

    const _score = async (newData) => {
		
		let r = await restaflib.masRun(store, masControl, state.name, newData, 'score', 'execute');
		
		let t = r.toJS();
		let d = t.filter( t1 => t1.name === props.target);
		console.log(d);
        return d;
	}

	let Icon = Done;
	let fabclass = classes.fabgood;
	let value;
	if (state.score != null) {
		value = `${state.score[0].value} - Not at Risk`;
		if (state.score[0].value < props.threshold) {
			Icon  = WarningRounded;
			fabclass = classes.fabbad;
			value = `${state.score[0].value} - At Risk`;
		}
	};
	let show = 
	<Fragment>
	<Grid container justify="flex-start" alignItems="flex-start" spacing={2} direction="row">
		<Grid item xs={6}>
			{state.data !== null ? <SimpleDataForm title={'Enter Values and Submit'} data={state.data} onSubmit={_userInputs} /> : null}
		</Grid>
		<Grid item xs={4}>
			{state.score != null ? <Fab variant="extended" className={fabclass}>
				<Icon />
					{value}
			</Fab> : null}
		</Grid>
	</Grid>
</Fragment>
	return show;
}

RunMasModel.propTypes = {
	/** name of MAS model */
	name: PropTypes.string.isRequired,
	/** dictionary with additional information fro display */
	viewData: PropTypes.object.isRequired,
	/** Target column name */
	target: PropTypes.string.isRequired,
	/** threshold - threshold for success */
	threshold: PropTypes.number.isRequired,
};

export default RunMasModel;
