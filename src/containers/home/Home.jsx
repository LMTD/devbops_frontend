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
import Alert from '@material-ui/lab/Alert';

import { useForm } from 'react-hook-form';

import * as actions from '../../store/actions/home';

import { connect } from 'react-redux';

import SlideShow from '../../components/UI/slideShow/SlideShow';

const Home = (props) => {
	const [filterValue, setFilterValue] = useState('All Events');
	const { register, handleSubmit, watch } = useForm();
	const watchFields = watch(['searchTerm']);
	useEffect(() => {
		console.log('this is use effect in home ');
		props.fetchEvents(props.token);
		props.fetchBlogs(props.token);
	}, []);

	const handleChangeFilterValue = (event) => {
		setFilterValue(event.target.value);

		props.searchingBlogsAndEvents(
			event.target.value,
			watchFields.searchTerm,
			props.allEvents,
		);
	};

	const handleSearch = (formData) => {
		console.log('this is handle search: ', formData);
		props.searchingBlogsAndEvents(
			filterValue,
			formData.searchTerm,
			props.allEvents,
		);
	};

	let allEventSection = null;
	let blogSection = null;

	if (props.onFetchingEvents) {
		allEventSection = <CircularProgress />;
	} else {
		allEventSection = (
			<SlideShow
				slideItems={props.filteredEvents}
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
				slideItems={props.filteredBlogs}
				token={props.token}
				username={props.username}
				isEvent={false}
				isProfile={false}
				isRsvpList={false}
			/>
		);
	}

	let alertContent = null;

	if (props.alertType === 'success') {
		alertContent = <Grid item xs={12} sm={12} md={12}>
			<Alert severity={props.alertType}>{props.alertMessage}</Alert>
		</Grid>
	}


	return (
		<Container>
			<form onSubmit={handleSubmit(handleSearch)}>
				<Grid container spacing={3}>
					<Grid item xs={8} sm={8} md={8}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='searchTerm'
							placeholder='Search'
							type='text'
							inputRef={register()}
							id='search-term'
						/>
					</Grid>
					<Grid item xs={3} sm={3} md={3}>
						<FormControl variant='outlined' style={{ width: '100%' }}>
							<FormControl variant='outlined'>
								<Select
									displayEmpty
									value={filterValue}
									onChange={handleChangeFilterValue}
									style={{ height: '40px' }}>
									<MenuItem value='All Events'>All Events</MenuItem>
									<MenuItem value='Only Online'>Only Online</MenuItem>
									<MenuItem value='Only In-Person'>Only In-Person</MenuItem>
								</Select>
							</FormControl>
						</FormControl>
					</Grid>
					<Grid item xs={1} sm={1} md={1}>
						<Button
							variant='contained'
							color='primary'
							size='medium'
							type='submit'>
							Search
						</Button>
					</Grid>
					{alertContent}
					{props.onLoadingHomeData ? (
						<Grid item xs={12} sm={12}>
							<CircularProgress />
						</Grid>
					) : (
							<Grid item xs={12} sm={12}>
								<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
									Trending Events
							</Typography>
								{allEventSection}
							</Grid>
						)}

					<Grid item xs={12} sm={12}>
						<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
							Recent Blogs
						</Typography>
						{blogSection}
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		username: state.auth.username,
		onFetchingEvents: state.home.onFetchingEvents,
		onFetchingBlogs: state.home.onFetchingBlogs,
		filteredEvents: state.home.filteredEvents,
		filteredBlogs: state.home.filteredBlogs,
		// allOnlineEvents: state.home.allOnlineEvents,
		allEvents: state.home.allEvents,
		allBlogs: state.home.allBlogs,
		onLoadingHomeData: state.home.onLoadingHomeData,
		alertMessage: state.home.alertMessage,
		alertType: state.home.alertType,

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchEvents: (token) => dispatch(actions.fetchEvents(token)),
		fetchBlogs: (token) => dispatch(actions.fetchBlogs(token)),
		filteringEvents: (filterValue, events) =>
			dispatch(actions.filteringEvents(filterValue, events)),
		searchingBlogsAndEvents: (filterValue, searchTerm, events) =>
			dispatch(
				actions.searchingBlogsAndEvents(filterValue, searchTerm, events),
			),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
