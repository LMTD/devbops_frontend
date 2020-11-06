import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const fetchEvents = (token) => {
	return async (dispatch) => {
		dispatch(onFetchEvents());
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Token: token,
					Action: 'R',
					eventTitle: null,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				}
			);
			console.log('this is fetching all events: ', data);

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

export const fetchBlogs = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
				{
					Token: token,
					Action: 'R',
					BlogSubject: null,
					BlogBody: null,
					Date: null,
					Time: null,
					Comment: null,
					Location: null,
				}
			);

			console.log('this is data in blogs: ', data);

			if (data.Status) {
				dispatch(getBlogsSuccess(data.BlogsDB));
			}
		} catch (err) {
			console.log('there is an error in fetch all events: ', err);
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
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Token: token,
					Action: 'V',
					eventTitle: eventTitle,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				}
			);
			console.log('this is data in rsvp event: ', data);
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
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
				{
					Action: 'Q',
					Token: token,
					BlogSubject: blogSubject,
					BlogBody: null,
					Location: null,
					Date: null,
					Time: null,
					Comment: blogComment,
				}
			);
			console.log('this is data: ', data);
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

		// fiteredBlogs = blogs.filter(
		// 	(blog) =>
		// 		blog.BlogComment.indexOf(searchTerm) !== -1 ||
		// 		blog.BlogContent.indexOf(searchTerm) !== -1 ||
		// 		blog.BlogDate.indexOf(searchTerm) !== -1 ||
		// 		blog.BlogLocation.indexOf(searchTerm) !== -1 ||
		// 		blog.BlogTime.indexOf(searchTerm) !== -1 ||
		// 		blog.blogName.indexOf(searchTerm) !== -1);

		dispatch(searchBlogsAndEventsSuccess(filteredEvents));
	};
};

const onCreatingEvent = () => {
	return {
		type: actionTypes.ON_CREATING_EVENT,
	};
};

const createdEventFail = (message) => {
	return {
		type: actionTypes.CREATED_EVENT_FAIL,
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
		dispatch(onCreatingEvent());

		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Action: 'C',
					Token: token,
					eventTitle: eventTitle,
					eventDate: eventDate,
					eventTime: eventTime,
					eventType: eventType,
					locationDetail: locationDetail,
					imgUrl: imgUrl,
					eventDescription: eventDescription,
				}
			);

			console.log('this is data from create event: ', data);
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
				dispatch(createdEventFail(data.Description));
			}
		} catch (err) {
			console.log('created event error: ', err);
			dispatch(createdEventFail('Networking error, please try again!'));
		}
	};
};

export const clearAlertMessage = () => {
	return {
		type: actionTypes.CLEAR_ALERT_MESSAGE,
	};
};
