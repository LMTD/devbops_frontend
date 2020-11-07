import * as actionTypes from '../actions/actionTypes';

const initialState = {
	myBlogs: [],
	myRsvpList: [],
	myEvents: [],
	onFetchingMyBlogs: false,
	onFetchingMyRsvpList: false,
	onFetchingMyEvents: false,
	alertMessage: '',
	createdAlertMessage: '',
	createdAlertType: '',
	isCreating: false,
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ON_FETCHING_RSVP_LIST:
			return {
				onFetchingMyRsvpList: true,
			};

		case actionTypes.FETCH_RSVP_LIST_SUCCESS:
			return {
				...state,
				myRsvpList: action.myRsvpList,
				onFetchingMyRsvpList: false,
			};

		case actionTypes.ON_FETCHING_MY_EVENTS:
			return {
				...state,
				onFetchingMyEvents: true,
			};

		case actionTypes.FETCH_MY_EVENTS_SUCCESS:
			return {
				...state,
				myEvents: action.myEvents,
				onFetchingMyEvents: false,
			};

		case actionTypes.ON_FETCHING_MY_BLOGS:
			return {
				...state,
				onFetchingMyBlogs: true,
			};

		case actionTypes.FETCH_MY_BLOGS_SUCCESS:
			return {
				...state,
				myBlogs: action.myBlogs,
				onFetchingMyBlogs: false,
			};

		case actionTypes.DELETE_MY_EVENT_SUCCESS:
			return {
				...state,
				myEvents: state.myEvents.filter(
					(event) => event.event_name !== action.deletedEventTitle
				),
				alertMessage: `${action.deletedEventTitle} Deleted Successfully`,
			};

		case actionTypes.DELETE_MY_BLOG_SUCCESS:
			return {
				...state,
				myBlogs: state.myBlogs.filter(
					(blog) => blog.blogName !== action.deletedBlogSubject
				),
				alertMessage: `${action.deletedBlogSubject} Deleted Successfully`,
			};

		case actionTypes.CANCEL_RSVP_SUCCESS:
			return {
				...state,
				myRsvpList: state.myRsvpList.filter(
					(rsvp) => rsvp.event_name !== action.cancelledRSVP
				),
				alertMessage: `Cancel ${action.cancelledRSVP}'s RSVP Successfully`,
			};

		case actionTypes.UPDATE_EVENT_SUCCESS:
			return {
				...state,
				myEvents: state.myEvents.map((event) => {
					const updatedEvent = JSON.parse(JSON.stringify(event));
					if (event.event_name === action.eventTitle) {
						updatedEvent.Event_date = action.eventDate;
						updatedEvent.Event_desc = action.eventDescription;
						updatedEvent.Event_image = action.imgUrl;
						updatedEvent.Event_location = action.locationDetail;
						updatedEvent.Event_time = action.eventTime;
						updatedEvent.Online = action.eventType;
					}
					return updatedEvent;
				}),
			};

		case actionTypes.ON_CREATING:
			return {
				...state,
				createdAlertMessage: '',
				createdAlertType: '',
				isCreating: true,
			};

		case actionTypes.CREATED_FAIL:
			return {
				...state,
				createdAlertMessage: action.alertMessage,
				createdAlertType: action.alertType,
				isCreating: false,
			};

		case actionTypes.CREATED_EVENT_SUCCESS:
			const newEvent = {
				Event_date: action.eventDate,
				Event_desc: action.eventDescription,
				Event_image: action.imgUrl,
				Event_location: action.locationDetail,
				Online: action.eventType,
				RSVP: [],
				User: action.creator,
				event_name: action.eventTitle,
			};

			return {
				...state,
				createdAlertMessage: action.alertMessage,
				createdAlertType: action.alertType,
				myEvents: [...state.myEvents, { ...newEvent }],
				isCreating: false,
			};

		case actionTypes.CLEAR_ALERT_MESSAGE:
			return {
				...state,
				createdAlertMessage: '',
				createdAlertType: '',
				isCreating: false,
			};

		default:
			return state;
	}
};

export default profileReducer;
