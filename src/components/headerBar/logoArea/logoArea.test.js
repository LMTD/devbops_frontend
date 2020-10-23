import React from 'react';
import { shallow } from 'enzyme';
import LogoArea from './LogoArea';

describe('Logo Area Component', () => {
	it('Should render LogoArea component without error', () => {
		const component = shallow(<LogoArea />);
		const wrapper = component.find('.logoComponent');

		expect(wrapper.length).toBe(1);
	});
});
