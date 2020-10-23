import React from 'react';
import { shallow } from 'enzyme';
import LogoArea from './LogoArea';

import { findByTestAtrr } from '../../../../utils/index';

const setUp = (props = {}) => {
	const component = shallow(<LogoArea {...props} />);
	return component;
};

describe('Logo Area Component', () => {
	let component;

	beforeEach(() => {
		component = setUp();
	});

	it('Should render LogoArea component without error', () => {
		const wrapper = findByTestAtrr(component, 'logoComponent');

		expect(wrapper.length).toBe(1);
	});

	it('Should render the logo', () => {
		const logo = findByTestAtrr(component, 'logoImage');
		expect(logo.length).toBe(1);
	});
});
