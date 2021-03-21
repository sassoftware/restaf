
/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let appMenus =  [
	{
		component: 'Home',
		text     : 'Introduction',
		hide     : true,
		props    : {
			text : 'Introduction',
			title: 'Default Applications',
		},
	},
	/*
	{
		component: 'MasModel',
		props    : {
			text : 'Covid Infection Analysis',
			models: [
				{
				 label: 'Covid Analysis',
				 name : 'deva_manuel',
				 viewData: {
					 income             : {label: 'Income(x1000)',       value: 10000, multiplier: 1000, viewType: 'slider', min: 0, max: 900000},
					 respiratory_tests  : {label: 'Respiratory Tests',   value :30,  viewType: 'slider', min:0, max: 15},
					 cholesterol_level  : {label: 'Cholesterol Level',   value :30,  viewType: 'slider', min:0, max:1200},
					 city_infection_rate: {label: 'City Infection Rate', value :1.0, viewType: 'slider', min:0, max:210}
					 },
				 target: {
					 name     : 'P_INFECTED1',
					 threshold: 0.7 
				 }
			 }
		  ]
		}
	},
	*/
	{
		component: 'CommonViewer',
		props    : {
			text      : 'Browse MAS models and Score',
			initialTab: 0,
			tabs      : [ { label: 'Mas Model', component: 'MasList' } ],
		},
	},
	{
		component: 'Casl',
		// hide: true,
		props    : {
			text      : 'Import and Run Casl Code',
			initialTab: 0,
			tabs      : [ { label: 'Results', component: 'CaslResult' } ],
		},
	},
	{
		component: 'ComputeService',
		//hide: true,
		props    : {
			text      : 'Import and Run SAS Program',
			initialTab: 0,
			tabs      : [
				{ label: 'ODS', type: 'ods', component: 'ODS' },
				{ label: 'Log', type: 'log', component: 'LogList' },
			],
		},
	},
	{
		component: 'PlaceHolder',
		// hide: true,
		props    : {
			text : 'Describe Viewer Props',
			three: 3,
		},
	},
	{
		component: 'SimpleDataFormTest',
		props    : {
			text : 'Test Data form',
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
export default appMenus;
