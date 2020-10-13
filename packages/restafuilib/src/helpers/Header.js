
import React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemLink from './ListItemLink';


function Header (props) {
	
	const { useState, useEffect, useRef } = React;
	let [itemsList, setItemsList] = useState(null);
	let [isOpen, setIsOpen] = useState(false);
	const {classes} = props;

	let lastMenu = useRef('');

	const toggleMenu = state => () => {
		setIsOpen(state);
	};
	useEffect(() => {
		
		lastMenu.current = props.menu;
		let l = makeList(props.menu);
		setItemsList(l);
	}, []);

	

	useEffect(() => {
		if (lastMenu.current !== props.menu) {
			lastMenu.current = props.menu;
			let l = makeList(props.menu);
			setItemsList(l);
		}
	}, [props.menu]);

	/*
	let control = {
		menu: props.menu
	};
	*/

	const makeList = menu => {
		
		let items = menu.map((m, key) => {
			return (
				<ListItemLink
					to={m.path + '/' + m.name}
					primary={m.text}
					icon={null}
					key={key}
					classes={classes}
					></ListItemLink>
			);
		});
		let tempList = (
			<div /*className={classes.list}*/>
				<List>{items}</List>
			</div>
		);
		return tempList;
	};

	let show = (
		<div className="rafuip-header">
			<AppBar position="static" className={classes.appBar1}>
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu"
						onClick={toggleMenu(true)}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						color="inherit"
						className={classes.grow}>
						{props.title}
					</Typography>
					<Button color="inherit">Logout</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				open={isOpen}
				className={classes.paper}
				onClose={toggleMenu(false)}>
				<div
					tabIndex={0}
					role="button"
					onClick={toggleMenu(false)}
					onKeyDown={toggleMenu(false)}>
					{itemsList}
				</div>
			</Drawer>
		</div>
	);
	return show;
}

/*
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/

export default Header;
