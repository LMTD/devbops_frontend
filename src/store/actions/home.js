import * as actionTypes from './actionTypes';
import axios from 'axios';
import moment from 'moment';

const onFetchEvents = () => {
	return {
		type: actionTypes.ON_GET_EVENTS,
	};
};

const onFetchEvents = (allEvents, onlineEvents) => {
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
