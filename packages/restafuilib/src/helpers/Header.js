/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemLink from './ListItemLink';

const styles = {
	list: {
		width          : 250,
		backgroundColor: 'white',
		foregroundColor: 'black'
	},
	fullList: {
		width: 'auto'
	},
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft : -12,
		marginRight: 20
	},
	appBar1: {
		backgroundColor: '#2E547B',
		foregroundColor: 'white'
	},
	paper: {
		backgroundColor: 'white'
	}
};

function Header (props) {
	const { useState, useEffect, useRef } = React;
	let [ itemsList, setItemsList ] = useState(null);
	let [ isOpen, setIsOpen ] = useState(false);
	const { classes } = props;

	let lastMenu = useRef('');

	const toggleMenu = state => () => {
		debugger;
		setIsOpen(state);
	};
	useEffect(() => {
		debugger;
		lastMenu.current = props.table;
		let l = makeList(props.menu);
		setItemsList(l);
	}, []);

	debugger;

	useEffect(() => {
		if (lastMenu.current !== props.menu) {
			lastMenu.current = control.menu;
			let l = makeList(props.menu);
			setItemsList(l);
		}
	}, [ props.menu ]);

	let control = {
		menu: props.menu
	};

	const makeList = menu => {
		debugger;
		let items = menu.map((m, key) => {
			return (
				<ListItemLink
					to={m.path}
					primary={m.text}
					icon={null}
					key={key.toString()}
					styles={styles}></ListItemLink>
			);
		});
		console.log(items);
		let tempList = (
			<div className={classes.list}>
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
				className={{ paper: classes.paper }}
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

export default withStyles(styles)(Header);
