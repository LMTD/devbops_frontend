import React from 'react';
import { shallow } from 'enzyme';
import RightSection from './RightSection';

import { findByTestAtrr } from '../../../../utils/index';

const setUp = (props = {}) => {
	const component = shallow(<RightSection {...props} />);
	return component;
};

describe('RightSection Component', () => {
	describe('Is authenticated', () => {
		let wrapper;
		beforeEach(() => {
			const props = {
				isAuthenticated: true,
			};
			wrapper = setUp(props);
		});

		it('Should render RightSection Component without error', () => {
			const component = findByTestAtrr(wrapper, 'right-section-component');
			expect(component.length).toBe(1);
		});

		it('Should render create-event-button', () => {
			const createEventButton = findByTestAtrr(wrapper, 'create-event-button');
			expect(createEventButton.length).toBe(1);
		});

		it('Should render post-blog-button', () => {
			const postBlogButton = findByTestAtrr(wrapper, 'post-blog-button');
			expect(postBlogButton.length).toBe(1);
		});

		it('Should render profile-area', () => {
			const profileArea = findByTestAtrr(wrapper, 'profile-area');
			expect(profileArea.length).toBe(1);
		});
	});

	describe('Is NOT authenticated', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setUp();
		});

		it('Should render RightSection Component without error', () => {
			const component = findByTestAtrr(wrapper, 'right-section-component');
			expect(component.length).toBe(1);
		});

		it('Should render create-event-button', () => {
			const createEventButton = findByTestAtrr(wrapper, 'create-event-button');
			expect(createEventButton.length).toBe(0);
		});

		it('Should render post-blog-button', () => {
			const postBlogButton = findByTestAtrr(wrapper, 'post-blog-button');
			expect(postBlogButton.length).toBe(0);
		});

		it('Should render profile-area', () => {
			const launchDevbopsButton = findByTestAtrr(
				wrapper,
				'launch-devbops-button',
			);
			expect(launchDevbopsButton.length).toBe(1);
		});
	});
});
