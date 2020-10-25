/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

// some js code
import { makeStyles } from '@material-ui/core/styles';

function defaultStyles () {

  const useStyles = makeStyles((theme) => ({
		list: {
			width          : 250,
			backgroundColor: 'white',
			foregroundColor: 'black',
			textTransform  : 'none',
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
			marginLeft   : -12,
			marginRight  : 20,
			textTransform: 'none',
		},
		appBar1: {
			backgroundColor: '#2E547B',
			foregroundColor: 'white',
		},
		tab: {
			textTransform: 'none',
		},
		tabsv: {
			textTransform: 'none',
			width        : 240,
		},
		paper: {
			backgroundColor: 'white',
		},
		table: {
			minWidth: 650,
		},
		menudrawer: {
			width     : 240,
			flexShrink: 0,
		},
		drawerPaper: {
			width: 240,
		},
		drawerContainer: {
			overflow: 'auto',
		},
		// necessary for content to be below app bar
		content: {
			flexGrow       : 1,
			backgroundColor: theme.palette.background.default,
		},
		maincontent: {
			width          : '100%',
			backgroundColor: theme.palette.background.default,
		},
		button: {
			textTransform: 'none',
		},
		lsource: {
			foregroundColor: 'blue',
		},
		ltitle: {
			foregroundColor: 'black',
			backgroundColor: 'cyan',
		},
		lnote: {
			foregroundColor: 'black',
		},
		lerror: {
			foregroundColor: 'red',
		},
		lwarning: {
			foregroundColor: 'yellow',
		},
		span0: {
			color          : 'red',
			backgroundColor: 'white',
		},
		span1: {
			color          : 'purple',
			backgroundColor: 'white',
		},
		span2: {
			color          : 'green',
			backgroundColor: 'white',
		},
		span3: {
			color          : 'pink',
			backgroundColor: 'white',
		},
		span4: {
			color          : 'blue',
			backgroundColor: 'white',
		},
  }));
  
	
  return useStyles;
}
export default defaultStyles;