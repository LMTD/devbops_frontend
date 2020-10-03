import React from 'react';
import { AppBar, Toolbar, Link, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const HeaderBar = () => {
	return (
		<AppBar position='static' style={{ marginBottom: '40px' }}>
			<Toolbar>
				<div style={{ flexGrow: 1 }}></div>
				<Grid item xs={1}>
					<Link
						component={RouterLink}
						to='/login'
						underline='hover'
						style={{ color: 'white' }}>
						Login Here
					</Link>
				</Grid>
				<Grid item xs={1}>
					<Link
						component={RouterLink}
						to='/register'
						underline='hover'
						style={{ color: 'white' }}>
						Register Here
					</Link>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default HeaderBar;
