import * as actionTypes from '../actions/actionTypes';

const initialState = {
	myBlogs: [],
	myRsvpList: [],
	myEvents: [],
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_RSVP_LIST_SUCCESS:
			return {
				...state,
				myRsvpList: action.myRsvpList,
			};
		case actionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
				myEvents: action.myEvents,
			};

		case actionTypes.GET_BLOGS_SUCCESS:
			return {
				...state,
				myBlogs: action.myBlogs,
			};

		case actionTypes.DELETE_EVENT_SUCCESS:
			return {
				...state,
				myEvents: state.myEvents.filter(
					(event) => event.event_name !== action.deletedEventTitle
				),
			};

		case actionTypes.DELETE_BLOG_SUCCESS:
			return {
				...state,
				myBlogs: state.myBlogs.filter(
					(blog) => blog.blogName !== action.deletedBlogSubject
				),
			};

		case actionTypes.CANCEL_RSVP_SUCCESS:
			return {
				...state,
				myRsvpList: state.myRsvpList.filter(
					(rsvp) => rsvp !== action.cancelledRSVP
				),
			};

		default:
			return state;
	}
};

export default profileReducer;
