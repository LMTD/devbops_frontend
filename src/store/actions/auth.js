import * as actionTypes from './actionTypes';

export const authSuccess = (token, launchClicked) => {
	console.log('this is token:', token);
	localStorage.setItem('token', JSON.stringify(token));
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		launchClicked: launchClicked,
	};
};

export const logout = () => {
	localStorage.clear();
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		let token = localStorage.getItem('token');
		token = JSON.parse(token);

		if (token) {
			dispatch(authSuccess(token, false));
		} else {
			// dispatch(logout());
		}
	};
};
// this is for
export const launchedClicked = () => {
	return { type: actionTypes.LAUNCH_FIRST_CLICKED };
};
