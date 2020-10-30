import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	Grid,
	Container,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as actions from '../../store/actions/profile';
import AccountSection from '../../components/profile/accountSection/AccountSection';
import SlideShow from '../../components/UI/slideShow/SlideShow';

const Profile = (props) => {
	useEffect(() => {
		props.fetchEvents(props.token, 'VH');
		props.fetchEvents(props.token, 'H');
		props.fetchBlogs(props.token);
	}, []);

	let blogSection = null;
	let rsvpSection = null;
	let eventSection = null;
	if (props.onFetchingMyRsvpList) {
		rsvpSection = <CircularProgress />;
	} else {
		rsvpSection = (
			<SlideShow
				token={props.token}
				slideItems={props.myRsvpList}
				isEvent={true}
				isProfile={true}
				isRsvpList={true}
			/>
		);
	}
	if (props.onFetchingMyEvents) {
		eventSection = <CircularProgress />;
	} else {
		eventSection = (
			<SlideShow
				token={props.token}
				slideItems={props.myEvents}
				isEvent={true}
				isProfile={true}
				isRsvpList={false}
			/>
		);
	}
	if (props.onFetchingMyBlogs) {
		blogSection = <CircularProgress />;
	} else {
		blogSection = (
			<SlideShow
				token={props.token}
				slideItems={props.myBlogs}
				isEvent={false}
				isProfile={true}
				isRsvpList={false}
			/>
		);
	}

	let alertMessage = null;

	if (props.alertMessage !== '') {
		alertMessage = <Alert severity='success'>{props.alertMessage}</Alert>;
	}

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12}>
					<AccountSection />
				</Grid>

				<Grid item xs={12} sm={12} md={12}>
					{alertMessage}
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						My Blogs
					</Typography>
					{blogSection}
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						My RSVPs
					</Typography>
					{rsvpSection}
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						My Events
					</Typography>
					{eventSection}
				</Grid>
			</Grid>
		</Container>
	);
};
const mapStateToProps = (state) => {
	// console.log('this is state: ', state);
	return {
		token: state.auth.token,
		myRsvpList: state.profile.myRsvpList,
		myBlogs: state.profile.myBlogs,
		myEvents: state.profile.myEvents,
		onFetchingMyBlogs: state.profile.onFetchingMyBlogs,
		onFetchingMyRsvpList: state.profile.onFetchingMyRsvpList,
		onFetchingMyEvents: state.profile.onFetchingMyEvents,
		alertMessage: state.profile.alertMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchEvents: (token, action) =>
			dispatch(actions.fetchEvents(token, action)),
		fetchBlogs: (token) => dispatch(actions.fetchBlogs(token)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
