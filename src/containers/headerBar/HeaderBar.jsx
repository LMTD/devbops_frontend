import React from 'react';
import { AppBar, Toolbar, Link, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import LogoArea from '../../components/headerBar/logoArea/LogoArea';
import RightSection from '../../components/headerBar/rightSection/RightSection';

const HeaderBar = () => {
	return (
		<AppBar
			position='static'
			style={{ marginBottom: '40px', background: '#fffa71' }}>
			<Toolbar>
				<LogoArea />
				<Grid item xs={1} sm={1}>
					<Link
						component={RouterLink}
						to='/about'
						underline='none'
						style={{ color: 'black' }}>
						About
					</Link>
				</Grid>
				<Grid item xs={1} sm={1}>
					<RightSection />
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default HeaderBar;
