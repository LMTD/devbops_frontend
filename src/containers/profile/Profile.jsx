import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	Grid,
	Container,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import * as actions from '../../store/actions/profile';
import AccountSection from '../../components/profile/accountSection/AccountSection';
import SlideShow from '../../components/UI/slideShow/SlideShow';

const Profile = (props) => {
	const [blogLoading, setBlogLoading] = useState(false);
	const [rsvpLoading, setRSVPloading] = useState(false);
	const [eventsLoading, setEventsLoading] = useState(false);

	useEffect(() => {
		// console.log('this is use effect in profile');
		// const { onFetchBlogs, onFetchEvents } = props;
		setRSVPloading(true);
		props.onFetchEvents(props.token, 'VH');
		setRSVPloading(false);
		setEventsLoading(true);
		props.onFetchEvents(props.token, 'H');
		setEventsLoading(false);
		setBlogLoading(true);
		props.onFetchBlogs(props.token);
		setBlogLoading(false);
	}, []);

	// props.onFetchEvents(props.token, 'VH');
	// props.onFetchEvents(props.token, 'H');
	// props.onFetchBlogs(props.token);

	let blogSection = null;
	let rsvpSection = null;
	let eventSection = null;
	// console.log('this is props in profile: ', props);

	if (rsvpLoading) {
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
	if (eventsLoading) {
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
	if (blogLoading) {
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

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12}>
					<AccountSection />
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchEvents: (token, action) =>
			dispatch(actions.onFetchEvents(token, action)),
		onFetchBlogs: (token) => dispatch(actions.onFetchBlogs(token)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
