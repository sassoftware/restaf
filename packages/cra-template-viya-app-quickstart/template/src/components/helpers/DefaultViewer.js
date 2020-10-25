import React from 'react';
// import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

function DefaultViewer (props) {

	// eslint-disable-next-line no-unused-vars
	let { host, folder, selectedItem } = props;

	let m = `Coming soon............`;
	let show = <Fragment>
		<h1> {m}</h1>
		</Fragment>;

	return show;
}

export default DefaultViewer;
