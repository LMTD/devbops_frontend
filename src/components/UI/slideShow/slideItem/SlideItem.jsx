import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Avatar,
	CardHeader,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import ProfileBlogDetail from '../../../profile/profileBlogDetail/ProfileBlogDetail';
import ProfileEventDetail from '../../../profile/profileEventDetail/ProfileEventDetail';
import EventDetail from '../../../home/eventDetail/EventDetail';
import BlogDetail from '../../../home/blogDetail/BlogDetail';
import * as homeActions from '../../../../store/actions/home';
import * as profileActions from '../../../../store/actions/profile';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		margin: '0 20px',
		height: '100%',
		width: '100%',
		'&:hover': {
			cursor: 'pointer',
		},
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
		props.homeClearAlertMessage();
		props.profileClearAlertMessage();
	};

	const handleClose = (value) => {
		setOpen(false);
	};
	let item = null;
	let itemDetail = null;
	let imageArea = null;

	// console.log('this is props in slideItem: ', props);

	if (props.Event_image !== '' && props.Event_image !== 'None') {
		imageArea = (
			<CardMedia
				component='img'
				alt='Contemplative Reptile'
				// image={props.eventImageUrl === '' ? logo : props.eventImageUrl}
				image={props.Event_image}
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
					{props.event_name[0]}
				</Avatar>
			</div>
		);
	}

	if (props.isEvent) {
		// console.log('this is props in event : ', props);
		item = (
			<Card className={classes.root} onClick={handleClickOpen}>
				<CardActionArea>
					{imageArea}
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{props.event_name}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{props.Event_desc.length > 40
								? props.Event_desc.slice(0, 40) + '...'
								: props.Event_desc}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);

		if (props.isProfile) {
			itemDetail = (
				<ProfileEventDetail open={open} handleClose={handleClose} {...props} />
			);
		} else {
			itemDetail = (
				<EventDetail open={open} handleClose={handleClose} {...props} />
			);
		}
	} else {
		item = (
			<Card className={classes.root} onClick={handleClickOpen}>
				<CardHeader
					avatar={
						<Avatar aria-label='recipe' className={classes.avatar}>
							{props.UserName[0]}
						</Avatar>
					}
					title={props.blogName}
					subheader={props.BlogDate}
				/>
				<CardActionArea>
					<CardContent>
						<Typography variant='body2' color='textSecondary' component='p'>
							{props.BlogContent.length > 150
								? props.BlogContent.slice(0, 150) + '...'
								: props.BlogContent}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);

		if (props.isProfile) {
			itemDetail = (
				<ProfileBlogDetail open={open} handleClose={handleClose} {...props} />
			);
		} else {
			itemDetail = (
				<BlogDetail open={open} handleClose={handleClose} {...props} />
			);
		}
	}

	return (
		<div style={{ width: '100%' }}>
			{item}
			{itemDetail}
		</div>
	);
};


const mapDispatchToProps = (dispatch) => {

	return {
		homeClearAlertMessage: () => dispatch(homeActions.clearAlertMessage()),
		profileClearAlertMessage: () => dispatch(profileActions.clearAlertMessage())
	}
}

export default connect(null, mapDispatchToProps)(SlideItem);
