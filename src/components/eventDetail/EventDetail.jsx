import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Grid,
	DialogActions,
	Button,
	Avatar,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DialogTitle from '../UI/dialogTitle/DialogTitle';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		boxShadow: 'none',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 400,
		margin: '0 20px',
	},
}));
const EventDetail = (props) => {
	let history = useHistory();
	const classes = useStyles();
	const [editEventMode, setEditEventMode] = useState(false);
	const handleRSVP = async () => {
		try {
			console.log('this is event title: ', props);
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Token: props.token,
					Action: 'V',
					eventTitle: props.eventTitle,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				},
			);
			console.log('this is data in rsvp event: ', data);
			if (data.Status) {
				history.push('/asd');
			}
		} catch (err) {
			console.log('there is an error in rsvp: ', err);
		}
	};

	const cancelRSVP = async () => {
		try {
			// console.log('this is event title: ', props);
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Action: 'CV',
					Token: props.token,
					eventTitle: props.eventTitle,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				},
			);
			console.log('this is data in cancel rsvp: ', data);
			if (data.Status) {
				history.push('/cancel-rsvp');
			}
		} catch (err) {
			console.log('there is an error in rsvp: ', err);
		}
	};

	const deleteEvent = async () => {
		try {
			// console.log('this is event title: ', props);
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Action: 'D',
					Token: props.token,
					eventTitle: props.eventTitle,
					eventDate: null,
					eventTime: null,
					eventDescription: null,
					imgUrl: null,
					locationDetail: null,
					eventType: null,
				},
			);
			console.log('this is data in cancel rsvp: ', data);
			if (data.Status) {
				history.push('/cancel-rsvp');
				props.handleClose();
			}
		} catch (err) {
			console.log('there is an error in rsvp: ', err);
		}
	};

	let rsvpButton = null;
	// console.log('this is url : ', window.location.href);
	if (window.location.href.includes('profile')) {
		rsvpButton = (
			<Button
				autoFocus
				onClick={cancelRSVP}
				color='secondary'
				variant='contained'>
				Cancel RSVP
			</Button>
		);
	} else {
		rsvpButton = (
			<Button
				autoFocus
				onClick={handleRSVP}
				color='secondary'
				variant='contained'
				disabled={props.eventRSVPList.includes(props.username)}>
				{`RSVP ${
					props.eventRSVPList.length > 0
						? '(' + props.eventRSVPList.length + ')'
						: ''
				}`}
			</Button>
		);
	}
	if (props.myEvent) {
		rsvpButton = (
			<Button
				autoFocus
				color='secondary'
				variant='contained'
				onClick={deleteEvent}>
				Delete
			</Button>
		);
	}
	let imageArea = null;

	if (props.eventImageUrl !== '') {
		imageArea = (
			<CardMedia
				className={classes.cover}
				component='img'
				alt={`Iamge of ${props.eventTitle}`}
				image={props.eventImageUrl}
				height={400}
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

	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			maxWidth='md'
			aria-labelledby='responsive-dialog-title'>
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				{props.eventTitle}
			</DialogTitle>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				<Card className={classes.root}>
					{imageArea}
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={6}>
									<Typography component='h6' variant='h6'>
										Date And Time
									</Typography>
									<Typography
										component='p'
										variant='subtitle2'
										color='textSecondary'
										display='block'>
										{/* {moment().format('dddd')},{' '}
										{moment().format('MMMM Do YYYY, h:mm a')} */}
										{`${props.eventDate}, ${props.eventTime}`}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12} md={6}>
									<Typography component='h6' variant='h6'>
										Location
									</Typography>
									<Typography
										component='p'
										variant='subtitle2'
										color='textSecondary'>
										{props.eventLocation}
									</Typography>
								</Grid>
								<Grid item>
									<Typography component='h6' variant='h6'>
										About The Event
									</Typography>
									<Typography
										component='p'
										variant='subtitle2'
										color='textSecondary'>
										{props.eventDescription}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12} md={12}></Grid>
							</Grid>
						</CardContent>
					</div>
				</Card>
			</DialogContent>
			<DialogActions>{rsvpButton}</DialogActions>
		</Dialog>
		// <div>123</div>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.token,
		username: state.username,
	};
};
export default connect(mapStateToProps)(EventDetail);
