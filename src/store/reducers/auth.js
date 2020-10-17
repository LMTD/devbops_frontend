import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	username: null,
	email: null,
	firstName: null,
	lastName: null,
	city: null,
	country: null,
	launchFirstClicked: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SUCCESS:
			// console.log('this is actions: ', action);
			return {
				...state,
				token: action.token,
				username: action.username,
				email: action.email,
				firstName: action.firstName,
				lastName: action.lastName,
				city: action.city,
				country: action.country,
				launchFirstClicked: action.launchClicked,
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				launchFirstClicked: false,
			};
		case actionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				email: action.newEmail,
				firstName: action.newFirstName,
				lastName: action.newLastName,
				city: action.newCity,
				country: action.newCountry,
			};
		default:
			return initialState;
	}
};

export default reducer;
