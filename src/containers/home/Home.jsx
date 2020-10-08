import React from 'react';
import { Container, Grid, Button, TextField } from '@material-ui/core';
const Home = () => {
	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={10} sm={10} md={10}>
					<TextField
						variant='outlined'
						size='small'
						fullWidth
						name='searchTerm'
						// label='Search Term'
						type='text'
						id='search-term'
						// inputRef={register({ required: true })}
						// error={errors.username?.type === 'required'}
					/>
				</Grid>
				<Grid item xs={2} sm={2} md={2}>
					<Button variant='contained' color='primary'>
						Search
					</Button>
				</Grid>
				<Grid item xs={12} sm={12}>
					<h1>Popular Events</h1>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
