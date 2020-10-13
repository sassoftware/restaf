import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

function ListItemLink (props) {
	const { icon, primary, to, classes } = props;
	
	const CustomLink = React.useMemo(() =>
		React.forwardRef((linkProps, ref) => (
			<Link ref={ref} to={to}  {...linkProps} />
		)), [to]
	);

	return (
		<li>
			<ListItem button component={CustomLink} className={classes.list} >
				{(icon != null) ? <ListItemIcon>{icon}</ListItemIcon> : null}
				<ListItemText primary={primary} />
			</ListItem>
		</li>
	);
}


export default ListItemLink;