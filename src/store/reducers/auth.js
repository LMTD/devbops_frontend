import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	launchClicked: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.token,
				launchClicked: action.launchClicked,
			};
		default:
			return initialState;
	}
};

export default reducer;
