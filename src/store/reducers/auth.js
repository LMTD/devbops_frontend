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
	authLoading: false,
	authAlertMessage: '',
	authAlertSeverity: '',
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ON_AUTH:
			return {
				...state,
				authLoading: true,
			};

		case actionTypes.AUTH_FAIL: {
			return {
				...state,
				authLoading: false,
				authAlertMessage: action.alertMessage,
				authAlertSeverity: 'error',
			};
		}

		case actionTypes.REGISTER_SUCCESS: {
			return {
				...state,
				authLoading: false,
				authAlertMessage: action.alertMessage,
				authAlertSeverity: 'success',
			};
		}

		case actionTypes.AUTH_SUCCESS:
			// console.log('this is state in auth: ', state);
			return {
				...state,
				token: action.token,
				username: action.username,
				email: action.email,
				firstName: action.firstName,
				lastName: action.lastName,
				city: action.city,
				country: action.country,
				authLoading: false,
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
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

		case actionTypes.CLEAR_ALERT_MESSAGE:
			return {
				...state,
				authLoading: false,
				authAlertMessage: '',
				authAlertSeverity: '',
			};

		default:
			return state;
	}
};

export default authReducer;
