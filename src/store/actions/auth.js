import * as actionTypes from './actionTypes';
import moment from 'moment';
import axios from 'axios';
import { config } from '../../constants';
const userUrl = config.urls.USER_URL;

const onAuth = () => {
	return {
		type: actionTypes.ON_AUTH,
	};
};

const authFail = (alertMessage) => {
	return {
		type: actionTypes.AUTH_FAIL,
		alertMessage: alertMessage,
	};
};

export const clearAlertMessage = () => {
	return {
		type: actionTypes.CLEAR_ALERT_MESSAGE,
	};
};

const authSuccess = (
	token,
	username,
	email,
	firstName,
	lastName,
	city,
	country
) => {
	let expiredIn = moment().add(1, 'days');
	expiredIn = moment(expiredIn).format();
	// console.log('this is expiredIn: ', expiredIn);
	// const now = moment();

	// console.log('this is now.isBefore(expiredIn): ', now.isBefore(expiredIn));
	const userData = {
		token: token,
		username: username,
		email: email,
		firstName: firstName,
		lastName: lastName,
		city: city,
		country: country,
		expiredIn: expiredIn,
	};
	localStorage.setItem('userData', JSON.stringify(userData));
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		username: username,
		email: email,
		firstName: firstName,
		lastName: lastName,
		city: city,
		country: country,
	};
};

const registerSuccess = (alertMessage) => {
	return {
		type: actionTypes.REGISTER_SUCCESS,
		alertMessage: alertMessage,
	};
};

export const register = (
	username,
	password,
	email,
	firstName,
	lastName,
	country,
	city
) => {
	return async (dispatch) => {
		dispatch(onAuth());

		try {
			const { data } = await axios.post(userUrl, {
				Action: 'register',
				Username: username,
				Password: password,
				Email: email,
				FirstName: firstName,
				LastName: lastName,
				Country: country,
				City: city,
			});
			console.log('this is data: ', data);
			if (data.Status) {
				dispatch(registerSuccess('Register Successful!'));
			} else {
				dispatch(
					authFail(
						'Username and/or Email already existed, please enter another one.'
					)
				);
			}
		} catch (err) {
			dispatch(authFail('Network Error, please try again'));
		}
	};
};

export const login = (action, authCode, username, password) => {
	return async (dispatch) => {
		dispatch(onAuth());

		if (action === 'loginLinkedin') {
			console.log('this is authCode: ', authCode);
			try {
				const { data } = await axios.post(userUrl, {
					Action: action,
					Code: authCode,
				});
				console.log('this is data: ', data);
				if (data.Status) {
					dispatch(
						authSuccess(
							data.Token,
							data.Username,
							data.Email,
							data.FirstName,
							data.LastName,
							data.City,
							data.Country
						)
					);
				} else {
					dispatch(authFail('Invalid Username and/or Passowrd'));
				}
			} catch (err) {
				dispatch(authFail('Network Error, please try again'));
			}
		} else if (action === 'login') {
			try {
				const { data } = await axios.post(userUrl, {
					Action: action,
					Username: username,
					Password: password,
				});
				console.log('this is data: ', data);
				if (data.Status) {
					dispatch(
						authSuccess(
							data.Token,
							data.Username,
							data.Email,
							data.FirstName,
							data.LastName,
							data.City,
							data.Country
						)
					);
				} else {
					dispatch(authFail('Invalid Username and/or Passowrd'));
				}
			} catch (err) {
				dispatch(authFail('Network Error, please try again'));
			}
		}
	};
};

export const logout = () => {
	localStorage.clear();
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		let userData = localStorage.getItem('userData');
		userData = JSON.parse(userData);

		if (userData !== null) {
			const now = moment();
			// console.log(
			// 	'userData.expiredIn - now: ',
			// 	moment(userData.expiredIn).diff(now)
			// );

			const expirationTime = moment(userData.expiredIn).diff(now);

			if (now.isBefore(userData.expiredIn)) {
				dispatch(
					authSuccess(
						userData.token,
						userData.username,
						userData.email,
						userData.firstName,
						userData.lastName,
						userData.city,
						userData.country
					)
				);
				dispatch(checkAuthTimeout(expirationTime));
			} else {
				dispatch(logout());
			}
		} else {
			dispatch(logout());
		}
	};
};

export const updateUserSuccess = (
	email,
	firstName,
	lastName,
	city,
	country
) => {
	// console.log('this is updateUserData in reducd');
	let userData = localStorage.getItem('userData');
	userData = JSON.parse(userData);
	userData.email = email;
	userData.firstName = firstName;
	userData.lastName = lastName;
	userData.city = city;
	userData.country = country;
	// console.log('this is userData in update user: ', userData);
	localStorage.setItem('userData', JSON.stringify(userData));

	return {
		type: actionTypes.UPDATE_USER_SUCCESS,
		newEmail: email,
		newFirstName: firstName,
		newLastName: lastName,
		newCity: city,
		newCountry: country,
	};
};
