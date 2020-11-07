import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';

import onlineWorldCuate from '../../images/onlineWorldCuate.png';

const Main = (props) => {

	// if (props.isAuthenticated) {


	// 	if (window.location.href.includes('/profile')) {
	// 		return <Redirect to="/profile" />
	// 	} else {
	// 		return <Redirect to="/home" />

	// 	}
	// }

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12}>
					<Typography component='h1' variant='h1'>
						DevBops is changing the
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Typography component='h1' variant='h1'>
						way Engineers connects
					</Typography>
					<Button
						variant='text'
						style={{
							color: '#000000',
							fontWeight: 'bolder',
							textTransform: 'lowercase',
						}}
						onClick={() => props.history.push('/about')}>
						learn more
					</Button>
				</Grid>
				<Grid item xs={12} sm={12} md={7}>
					<img
						src={onlineWorldCuate}
						alt='Online World Cuate'
						style={{ width: '100%', maxWidth: '1000px' }}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Main);

