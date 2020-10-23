import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';

import { findByTestAtrr } from '../../../../utils/index';

const setUp = (props = {}) => {
	const component = shallow(<Profile {...props} />);
	return component;
};

describe('Profile Component', () => {
	let component;

	beforeEach(() => {
		component = setUp();
	});

	it('Should render PorfileComponent without error', () => {
		const wrapper = findByTestAtrr(component, 'profile-component');

		expect(wrapper.length).toBe(1);
	});

	it('Should render the accountIcon', () => {
		const accountIcon = findByTestAtrr(component, 'account-icon');
		expect(accountIcon.length).toBe(1);
	});

	// it('Should render the My Profile Link', () => {
	// 	const myProfileLink = findByTestAtrr(component, 'myPorfileLink');
	// 	expect(myProfileLink.length).toBe(1);
	// });

	// it('Should render the Logout Link', () => {
	// 	const logoutLink = findByTestAtrr(component, 'logoutLink');
	// 	expect(logoutLink.length).toBe(1);
	// });
});
