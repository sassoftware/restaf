import React, {useState, useEffect} from 'react';
// import {BrowserRouter} from 'react-router-dom'
import SideBar from './SideBar';
import ProblemDescription from './ProblemDescription';
import TestStuff from './TestStuff';

function MasApp (props) {
	let { store } = props;
	const [menu, setMenu] = useState(null);
	const [err, setErr] = useState(null);
	
	useEffect(() => {
		getList(store)
			.then(r => {
				setMenu(r);
			})
			.catch(e => {
				console.log(e);
				setErr('failed to get list of models');
			});
	}, []);


	async function getList (store) {
		let { microanalyticScore } = await store.addServices('microanalyticScore');
		let modList = await store.apiCall(microanalyticScore.links('modules'));
		let menux = [];
		modList.itemsList().map((m) => {
			console.log(m);
			let mrow = {
				path: '/score',
				text: m,
				icon: null,
				name: m,

				Component: TestStuff,
			};
			menux.push(mrow);
		});
		menux = [
			{
				path     : '/',
				text     : 'Home',
				icon     : null,
				name     : 'Home',
				Component: ProblemDescription,
			},
		].concat(menux);
		console.log(menux);
		return menux;
	}
	let show;
	if (err !== null) {
		show = <h2> Failed to get list of models. See console for messages</h2>;
	} else if (menu === null) {
		show = <h2> Reading the list of models</h2>;
	} else {
		show = <SideBar menu={menu} {...props} />;
	}
    return show;
}

export default MasApp;
