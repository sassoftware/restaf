import React from 'react';
// import {BrowserRouter} from 'react-router-dom'
import SideBar from './SideBar';
import ProblemDescription from './ProblemDescription';
import DsScoring from './DsScoring';
import CasTableSelectorp from './CasTableSelectorp';

import PlaceHolder from './PlaceHolder';
import TestStuff from './TestStuff';
// import { AppContext } from './providers';

let menuFuture = [
	{
		path     : '/testStuff',
		text     : 'Testing Zone',
		icon     : null,
		component: TestStuff
	}
];

//
// To start at a different component change SideBar to your component
//
function Apps (props) {
	// const appContext = useContext(AppContext);
	debugger;
	let {store, models, serverless} = props;

	let menu = [
		{
			path     : '/',
			text     : 'Home',
			icon     : null,
			component: ProblemDescription,
			model    : null
		}
	];
	debugger;
	models.forEach(m => {
		if (typeof m.scenario === 'object') {
			let t = {};
			for (let k in m.scenario) {
				let k1 = k.toLowerCase();
				t[k1]  = m.scenario[k];
			}
			m.scenario = t;
		}
		let mrow = {
			path : m.route,
			text : m.desc,
			icon : null,
			model: m,
			
			serverless: serverless
		};
		mrow.component = DsScoring;
		menu.push(mrow);
	});
	menu = menu.concat(menuFuture);
	console.log(menu);
	return <SideBar store={store} menu={menu} />;
}

export default Apps;
