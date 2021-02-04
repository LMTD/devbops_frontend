import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';

import onlineWorldCuate from '../../images/onlineWorldCuate.png';

const Main = (props) => {


	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12}>
					<Typography component='h1' variant='h1' style={{
						// color: '#000000',
						fontWeight: 'bold',
						// textTransform: 'lowercase',
					}}>
						DevBops is changing the
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Typography component='h1' variant='h1' style={{
						// color: '#000000',
						fontWeight: 'bold',
						// textTransform: 'lowercase',
					}}>
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
						style={{ width: '100%', maxWidth: '900px' }}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};


export default Main;

