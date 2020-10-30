import * as actionTypes from './actionTypes';
import axios from 'axios';
import moment from 'moment';

export const onFetchEvents = (token, action) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Token: token,
					Action: action,
					eventTitle: null,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				},
			);
			// console.log('this is data: ', data);

			if (data.Status && data.hasOwnProperty('RSVP')) {
				dispatch(getRsvpListSuccess(data.RSVP));
			} else if (data.Status && data.hasOwnProperty('EventsDB')) {
				dispatch(getEventsSuccess(data.EventsDB));
			}
		} catch (err) {}
	};
};

const getRsvpListSuccess = (rsvpList) => {
	// console.log('this is rsvpList: ', rsvpList);

	return {
		type: actionTypes.GET_RSVP_LIST_SUCCESS,
		myRsvpList: rsvpList,
	};
};

const getEventsSuccess = (events) => {
	// console.log('this is events: ', events);
	return {
		type: actionTypes.GET_MY_EVENTS_SUCCESS,
		myEvents: events,
	};
};

export const onFetchBlogs = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
				{
					Action: 'H',
					Token: token,
					BlogSubject: null,
					BlogBody: null,
					Location: null,
					Date: null,
					Time: null,
					Comment: null,
				},
			);
			console.log('this is blogs fetching: ', data);

			if (data.Status) {
				dispatch(getBlogsSuccess(data.BlogsDB));
			}
		} catch (err) {
			console.log('there is error in fetch blog history: ', err);
			return [];
		}
	};
};

export const getBlogsSuccess = (blogs) => {
	return {
		type: actionTypes.GET_MY_BLOGS_SUCCESS,
		myBlogs: blogs,
	};
};

export const onDeleteEvent = (token, eventTitle) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Token: token,
					Action: 'D',
					eventTitle: eventTitle,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				},
			);
			console.log('this is data in on delete event: ', data);

			if (data.Status) {
				dispatch(deleteEventSuccess(eventTitle));
			}
		} catch (err) {
			// console.log(
			// 	'there is an error with action: ',
			// 	action,
			// 	' and this is error: ',
			// 	err,
			// );
		}
	};
};

export const deleteEventSuccess = (eventTitle) => {
	return {
		type: actionTypes.DELETE_MY_EVENT_SUCCESS,
		deletedEventTitle: eventTitle,
	};
};

export const onUpdateEvent = (
	token,
	eventTitle,
	eventDate,
	eventTime,
	eventType,
	locationDetail,
	imgUrl,
	eventDescription,
) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Token: token,
					Action: 'U',
					eventTitle: eventTitle,
					eventDate: moment(eventDate).format('dddd MMM  Do YYYY'),
					eventTime: moment(`${eventDate}, ${eventTime}`).format('h:mm a'),
					eventType: eventType,
					locationDetail: locationDetail,
					imgUrl: imgUrl,
					eventDescription: eventDescription,
				},
			);
			console.log('this is data in on  onUpdateEvent: ', data);

			if (data.Status) {
				dispatch(
					updatedEventSuccess(
						eventTitle,
						moment(eventDate).format('dddd MMM  Do YYYY'),
						moment(`${eventDate}, ${eventTime}`).format('h:mm a'),
						eventType,
						locationDetail,
						imgUrl,
						eventDescription,
					),
				);
			}
		} catch (err) {}
	};
};

const updatedEventSuccess = (
	eventTitle,
	eventDate,
	eventTime,
	eventType,
	locationDetail,
	imgUrl,
	eventDescription,
) => {
	return {
		type: actionTypes.UPDATE_EVENT_SUCCESS,
		eventTitle: eventTitle,
		eventDate: eventDate,
		eventTime: eventTime,
		eventType: eventType,
		locationDetail: locationDetail,
		imgUrl: imgUrl,
		eventDescription: eventDescription,
	};
};

export const onDeleteBlog = (token, blogSubject) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
				{
					Action: 'D',
					Token: token,
					BlogSubject: blogSubject,
					BlogBody: null,
					Location: null,
					Date: null,
					Time: null,
					Comment: null,
				},
			);
			console.log('this is delete blog: ', data);

			if (data.Status) {
				dispatch(deleteBlogSuccess(blogSubject));
			}
		} catch (err) {
			console.log('there is error in fetch blog history: ', err);
			return [];
		}
	};
};

export const deleteBlogSuccess = (blogSubject) => {
	return {
		type: actionTypes.DELETE_MY_BLOG_SUCCESS,
		deletedBlogSubject: blogSubject,
	};
};

export const onCancelRSVP = (token, eventTitle) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Token: token,
					Action: 'CV',
					eventTitle: eventTitle,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				},
			);
			console.log('this is data in on cancel rsvp event: ', data);

			if (data.Status) {
				dispatch(cancelRSVPSuccess(eventTitle));
			}
		} catch (err) {}
	};
};

export const cancelRSVPSuccess = (eventTitle) => {
	return {
		type: actionTypes.CANCEL_RSVP_SUCCESS,
		cancelledRSVP: eventTitle,
	};
};
