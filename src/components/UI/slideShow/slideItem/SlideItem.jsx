import React, { useState } from 'react';
import {
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	IconButton,
	Avatar,
	CardActions,
	CardHeader,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import EventDetail from '../../../eventDetail/EventDetail';
import BlogDetail from '../../../blogDetail/BlogDetail';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		margin: '0 20px',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

const SlideItem = (props) => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
	};
	let item = null;
	let itemDetail = null;
	let imageArea = null;

	if (props.eventImageUrl !== '' && props.eventImageUrl !== 'None') {
		imageArea = (
			<CardMedia
				component='img'
				alt='Contemplative Reptile'
				// image={props.eventImageUrl === '' ? logo : props.eventImageUrl}
				image={props.eventImageUrl}
				height={225}
				// width={400}
			/>
		);
	} else {
		imageArea = (
			<div style={{ height: '225px', width: '225px' }}>
				<Avatar
					aria-label='recipe'
					style={{
						fontSize: '10em',
						width: '100%',
						height: '100%',
						backgroundColor: red[500],
					}}>
					{props.eventTitle[0]}
				</Avatar>
			</div>
		);
	}
	if (props.isEvent) {
		// console.log('this is props in event : ', props);
		item = (
			<Card className={classes.root}>
				<CardActionArea onClick={handleClickOpen}>
					{imageArea}

					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{props.eventTitle}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{props.eventDescription.length > 40
								? props.eventDescription.slice(0, 40) + '...'
								: props.eventDescription}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);

		itemDetail = (
			<EventDetail
				open={open}
				handleClose={handleClose}
				eventTitle={props.eventTitle}
				eventDescription={props.eventDescription}
				// eventImageUrl={props.eventImageUrl === '' ? logo : props.eventImageUrl}
				eventImageUrl={props.eventImageUrl}
				eventLocation={props.eventLocation}
				eventDate={props.eventDate}
				eventTime={props.eventTime}
				eventRSVPList={props.eventRSVPList}
				eventOrganizer={props.eventOrganizer}
				eventType={props.eventType}
				myEvent={props.myEvent}
				rsvpEvent={props.rsvpEvent}
			/>
		);
	} else {
		item = (
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar aria-label='recipe' className={classes.avatar}>
							{props.blogAuthor[0]}
						</Avatar>
					}
					title={props.blogTitle}
					subheader={props.blogDate}
				/>
				<CardActionArea>
					<CardContent onClick={handleClickOpen}>
						<Typography variant='body2' color='textSecondary' component='p'>
							{props.blogBody.length > 150
								? props.blogBody.slice(0, 150) + '...'
								: props.blogBody}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
		itemDetail = (
			<BlogDetail
				open={open}
				handleClose={handleClose}
				blogTitle={props.blogTitle}
				blogBody={props.blogBody}
				blogAuthor={props.blogAuthor}
				blogDate={props.blogDate}
				blogTime={props.blogTime}
				blogLocation={props.blogLocation}
				blogComment={props.blogComment}
				updateComment={props.updateComment}
			/>
		);
	}

	return (
		<div>
			{item}
			{itemDetail}
		</div>
	);
};

export default SlideItem;
