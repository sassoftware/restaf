/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let appMenus = [
	{
		component: 'Home',
		text     : 'Introduction',
		hide     : true,
		props    : {
			text : 'Introduction',
			title: 'Quick start SAS Viya Application Builder',
		},
	},
	{
		component: 'Casl',
		props    : {
			text      : 'Import and Run Casl Code',
			initialTab: 0,
			tabs      : [ { label: 'Results', component: 'CaslResult' } ],
		},
	},
	{
		component: 'ComputeService',
		props    : {
			text      : 'Import and Run SAS Program',
			initialTab: 0,
			tabs      : [
				{ label: 'ODS', component: 'ODS' },
				{ label: 'Log', component: 'LogList' },
			],
		},
	},
	{
		component: 'PlaceHolder',
		props    : {
			text : 'Describe Viewer Props',
			three: 3,
		},
	},
	{
		component: 'JobManager',
		hide     : true,
        props    : {
            text: 'Job Manager'
        }
    }
];

export default menus;
