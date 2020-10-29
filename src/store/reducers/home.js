import * as actionTypes from '../actions/actionTypes';

const initialState = {
	allBlogs: [],
	allEvents: [],
	allOnlineEvents: [],
	filteredEvents: [],
	filteredBlogs: [],
	onFetchingEvents: true,
	onFetchingBlogs: true,
	onPostingBlogComment: false,
	onLoadingHomeData: false,
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
				filteredEvents: action.allEvents,
				onFetchingEvents: false,
			};

		case actionTypes.GET_BLOGS_SUCCESS:
			return {
				...state,
				allBlogs: action.allBlogs,
				filteredBlogs: action.allBlogs,
				onFetchingBlogs: false,
			};

		case actionTypes.RSVP_EVENT_SUCCESS:
			return {
				...state,
				allEvents: state.allEvents.map((event) => {
					if (event.event_name === action.rsvpEventTitle) {
						if (event.RSVP.indexOf(action.rsvpUsername) === -1) {
							const updatedEvent = JSON.parse(JSON.stringify(event));
							updatedEvent.RSVP.push(action.rsvpUsername);
							return updatedEvent;
						}
					}
					return event;
				}),
				allOnlineEvents: state.allOnlineEvents.map((event) => {
					if (event.event_name === action.rsvpEventTitle) {
						if (event.RSVP.indexOf(action.rsvpUsername) === -1) {
							const updatedEvent = JSON.parse(JSON.stringify(event));
							updatedEvent.RSVP.push(action.rsvpUsername);
							return updatedEvent;
						}
					}
					return event;
				}),
				filteredEvents: state.allEvents.map((event) => {
					if (event.event_name === action.rsvpEventTitle) {
						if (event.RSVP.indexOf(action.rsvpUsername) === -1) {
							const updatedEvent = JSON.parse(JSON.stringify(event));
							updatedEvent.RSVP.push(action.rsvpUsername);
							return updatedEvent;
						}
					}
					return event;
				}),
				onFetchingEvents: false,
			};

		case actionTypes.ON_POSTING_BLOG_COMMENT:
			return {
				...state,
				onPostingBlogComment: true,
			};

		case actionTypes.COMMENT_BLOG_SUCCESS:
			return {
				...state,
				allBlogs: state.allBlogs.map((blog) => {
					if (blog.blogName === action.blogSubject) {
						const updatedBlog = JSON.parse(JSON.stringify(blog));
						updatedBlog.BlogComment[action.username] = action.blogComment;
						return updatedBlog;
					}
					return blog;
				}),
				filteredBlogs: state.allBlogs.map((blog) => {
					if (blog.blogName === action.blogSubject) {
						const updatedBlog = JSON.parse(JSON.stringify(blog));
						updatedBlog.BlogComment[action.username] = action.blogComment;
						return updatedBlog;
					}
					return blog;
				}),
				onPostingBlogComment: false,
			};

		case actionTypes.ON_FILTER:
			return {
				...state,
				onLoadingHomeData: true,
			};

		case actionTypes.FILTER_EVENTS_SUCCESS:
			return {
				...state,
				filteredEvents: action.filteredEvents,
				onLoadingHomeData: false,
			};

		case actionTypes.SEARCH_BLOGS_AND_EVENTS_SUCCESS:
			return {
				...state,
				filteredEvents: action.matchedEvents,
				onLoadingHomeData: false,
			};

		default:
			return state;
	}
};

export default homeReducer;
