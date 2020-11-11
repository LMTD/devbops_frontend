import * as actionTypes from './actionTypes';
import axios from 'axios';
import { config } from '../../constants';

const eventUrl = config.urls.EVENT_URL;
const blogUrl = config.urls.BLOG_URL;
console.log('this is blogurl: ', blogUrl);
const onFetchEvents = () => {
	return {
		type: actionTypes.ON_GET_EVENTS,
	};
};

const getEventsSuccess = (allEvents, onlineEvents) => {
	return {
		type: actionTypes.GET_EVENTS_SUCCESS,
		allEvents: allEvents,
		allOnlineEvents: onlineEvents,
	};
};

export const fetchEvents = () => {
	return async (dispatch) => {
		dispatch(onFetchEvents());
		try {
			const { data } = await axios.get(eventUrl);
			// console.log('this is fetching all events: ', data);

			if (data.Status) {
				const allOnlineEvents = data.EventsDB.filter(
					(event) => event.Online === 'Online'
				);
				console.log('this is allOnlineEvents: ', allOnlineEvents);
				dispatch(getEventsSuccess(data.EventsDB, allOnlineEvents));
			}
		} catch (err) {}
	};
};

const getBlogsSuccess = (blogs) => {
	return {
		type: actionTypes.GET_BLOGS_SUCCESS,
		allBlogs: blogs,
	};
};

export const fetchBlogs = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(blogUrl);

			console.log('this is data in blogs: ', data);

			if (data.Status) {
				dispatch(getBlogsSuccess(data.BlogsDB));
			}
		} catch (err) {
			console.log('there is an error in fetch all blogs: ', err);
		}
	};
};

const onRSVP = () => {
	return {
		type: actionTypes.ON_RSVP,
	};
};

const rsvpEventSuccess = (rsvpEventTitle, username) => {
	return {
		type: actionTypes.RSVP_EVENT_SUCCESS,
		rsvpEventTitle: rsvpEventTitle,
		rsvpUsername: username,
	};
};

export const rsvpEvent = (token, eventTitle, username) => {
	return async (dispatch) => {
		dispatch(onRSVP());

		try {
			// console.log('this is event title: ', props);
			const { data } = await axios.post(eventUrl, {
				Token: token,
				Action: 'V',
				eventTitle: eventTitle,
				eventDate: null,
				eventTime: null,
				eventDescription: null,
				imgUrl: null,
				locationDetail: null,
				eventType: null,
			});
			// console.log('this is data in rsvp event: ', data);
			if (data.Status) {
				dispatch(rsvpEventSuccess(eventTitle, username));
			}
		} catch (err) {
			console.log('there is an error in rsvp: ', err);
		}
	};
};

const onPostingBlogComment = () => {
	return {
		type: actionTypes.ON_POSTING_BLOG_COMMENT,
	};
};

const commentBlogSuccess = (username, blogSubject, blogComment) => {
	return {
		type: actionTypes.COMMENT_BLOG_SUCCESS,
		username: username,
		blogSubject: blogSubject,
		blogComment: blogComment,
	};
};

export const postBlogComment = (token, username, blogSubject, blogComment) => {
	return async (dispatch) => {
		dispatch(onPostingBlogComment());
		try {
			const { data } = await axios.post(blogUrl, {
				Action: 'Q',
				Token: token,
				BlogSubject: blogSubject,
				BlogBody: null,
				Location: null,
				Date: null,
				Time: null,
				Comment: blogComment,
			});
			// console.log('this is data: ', data);
			if (data.Status) {
				dispatch(commentBlogSuccess(username, blogSubject, blogComment));
			}
		} catch (err) {
			console.log('there is error in comment: ', err);
		}
	};
};

const onFilter = () => {
	return {
		type: actionTypes.ON_FILTER,
	};
};

const filterEventsSuccess = (filteredEvents) => {
	return {
		type: actionTypes.FILTER_EVENTS_SUCCESS,
		filteredEvents: filteredEvents,
	};
};

export const filteringEvents = (filterValue, events) => {
	return (dispatch) => {
		dispatch(onFilter());
		let filteredEvents = null;

		if (filterValue === 'Only Online') {
			filteredEvents = events.filter((event) => event.Online === 'Online');
		} else if (filterValue === 'Only In-Person') {
			filteredEvents = events.filter((event) => event.Online !== 'Online');
		} else {
			filteredEvents = events;
		}

		dispatch(filterEventsSuccess(filteredEvents));
	};
};

