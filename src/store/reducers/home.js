import * as actionTypes from '../actions/actionTypes';

const initialState = {
	allBlogs: [],
	allEvents: [],
	allOnlineEvents: [],
	onFetchingEvents: true,
	onFetchingBlogs: true,
};

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ON_GET_EVENTS:
			return {
				...state,
				onFetchingEvents: true,
			};

		case actionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
				allEvents: action.allEvents,
				allOnlineEvents: action.allOnlineEvents,
				onFetchingEvents: false,
			};

		case actionTypes.GET_BLOGS_SUCCESS:
			return {
				...state,
				allBlogs: action.allBlogs,
				onFetchingBlogs: false,
			};

		case actionTypes.RSVP_EVENT_SUCCESS:
			return {
				...state,
				allEvents: state.allEvents.map((event) => {
					if (event.event_name === action.rsvpEventTitle) {
						if (event.RSVP.indexOf(action.rsvpUsername) === -1) {
							console.log(
								'in all events this is action.rsvpUsername: ',
								action.rsvpUsername,
								' and this is action.rsvpEventTitle: ',
								action.rsvpEventTitle,
							);
							const updatedEvent = JSON.parse(JSON.stringify(event));
							updatedEvent.RSVP.push(action.rsvpUsername);
							return updatedEvent;
						}
					}
					return event;
				}),
				allOnlineEvents: state.allOnlineEvents.map((event) => {
					if (event.event_name === action.rsvpEventTitle) {
						console.log(
							'in online events this is event.RSVP.indexOf(action.rsvpUsername): ',
							event.RSVP.indexOf(action.rsvpUsername),
						);
						if (event.RSVP.indexOf(action.rsvpUsername) === -1) {
							console.log(
								'in online events this is action.rsvpUsername: ',
								action.rsvpUsername,
								' and this is action.rsvpEventTitle: ',
								action.rsvpEventTitle,
							);
							const updatedEvent = JSON.parse(JSON.stringify(event));
							updatedEvent.RSVP.push(action.rsvpUsername);
							return updatedEvent;
						}
					}
					return event;
				}),
				onFetchingEvents: false,
			};

		default:
			return state;
	}
};

export default homeReducer;
