import React from 'react';
import Carousel from 'react-elastic-carousel';
import SlideItem from './slideItem/SlideItem';

import './SlideShow.css';

const SlideShow = (props) => {
	// console.log('this is props: ', props);
	const items = props.slideItems.map((item) => (
		<SlideItem
			key={item.title}
			title={item.title}
			description={item.description}
			imageUrl={item.imgUrl}
		/>
	));

	return (
		<Carousel itemsToShow={4} pagination={false}>
			{items}
		</Carousel>
	);
};

export default SlideShow;
