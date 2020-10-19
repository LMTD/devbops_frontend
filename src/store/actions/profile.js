import * as actionTypes from './actionTypes';
import axios from 'axios';

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
		type: actionTypes.GET_EVENTS_SUCCESS,
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
		type: actionTypes.GET_BLOGS_SUCCESS,
		myBlogs: blogs,
	};
};