const searchBlogsAndEventsSuccess = (matchedEvents) => {
	return {
		type: actionTypes.SEARCH_BLOGS_AND_EVENTS_SUCCESS,
		matchedEvents: matchedEvents,
	};
};

export const searchingBlogsAndEvents = (
	filterValue,
	searchTerm,
	events
	// blogs,
) => {
	return (dispatch) => {
		dispatch(onFilter());
		let filteredEvents = null;
		// let fiteredBlogs = null;
		if (filterValue === 'Only Online') {
			filteredEvents = events.filter((event) => event.Online === 'Online');
		} else if (filterValue === 'Only In-Person') {
			filteredEvents = events.filter((event) => event.Online !== 'Online');
		} else {
			filteredEvents = events;
		}

		if (searchTerm !== '') {
			filteredEvents = filteredEvents.filter(
				(event) =>
					event.Event_date.indexOf(searchTerm) !== -1 ||
					event.Event_desc.indexOf(searchTerm) !== -1 ||
					event.Event_location.indexOf(searchTerm) !== -1 ||
					event.Event_time.indexOf(searchTerm) !== -1 ||
					event.event_name.indexOf(searchTerm) !== -1
			);
		}
		dispatch(searchBlogsAndEventsSuccess(filteredEvents));
	};
};

const onCreating = () => {
	return {
		type: actionTypes.ON_CREATING,
	};
};

const createdFail = (message) => {
	return {
		type: actionTypes.CREATED_FAIL,
		alertMessage: message,
		alertType: 'error',
	};
};

const createdEventSuccess = (
	username,
	eventTitle,
	eventDate,
	eventTime,
	eventType,
	locationDetail,
	imgUrl,
	eventDescription
) => {
	return {
		type: actionTypes.CREATED_EVENT_SUCCESS,
		creator: username,
		eventTitle: eventTitle,
		eventDate: eventDate,
		eventTime: eventTime,
		eventType: eventType,
		locationDetail: locationDetail,
		imgUrl: imgUrl,
		eventDescription: eventDescription,
		alertMessage: 'Event created successfully',
		alertType: 'success',
	};
};

export const createEvent = (
	token,
	username,
	eventTitle,
	eventDate,
	eventTime,
	eventType,
	locationDetail,
	imgUrl,
	eventDescription
) => {
	return async (dispatch) => {
		dispatch(onCreating());

		try {
			const { data } = await axios.post(eventUrl, {
				Action: 'C',
				Token: token,
				eventTitle: eventTitle,
				eventDate: eventDate,
				eventTime: eventTime,
				eventType: eventType,
				locationDetail: locationDetail,
				imgUrl: imgUrl,
				eventDescription: eventDescription,
			});

			// console.log('this is data from create event: ', data);
			if (data.Status) {
				dispatch(
					createdEventSuccess(
						username,
						eventTitle,
						eventDate,
						eventTime,
						eventType,
						locationDetail,
						imgUrl,
						eventDescription
					)
				);
			} else {
				dispatch(createdFail(data.Description));
			}
		} catch (err) {
			console.log('created event error: ', err);
			dispatch(createdFail('Networking error, please try again!'));
		}
	};
};

const postedBlogSuccess = (
	username,
	blogSubject,
	blogBody,
	currentDate,
	currentTime,
	currentLocation
) => {
	return {
		type: actionTypes.POSTED_BLOG_SUCCESS,
		username: username,
		blogSubject: blogSubject,
		blogBody: blogBody,
		currentDate: currentDate,
		currentTime: currentTime,
		currentLocation: currentLocation,
		alertMessage: 'Blog posted successfully',
		alertType: 'success',
	};
};

export const postBlog = (
	token,
	username,
	blogSubject,
	blogBody,
	currentDate,
	currentTime,
	currentLocation
) => {
	return async (dispatch) => {
		dispatch(onCreating());

		try {
			const { data } = await axios.post(blogUrl, {
				Action: 'C',
				Token: token,
				BlogSubject: blogSubject,
				BlogBody: blogBody,
				Date: currentDate,
				Time: currentTime,
				Comment: null,
				Location: currentLocation,
			});
			// console.log('this is data from post blog: ', data);
			if (data.Status) {
				dispatch(
					postedBlogSuccess(
						username,
						blogSubject,
						blogBody,
						currentDate,
						currentTime,
						currentLocation
					)
				);
			} else {
				dispatch(createdFail(data.Description));
			}
		} catch (err) {
			console.log('post blog error: ', err);
			dispatch(createdFail('Networking error, please try again!'));
		}
	};
};

export const clearAlertMessage = () => {
	return {
		type: actionTypes.CLEAR_ALERT_MESSAGE,
	};
};
