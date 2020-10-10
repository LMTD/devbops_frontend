import * as actionTypes from './actionTypes';

export const authSuccess = (token) => {
	console.log('this is token:', token);
	localStorage.setItem('token', JSON.stringify(token));
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		launchClicked: true,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		let token = localStorage.getItem('token');
		token = JSON.parse(token);

		if (token) {
			dispatch(authSuccess(token));
		} else {
			// dispatch(logout());
		}
	};
};
