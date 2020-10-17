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
	if (props.isEvent) {
		item = (
			<Card className={classes.root}>
				<CardActionArea onClick={handleClickOpen}>
					<CardMedia
						component='img'
						alt='Contemplative Reptile'
						image={props.imageUrl}
						height={225}
					/>
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
				title={props.eventTitle}
				eventDescription={props.eventDescription}
				imageUrl={props.imageUrl}
				location={props.otherProps.location}
				otherProps={props.otherProps}
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
