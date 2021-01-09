import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Grid,
	Button,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	CardContent,
	Fab,
	Card,
	CardActionArea,
	CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import blue from '@material-ui/core/colors/blue';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as homeActions from '../../store/actions/home';
import * as profileActions from '../../store/actions/profile';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		boxShadow: 'none',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: '30px',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 400,
		margin: '0 20px',
	},
}));

const CreateEvent = (props) => {
	const classes = useStyles();
	const { register, handleSubmit, watch } = useForm();
	const [eventType, setEventType] = useState('');
	const [selectedFile, setSelectedFile] = useState('');
	const [isSelectImageMode, setIsSelectImageMode] = useState(true);
	const watchFields = watch([
		'eventTitle',
		'eventDate',
		'eventTime',
		'eventType',
		'locationDetail',
		'eventDescription',
	]);
	const handleRadioChange = (event) => {
		setEventType(event.target.value);
	};
	const handleCreateEvent = (formData) => {
		const eventDate = moment(formData.eventDate).format('dddd MMM  Do YYYY');
		const eventTime = moment(
			`${formData.eventDate}, ${formData.eventTime}`
		).format('h:mm a');
		if (window.location.href.includes('/profile')) {
			props.createEventOnProfile(
				props.token,
				props.username,
				formData.eventTitle,
				eventDate,
				eventTime,
				formData.eventType,
				formData.locationDetail,
				selectedFile,
				formData.eventDescription
			);
		} else if (window.location.href.includes('/')) {
			props.createEventOnHome(
				props.token,
				props.username,
				formData.eventTitle,
				eventDate,
				eventTime,
				formData.eventType,
				formData.locationDetail,
				selectedFile,
				formData.eventDescription
			);

		}
		// reset();
	};

	const handleUploadClick = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function (e) {
			setSelectedFile(reader.result);
		};
		setIsSelectImageMode(false);
		setSelectedFile(event.target.files[0]);
	};

	const imageResetHandler = () => {
		setSelectedFile(null);
		setIsSelectImageMode(true);
	};

	let eventImageSection = (
		<CardContent
			style={{
				border: '1px solid rgba(0, 0, 0, 0.23)',
				height: '75%',
			}}
		>
			<TextField
				accept='image/*'
				id='contained-button-file'
				multiple
				type='file'
				name='eventImage'
				fullWidth
				inputRef={register()}
				onChange={handleUploadClick}
				style={{ display: 'none' }}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<label htmlFor='contained-button-file'>
					<Fab
						component='span'
						style={{
							color: blue[900],
							margin: 10,
						}}
					>
						<AddPhotoAlternateIcon />
					</Fab>
				</label>

				<label
					htmlFor='contained-button-file'
					style={{ cursor: 'pointer', color: '#9a9494' }}
				>
					Click to add main event image (optional)
				</label>
			</div>
		</CardContent>
	);

	if (!isSelectImageMode) {
		eventImageSection = (
			<CardActionArea onClick={imageResetHandler}>
				<img width='100%' src={selectedFile} alt='the img that you uploaded' />
			</CardActionArea>
		);
	}

	let eventDetail = null;

	if (eventType === 'Online') {
		eventDetail = (
			<Grid item xs={12} sm={12} md={12}>
				<TextField
					variant='outlined'
					size='small'
					fullWidth
					name='locationDetail'
					label='Hosting Link URL *'
					type='text'
					defaultValue=''
					inputRef={register({ required: true })}
				/>
			</Grid>
		);
	} else if (eventType === 'In-Person') {
		eventDetail = (
			<Grid item xs={12} sm={12} md={12}>
				<TextField
					variant='outlined'
					size='small'
					fullWidth
					name='locationDetail'
					label='Hosting Address *'
					type='text'
					defaultValue=''
					inputRef={register({ required: true })}
				/>
			</Grid>
		);
	}

	let alert = null;

	if (props.homeAlertMessage) {
		alert = <Alert severity={props.homeAlertType}>{props.homeAlertMessage}</Alert>;
	} else if (props.profileAlertMessage) {
		alert = <Alert severity={props.profileAlertType}>{props.profileAlertMessage}</Alert>;

	}



	let createEventContent = null;

	if (props.homeCreating || props.profileCreating) {
		createEventContent = <CircularProgress />
	} else {
		if (props.homeAlertType === 'success' || props.profileAlertType === 'success') {
			props.onClose()
		}
		createEventContent = (
			<Grid container spacing={3}>

				<Grid item xs={12} sm={12} md={6}>
					{eventImageSection}
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12} md={12}>
									<TextField
										variant='outlined'
										size='small'
										fullWidth
										name='eventTitle'
										label='Event Title *'
										type='text'
										inputRef={register({ required: true })}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={6}>
									<TextField
										fullWidth
										variant='outlined'
										size='small'
										name='eventDate'
										label='Event Date *'
										type='date'
										InputLabelProps={{
											shrink: true,
										}}
										inputRef={register({ required: true })}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={6}>
									<TextField
										fullWidth
										variant='outlined'
										size='small'
										name='eventTime'
										label='Event Time *'
										type='time'
										InputLabelProps={{
											shrink: true,
										}}
										inputRef={register({ required: true })}
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={12}>
									<RadioGroup
										aria-label='event-type'
										name='eventType'
										style={{
											flexDirection: 'row',
											justifyContent: 'space-around',
										}}
										value={eventType}
										onChange={handleRadioChange}
									>
										<FormControlLabel
											value='Online'
											control={<Radio />}
											label='Online'
											inputRef={register({ required: true })}
										/>
										<FormControlLabel
											value='In-Person'
											control={<Radio />}
											label='In-Person'
											inputRef={register({ required: true })}
										/>
									</RadioGroup>
								</Grid>
								{eventDetail}

								<Grid item xs={12} sm={12} md={12}>
									<TextField
										variant='outlined'
										size='small'
										fullWidth
										name='eventDescription'
										placeholder='Please provide some descriptions to the event'
										multiline
										rows={3}
										type='text'
										inputRef={register({ required: true })}
									/>
								</Grid>

								<Grid container justify='center'>
									<Button
										type='submit'
										variant='contained'
										color='primary'
										disabled={
											!(
												watchFields.eventTitle &&
												watchFields.eventDate &&
												watchFields.eventTime &&
												watchFields.eventType &&
												watchFields.locationDetail &&
												watchFields.eventDescription
											)
										}
									>
										Publish
										</Button>
								</Grid>
							</Grid>
						</CardContent>
					</div>
				</Grid>
			</Grid>
		)
	}

	return (
		<form onSubmit={handleSubmit(handleCreateEvent)}>
			{alert}
			<Card className={classes.root}>
				{createEventContent}
			</Card>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		username: state.auth.username,
		homeAlertMessage: state.home.alertMessage,
		homeAlertType: state.home.alertType,
		homeCreating: state.home.isCreating,
		profileCreating: state.profile.isCreating,
		profileAlertMessage: state.profile.createdAlertMessage,
		profileAlertType: state.profile.profileAlertType
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createEventOnHome: (
			token,
			username,
			eventTitle,
			eventDate,
			eventTime,
			eventType,
			locationDetail,
			imgUrl,
			eventDescription
		) =>
			dispatch(
				homeActions.createEvent(
					token,
					username,
					eventTitle,
					eventDate,
					eventTime,
					eventType,
					locationDetail,
					imgUrl,
					eventDescription
				)
			),
		createEventOnProfile: (
			token,
			username,
			eventTitle,
			eventDate,
			eventTime,
			eventType,
			locationDetail,
			imgUrl,
			eventDescription
		) =>
			dispatch(
				profileActions.createEvent(
					token,
					username,
					eventTitle,
					eventDate,
					eventTime,
					eventType,
					locationDetail,
					imgUrl,
					eventDescription
				)
			),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
