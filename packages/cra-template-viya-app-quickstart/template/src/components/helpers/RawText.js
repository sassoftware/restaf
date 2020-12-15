import React from 'react';
import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

function RawText (props) {

	// eslint-disable-next-line no-unused-vars
	let m = (props.doc.doc === null) ? 'Select a file' : props.doc.doc;
	let show = <Fragment>
		<pre>{m} </pre>
		</Fragment>;

	return show;
}

RawText.propTypes = {
    /** Viya host url */
	doc: PropTypes.object.isRequired
}
export default RawText;
