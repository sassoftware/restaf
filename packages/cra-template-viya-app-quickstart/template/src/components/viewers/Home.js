import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReadMe from '../helpers/ReadMe';

function Home (props) {
	let { classes } = props;
	let show = (
		<Grid container spacing={4}>
			<Grid item>
				<Paper className={classes.paper}>
					<main className={classes.content}>
						<ReadMe
							text={props.appOptions.README}
						/>
							
					</main>
				</Paper>
			</Grid>
		</Grid>
	);

	return show;
}
export default Home;
