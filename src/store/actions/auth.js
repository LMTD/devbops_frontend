import * as actionTypes from './actionTypes';

export const authSuccess = (
	token,
	launchClicked,
	username,
	email,
	firstName,
	lastName,
	city,
	country,
) => {
	const userData = {
		token: token,
		username: username,
		email: email,
		firstName: firstName,
		lastName: lastName,
		city: city,
		country: country,
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

export const authCheckState = () => {
	return (dispatch) => {
		let userData = localStorage.getItem('userData');
		userData = JSON.parse(userData);
		// console.log('this is userData in authcheck: ', userData);
		if (userData !== null) {
			dispatch(
				authSuccess(
					userData.token,
					false,
					userData.username,
					userData.email,
					userData.firstName,
					userData.lastName,
					userData.city,
					userData.country,
				),
			);
		} else {
			dispatch(logout());
		}
	};
};

export const launchedClicked = () => {
	return { type: actionTypes.LAUNCH_FIRST_CLICKED };
};

export const updateUserSuccess = (
	email,
	firstName,
	lastName,
	city,
	country,
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
