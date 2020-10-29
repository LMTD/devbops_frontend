import React from 'react';
import {
	DialogContent,
	Typography,
	Card,
	CardContent,
	Grid,
	DialogActions,
	Button,
	Dialog,
	CardMedia,
	Avatar,
	Link,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../UI/dialogTitle/DialogTitle';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/home';

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
		marginRight: '30px',
	},
}));
const EventDetail = (props) => {
	const classes = useStyles();

	// console.log('this is props in event detail: ', props);

	const handleRSVP = () => {
		props.rsvpEvent(props.token, props.event_name, props.username);
		props.handleClose();
	};

	let imageArea = null;

	if (props.Event_image !== '' && props.Event_image !== 'None') {
		imageArea = (
			<CardMedia
				className={classes.cover}
				component='img'
				alt={`Iamge of ${props.eventTitle}`}
				image={props.Event_image}
				height={400}
			/>
		);
	} else {
		imageArea = (
			<div style={{ height: '100%' }}>
				<Avatar
					aria-label='recipe'
					style={{
						fontSize: '10em',
						width: '80%',
						height: '100%',
						backgroundColor: red[500],
						margin: '0 auto',
					}}>
					{props.event_name[0]}
				</Avatar>
			</div>
		);
	}

	let buttonText = null;
	let notAllowedToClick = false;
	if (props.User === props.username) {
		notAllowedToClick = true;
		buttonText = 'You cannot RSVP your own event';
	} else if (props.RSVP.length === 0) {
		buttonText = 'Be the first one to RSVP';
	} else if (props.RSVP.indexOf(props.username) !== -1) {
		notAllowedToClick = true;
		buttonText = 'You already RSVP';
	} else if (props.RSVP.indexOf(props.username) === -1) {
		buttonText = `RSVP(${props.RSVP.length})`;
	}
	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			maxWidth='md'
			aria-labelledby='responsive-dialog-title'>
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				{props.event_name}
			</DialogTitle>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				<Card className={classes.root}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={5}>
							{imageArea}
						</Grid>
						<Grid item xs={12} sm={12} md={7}>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<Grid container spacing={2}>
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											style={{ textAlign: 'center' }}>
											<Typography variant='h4'>{props.event_name}</Typography>
										</Grid>

										<Grid item xs={2} sm={2} md={2}>
											<label
												htmlFor='eventDate'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												Date
											</label>
										</Grid>
										<Grid item xs={5} sm={5} md={5}>
											<Typography variant='subtitle1'>
												{props.Event_date}
											</Typography>
										</Grid>

										<Grid item xs={2} sm={2} md={2}>
											<label
												htmlFor='eventTime'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												Time
											</label>
										</Grid>
										<Grid item xs={3} sm={3} md={3}>
											<Typography variant='subtitle1'>
												{props.Event_time}
											</Typography>
										</Grid>

										<Grid
											item
											xs={props.Online === 'Online' ? 2 : 3}
											sm={props.Online === 'Online' ? 2 : 3}
											md={props.Online === 'Online' ? 2 : 3}>
											<label
												htmlFor='eventLocation'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												{props.Online === 'Online' ? 'URL' : 'Address'}
											</label>
										</Grid>

										<Grid item xs={8} sm={8} md={8}>
											<Typography variant='subtitle1'>
												{props.Online === 'Online' ? (
													<Link
														href={props.Event_location}
														target='_blank'
														rel='noopener noreferrer'>
														{props.Event_location}
													</Link>
												) : (
													props.Event_location
												)}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={12} md={12}>
											<label
												htmlFor='eventLocation'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												Event Description
											</label>
										</Grid>
										<Grid item xs={12} sm={12} md={12}>
											<Typography
												component='p'
												variant='subtitle2'
												color='textPrimary'>
												{props.Event_desc}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</div>
						</Grid>
					</Grid>
				</Card>
			</DialogContent>
			<DialogActions>
				<Button
					color='primary'
					variant='contained'
					onClick={handleRSVP}
					disabled={notAllowedToClick}>
					{buttonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		rsvpEvent: (token, eventTitle, username) => {
			dispatch(actions.rsvpEvent(token, eventTitle, username));
		},
	};
};
export default connect(null, mapDispatchToProps)(EventDetail);
