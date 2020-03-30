import React from 'react';
import { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

function NestedMenu (props) {
	const {casResults, handleSelect } = props;
	let level = 0;
	return nestedLevel(casResults, handleSelect, level);
   
	function nestedLevel (menus, handleSelect, level) {
		let showMenu = [];
		
		
		for(let m in menus){
			console.log(m);
			if (m === 'tablesByName') {
				showMenu.push(nestedLevel(menus[m], handleSelect, level+1));
			} else if (m !== 'tables') {
				showMenu.push(<MenuItem key={m} onClick={()=> handleSelect(m)}>{m}</MenuItem>);
			}
		}
		return (
			<MenuList key={level}> {showMenu} </MenuList>

		);
	}
}

export default NestedMenu;
