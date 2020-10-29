import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Button,
	TextField,
	Typography,
	Select,
	MenuItem,
	FormControl,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import * as actions from '../../store/actions/home';

import { connect } from 'react-redux';

import SlideShow from '../../components/UI/slideShow/SlideShow';

const Home = (props) => {
	const [events, setEvents] = useState();
	const [blogs, setBlogs] = useState();
	const [onlineEvents, setOnlineEvents] = useState();

	useEffect(() => {
		console.log('this is use effect in home ');
		props.fetchEvents(props.token);
		props.fetchBlogs(props.token);
		setEvents(props.allEvents);
		setOnlineEvents(props.allOnlineEvents);
		setBlogs(props.allBlogs);
	}, []);

	let onlineEventSection = null;
	let allEventSection = null;
	let blogSection = null;

	if (props.onFetchingEvents) {
		onlineEventSection = <CircularProgress />;
		allEventSection = <CircularProgress />;
	} else {
		onlineEventSection = (
			<SlideShow
				slideItems={props.allOnlineEvents}
				token={props.token}
				username={props.username}
				isEvent={true}
				isProfile={false}
				isRsvpList={false}
			/>
		);
		allEventSection = (
			<SlideShow
				slideItems={props.allEvents}
				token={props.token}
				username={props.username}
				isEvent={true}
				isProfile={false}
				isRsvpList={false}
			/>
		);
	}

	if (props.onFetchingBlogs) {
		blogSection = <CircularProgress />;
	} else {
		blogSection = (
			<SlideShow
				slideItems={props.allBlogs}
				token={props.token}
				username={props.username}
				isEvent={false}
				isProfile={false}
				isRsvpList={false}
			/>
		);
	}

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={8}>
					<TextField
						variant='outlined'
						size='small'
						fullWidth
						name='searchTerm'
						placeholder='Search'
						// label='Search Term'
						type='text'
						id='search-term'
						// inputRef={register({ required: true })}
						// error={errors.username?.type === 'required'}
					/>
				</Grid>
				<Grid item xs={3} sm={3} md={2}>
					<FormControl variant='outlined' style={{ width: '100%' }}>
						<FormControl variant='outlined'>
							{/* <InputLabel id='demo-simple-select-filled-label'>Age</InputLabel> */}
							<Select
								displayEmpty
								value={''}
								onChange={() => {
									console.log('');
								}}
								style={{ height: '40px' }}>
								<MenuItem value=''>Filter</MenuItem>
								<MenuItem value={10}>Filter 1</MenuItem>
								<MenuItem value={20}>Filter 2</MenuItem>
								<MenuItem value={30}>Filter 3</MenuItem>
							</Select>
						</FormControl>
					</FormControl>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<Button variant='contained' color='primary' size='medium'>
						Search
					</Button>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						Popular Online Events
					</Typography>
					{onlineEventSection}
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						Trending Events
					</Typography>
					{allEventSection}
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						Recent Blogs
					</Typography>
					{blogSection}
				</Grid>
			</Grid>
		</Container>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		username: state.auth.username,
		onFetchingEvents: state.home.onFetchingEvents,
		onFetchingBlogs: state.home.onFetchingBlogs,
		allOnlineEvents: state.home.allOnlineEvents,
		allEvents: state.home.allEvents,
		allBlogs: state.home.allBlogs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchEvents: (token) => dispatch(actions.fetchEvents(token)),
		fetchBlogs: (token) => dispatch(actions.fetchBlogs(token)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
