import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
	Grid,
	Container,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import * as actions from '../../store/actions/auth';
import AccountSection from '../../components/profile/accountSection/AccountSection';
import SlideShow from '../../components/UI/slideShow/SlideShow';

const Profile = (props) => {
	const [blogLoading, setBlogLoading] = useState(false);
	const [myBlogs, setMyBlogs] = useState([]);
	const [rsvpLoading, setRSVPloading] = useState(false);
	const [rsvpList, setRSVPlist] = useState([]);
	const [eventsLoading, setEventsLoading] = useState(false);
	const [events, setEvents] = useState([]);
	useEffect(() => {
		const getAllBlogs = async () => {
			setBlogLoading(true);
			try {
				const { data } = await axios.post(
					'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
					{
						Action: 'H',
						Token: props.token,
						BlogSubject: null,
						BlogBody: null,
						Location: null,
						Date: null,
						Time: null,
						Comment: null,
					},
				);
				console.log('this is blogs: ', data);
				if (data.Status) {
					setMyBlogs(data.BlogsDB);
				}
				setBlogLoading(false);
			} catch (err) {
				console.log('there is error in fetch blog history: ', err);
			}
		};

		const getAllRSVIPs = async () => {
			setRSVPloading(true);
			try {
				const { data } = await axios.post(
					'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
					{
						Token: props.token,
						Action: 'VH',
						eventTitle: null,
						eventDate: null,
						eventTime: null,
						eventDescription: null,
						imgUrl: null,
						locationDetail: null,
						eventType: null,
					},
				);
				console.log('this is rsvp list: ', data);
				if (data.Status) {
					setRSVPlist(data.RSVP);
				}
				setRSVPloading(false);
			} catch (err) {
				console.log('there is error in fetch rsvp list: ', err);
			}
		};

		const getAllEvents = async () => {
			setEventsLoading(true);
			try {
				const { data } = await axios.post(
					'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
					{
						Action: 'H',
						Token: props.token,
						eventTitle: null,
						eventDate: null,
						eventTime: null,
						eventDescription: null,
						imgUrl: null,
						locationDetail: null,
						eventType: null,
					},
				);
				console.log('this is events: ', data);
				if (data.Status) {
					setEvents(data.EventsDB);
				}
				setEventsLoading(false);
			} catch (err) {
				console.log('there is error in fetch blog history: ', err);
			}
		};

		getAllBlogs();
		getAllRSVIPs();
		getAllEvents();
	}, []);

	let blogSection = null;
	let rsvpSection = null;
	let eventSection = null;

	if (blogLoading) {
		blogSection = <CircularProgress />;
	} else {
		blogSection = <SlideShow slideItems={myBlogs} isEvent={false} />;
	}
	if (rsvpLoading) {
		rsvpSection = <CircularProgress />;
	} else {
		rsvpSection = (
			<SlideShow
				slideItems={rsvpList}
				isEvent={true}
				myEvent={false}
				rsvpEvent={true}
			/>
		);
	}

	if (eventsLoading) {
		eventSection = <CircularProgress />;
	} else {
		eventSection = (
			<SlideShow
				slideItems={events}
				isEvent={true}
				myEvent={true}
				rsvpEvent={false}
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
	return {
		token: state.token,
		rsvpList: state.rsvpList,
		myBlogs: state.myBlogs,
		myEvents: state.myEvents,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};
export default connect(mapStateToProps)(Profile);
