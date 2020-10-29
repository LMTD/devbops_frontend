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
				},
			);
			console.log('this is fetching all events: ', data);

			if (data.Status) {
				const allOnlineEvents = data.EventsDB.filter(
					(event) => event.Online === 'Online',
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
				},
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

const rsvpEventSuccess = (rsvpEventTitle, username) => {
	return {
		type: actionTypes.RSVP_EVENT_SUCCESS,
		rsvpEventTitle: rsvpEventTitle,
		rsvpUsername: username,
	};
};

export const rsvpEvent = (token, eventTitle, username) => {
	return async (dispatch) => {
		// dispatch(onFetchEvents());
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
				},
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
				},
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

		console.log(
			'this is filterValue: ',
			filterValue,
			' this is events: ',
			events,
		);
		let filteredEvents = null;

		if (filterValue === 'Only Online') {
			filteredEvents = events.filter((event) => event.Online === 'Online');
		} else if (filterValue === 'Only In-Person') {
			filteredEvents = events.filter((event) => event.Online !== 'Online');
		} else {
			filteredEvents = events;
		}

		console.log('this is filteredEvents: ', filteredEvents);

		dispatch(filterEventsSuccess(filteredEvents));
	};
};
