/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';


// eslint-disable-next-line no-unused-vars
import Viewers from './viewers';

function display (Viewer, props, element,style){
    let ThisComponent = Viewers[ Viewer ];
	let jss = (style == null) ? defaultJss() : style;
	console.log(jss);
	const StyledComponent = withStyles(jss)(ThisComponent);
	ReactDOM.render(<StyledComponent {...props} />, element);

}

function defaultJss () {
const styles = {
	list: {
		width          : 250,
		backgroundColor: 'white',
		foregroundColor: 'black',
	},
	fullList: {
		width: 'auto',
	},
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft : -12,
		marginRight: 20,
	},
	appBar1: {
		backgroundColor: '#2E547B',
		foregroundColor: 'white',
	},
	paper: {
		backgroundColor: 'white',
	},
    };
    return styles;

}
export default display;