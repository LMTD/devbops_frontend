import React from 'react';
import Carousel from 'react-elastic-carousel';
import SlideItem from './slideItem/SlideItem';

import './SlideShow.css';
import { Typography } from '@material-ui/core';

const SlideShow = (props) => {
	let items = null;
	// console.log('this is inProfile: ', props.inProfile);

	if (props.isEvent) {
		items = props.slideItems.map((item) => {
			return (
				<SlideItem
					key={`${item.Event_name} + ${item.User}`}
					isEvent={props.isEvent}
					eventTitle={item.event_name}
					eventDescription={item.Event_desc}
					eventImageUrl={item.Event_image}
					eventDate={item.Event_date}
					eventTime={item.Event_time}
					eventLocation={item.Event_location}
					eventRSVPList={item.RSVP}
					eventOrganizer={item.User}
					eventType={item.Online}
					inProfile={props.inProfile}
					myEvent={props.myEvent}
					rsvpEvent={props.rsvpEvent}
					{...props}
				/>
			);
		});
	} else {
		// console.log('this is props in slideshow in blogs: ', props);

		items = props.slideItems.map((item) => {
			return (
				<SlideItem
					key={item.blogName + item.UserName}
					blogTitle={item.blogName}
					blogBody={item.BlogContent}
					blogAuthor={item.UserName}
					blogDate={item.BlogDate}
					blogTime={item.BlogTime}
					blogLocation={item.BlogLocation}
					blogComment={item.BlogComment}
					updateComment={props.updateComment}
				/>
			);
		});
	}

	let sectionContents = null;
	// console.log('this is is event props: ', props);
	if (props.slideItems.length > 0) {
		sectionContents = (
			<Carousel itemsToShow={4} pagination={false} enableMouseSwipe={false}>
				{items}
			</Carousel>
		);
	} else if (props.slideItems.length === 0 && props.isEvent && !props.myEvent) {
		sectionContents = (
			<Typography variant='h6'>
				There is No Events Happening, Come Back Later.
			</Typography>
		);
	} else if (props.slideItems.length === 0 && props.myEvent) {
		sectionContents = (
			<Typography variant='h6'>You don't have any events.</Typography>
		);
	} else if (props.slideItems.length === 0 && props.rsvpEvent) {
		sectionContents = (
			<Typography variant='h6'>You don't have any RSVP Yet.</Typography>
		);
	} else if (props.slideItems.length === 0 && !props.isEvent) {
		sectionContents = (
			<Typography variant='h6'>There is no blogs...</Typography>
		);
	} else {
		sectionContents = (
			<Typography variant='h6'>You don't have blogs.</Typography>
		);
	}

	return sectionContents;
};

export default SlideShow;
