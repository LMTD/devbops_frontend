import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';

import LogoArea from '../../components/headerBar/logoArea/LogoArea';
import RightSection from '../../components/headerBar/rightSection/RightSection';

const HeaderBar = (props) => {
	return (
		<AppBar
			position='static'
			style={{ marginBottom: '40px', background: '#fffa71' }}>
			<Toolbar>
				<LogoArea isAuthenticated={props.isAuthenticated} />
				<RightSection
					isAuthenticated={props.isAuthenticated}
					launchClicked={props.launchClicked}
				/>
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		launchClicked: state.auth.launchClicked,
	};
};

export default connect(mapStateToProps)(HeaderBar);
