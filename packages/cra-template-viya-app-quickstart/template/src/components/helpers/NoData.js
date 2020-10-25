import React from 'react';
import { Fragment } from 'react';

function NoData (props) {
	// eslint-disable-next-line no-unused-vars
	let { host, folder, selectedItem } = props;


	let show = <Fragment>
		 <h1> No Data to display yet...</h1>
		</Fragment>;

	return show;
}

export default NoData;
