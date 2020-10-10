import React from 'react';
import Carousel from 'react-elastic-carousel';
import SlideItem from './slideItem/SlideItem';

import './SlideShow.css';

const SlideShow = (props) => {
	// console.log('this is props: ', props);

	let items = null;
	if (props.isEvent) {
		items = props.slideItems.map((item) => {
			const { eventTitle, eventDescription, eventImgUrl, ...others } = item;
			return (
				<SlideItem
					key={eventTitle}
					eventTitle={eventTitle}
					eventDescription={eventDescription}
					imageUrl={eventImgUrl}
					otherProps={others}
				/>
			);
		});
	} else {
		items = props.slideItems.map((item) => {
			const { blogTitle, blogBody, blogAuthor, ...others } = item;
			return (
				<SlideItem
					key={blogTitle}
					blogTitle={blogTitle}
					blogBody={blogBody}
					blogAuthor={blogAuthor}
					otherProps={others}
				/>
			);
		});
	}

	return (
		<Carousel itemsToShow={4} pagination={false} enableMouseSwipe={false}>
			{items}
		</Carousel>
	);
};

export default SlideShow;
