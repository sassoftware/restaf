/* eslint-disable no-unused-vars */
/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import slsExecute from '../lib/runCode';
// import {AppContext} from '../providers';
import ShowSelectors from '../helpers/ShowSelectors';
import EditScenario from '../helpers/EditScenario';
import ShowScore from '../helpers/ShowScore';

import Grid from '@material-ui/core/Grid';

function MasScoring (props) {
	const [steps, setSteps] = useState(null);
	const [stepsList, setStepsList] = useState(null);
	const [selectedValues, setSelectedValues] = useState({});
	const [scenarioResult, setScenarioResult] = useState(null);
	const [modelName, setModelName] = useState(useParams().name);

	// const [scenarios, setScenarioValues] = useState(null)
	const [errors, setErrors] = useState('loading...');
	const { store, modList } = props;

	const lastModel = useRef(null);
	let { name } = useParams();

	useEffect(() => {
		lastModel.current = modelName;
	});

	// get initial values if new model
	useEffect(() => {
		// clear old values

		if (lastModel.current !== name) {
			setScenarioResult(null);
			setSelectedValues(null);

			store.apiCall(
				modList
					.itemsCmd(name, 'steps')
					.then((r) => {
						setSteps(r);
						let stepSelect = r
							.itemsList()
							.toJ()
							.map((n) => {
								let s = { label: n, value: n , key: n};
								return s;
							});
						setStepsList(stepSelect);
						setModelName(name);
					})
					.catch((e) => {
						setErrors(e);
					})
			);
		}
	}, [name]);

	function onStepSelection () {
		
	}
	function handleChange (event) {
		console.log(event.target.name);
		console.log(event.target.value);
	}

	function scenarioData (casResults) {
		let oldrow = casResults.scenario[0];
		let describe = {};
		for (let k in oldrow) {
			let kl = k.toLowerCase();
			describe[kl] = oldrow[k];
		}

		return;
	}

	const getNewValues = (newValues) => {};

	let show = (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid key={1} justify={'flex-start'} item>
						<ShowSelectors
							selectors={stepsList}
							selectedValues={selectedStepValue}
							handleChange={handleChange}
							onSubmit={onStepSelection}
						/>
						{errors}
					</Grid>
					{initialValues !== null ? (
						<Grid key={2} justify={'flex-end'} item>
							<EditScenario data={initialValues.editRow} setScenario={getNewValues} />
						</Grid>
					) : null}
					{scenarioResult !== null ? (
						<Grid key={3} item>
							<ShowScore model={model} score={scenarioResult} />
						</Grid>
					) : null}
				</Grid>
			</Grid>
		</Grid>
	);

	return show;
}

export default MasScoring;
