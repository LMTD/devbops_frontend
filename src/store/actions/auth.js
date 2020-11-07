import * as actionTypes from './actionTypes';
import moment from 'moment';

export const authSuccess = (
	token,
	launchClicked,
	username,
	email,
	firstName,
	lastName,
	city,
	country
) => {
	let expiredIn = moment().add(1, 'minutes');
	expiredIn = moment(expiredIn).format();
	console.log('this is expiredIn: ', expiredIn);
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
		launchClicked: launchClicked,
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
						false,
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
