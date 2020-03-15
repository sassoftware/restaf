/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import NestedMenu from '../helpers/NestedMenu';
import JSONPretty from 'react-json-pretty';

function CasOutput (props) {
	let { store, session, folder } = props;
	let [showData, setShowData] = useState({Note: 'Please select from list on the left'});
	let [casResults, setCasResults] = useState(null);

	debugger;

	useEffect(() => {
		setCasResults(folder.items().toJS());
		setShowData({Note: 'Please select from list on the left'});
	}, [folder]);

	const handleSelect = m => {
    debugger;
    if (m === 'status') {
      setShowData({status: casResults[m]}) ;
     } else {
      setShowData(casResults[m]);
     }
	};

	let show = (
		<Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Grid key={1} xs={4} item>
          <NestedMenu
            casResults={casResults} handleSelect={handleSelect}></NestedMenu>
        </Grid>
        <Grid key={2} xs={8} item>
          <JSONPretty id="json-pretty" data={showData}></JSONPretty>
        </Grid>
    </Grid>
	);
	return show;
}

export default CasOutput;
