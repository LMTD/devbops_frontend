import React from 'react';
import { AppBar, Toolbar, Link, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import LogoArea from '../../components/headerBar/logoArea/LogoArea';
import RightSection from '../../components/headerBar/rightSection/RightSection';

const HeaderBar = (props) => {
	return (
		<AppBar
			position='static'
			style={{ marginBottom: '40px', background: '#fffa71' }}>
			<Toolbar>
				<LogoArea />
				{/* <Grid item xs={1} sm={1}> */}
				{/* <Link
						component={RouterLink}
						to='/about'
						underline='none'
						style={{ color: 'black' }}>
						About
					</Link> */}
				{/* </Grid> */}
				{/* <Grid item xs={1} sm={1}> */}
				<RightSection
					isAuthenticated={props.isAuthenticated}
					launchClicked={props.launchClicked}
				/>
				{/* </Grid> */}
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.token !== null,
		launchClicked: state.launchClicked,
	};
};

export default connect(mapStateToProps)(HeaderBar);
