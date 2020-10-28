import * as actionTypes from '../actions/actionTypes';

const initialState = {
	blogs: [],
	events: [],
	onLineEvents: [],
	onfetchingEvents: false,
	onfetchingBlogs: false,
};

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ON_GET_EVENTS:
			return {
				...state,
				onfetchingEvents: true,
			};

		default:
			return state;
	}
};

export default homeReducer;
