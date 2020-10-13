import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	launchFirstClicked: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.token,
				launchFirstClicked: action.launchClicked,
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				launchFirstClicked: false,
			};
		default:
			return initialState;
	}
};

export default reducer;
