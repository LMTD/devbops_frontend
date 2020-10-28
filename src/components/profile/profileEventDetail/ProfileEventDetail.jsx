import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Dialog,
	DialogContent,
	Card,
	CardContent,
	CardMedia,
	Grid,
	DialogActions,
	Button,
	Avatar,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	Fab,
	CardActionArea,
} from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DialogTitle from '../../UI/dialogTitle/DialogTitle';
import moment from 'moment';
import * as actions from '../../../store/actions/profile';
import EventDetail from './eventDetail/EventDetail';
import ListData from '../../UI/listData/ListData';


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
const ProfileEventDetail = (props) => {
	const { register, handleSubmit, errors, getValues, reset, watch } = useForm();
	const classes = useStyles();
	const [isEditEventMode, setIsEditEventMode] = useState(false);
	const [eventType, setEventType] = useState(props.Online);
	const [selectedFile, setSelectedFile] = useState(props.Event_image);
	const [isSelectImageMode, setIsSelectImageMode] = useState(false);

	const handleDeleteEvent = () => {
		console.log('handle delete event clicked')
		props.onDeleteEvent(props.token, props.event_name);
	};

	const handleEditMode = () => {
		setIsEditEventMode(!isEditEventMode);
	};

	const handleRadioChange = (event) => {
		setEventType(event.target.value);
	};

	const imageResetHandler = () => {
		setSelectedFile(null);
		setIsSelectImageMode(true);
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

	const handleEditEventForm = (formData) => {
		console.log('edit event form is clicked: ', FormData);
		props.onUpdateEvent(
			props.token,
			formData.eventTitle,
			formData.eventDate,
			formData.eventTime,
			formData.eventType,
			formData.locationDetail,
			selectedFile,
			formData.eventDescription,
		);
		handleEditMode();
	};

	const handleCancelRSVP = () => {
		console.log('handleCancelRSVP clicked')
		props.onCancelRSVP(props.token, props.event_name);
	}

	let eventImageSection = (
		<CardContent
			style={{
				border: '1px solid rgba(0, 0, 0, 0.23)',
				height: '80%',
			}}>
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
				}}>
				<label htmlFor='contained-button-file'>
					<Fab
						component='span'
						style={{
							color: blue[900],
							margin: 10,
						}}>
						<AddPhotoAlternateIcon />
					</Fab>
				</label>

				<label
					htmlFor='contained-button-file'
					style={{ cursor: 'pointer', color: '#9a9494' }}>
					Click to add main event image (optional)
				</label>
			</div>
		</CardContent>
	);

	if (!isSelectImageMode) {
		eventImageSection = (
			<CardActionArea onClick={imageResetHandler} style={{ height: '100%' }}>
				{/* <img width='100%' src={selectedFile} alt='the img that you uploaded' /> */}
				{selectedFile ? (
					<img
						width='100%'
						src={selectedFile}
						alt='the img that you uploaded'
					/>
				) : (
					<div style={{ height: '100%' }}>
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
				)}
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
					defaultValue={props.Event_location}
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
					defaultValue={props.Event_location}
					inputRef={register({ required: true })}
				/>
			</Grid>
		);
	}

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
						margin: '0 auto'
					}}>
					{props.event_name[0]}
				</Avatar>
			</div>
		);
	}

	let eventSection = null;
	let editFormSection = null;
	let rsvpList = null;
	if (props.isRsvpList === false) {
		if (!isEditEventMode) {
			editFormSection = (<EventDetail {...props} handleEditMode={handleEditMode} handleDeleteEvent={handleDeleteEvent} imageArea={imageArea} />);
			
		} else if (isEditEventMode) {
			editFormSection = (
				<form onSubmit={handleSubmit(handleEditEventForm)}>
					<DialogContent style={{ padding: '12px 24px' }} dividers>
						<Card className={classes.root}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={5}>
									{eventImageSection}
								</Grid>
								<Grid item xs={12} sm={12} md={7}>
									<div className={classes.details}>
										<CardContent className={classes.content}>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={12} md={12}>
													<TextField
														variant='outlined'
														size='small'
														fullWidth
														name='eventTitle'
														label='Event Title *'
														defaultValue={props.event_name}
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
														defaultValue={moment(props.Event_date, [
															'dddd MMM Do YY',
														]).format('YYYY-MM-DD')}
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
														defaultValue={moment(props.Event_time, [
															'h:mm A',
														]).format('HH:mm')}
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
														onChange={handleRadioChange}>
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
														defaultValue={props.Event_desc}
														multiline
														rows={3}
														type='text'
														inputRef={register({ required: true })}
													/>
												</Grid>
											</Grid>
										</CardContent>
									</div>
								</Grid>
							</Grid>
						</Card>
					</DialogContent>
					<DialogActions>
						<Button type='submit' color='primary' variant='contained'>
							Save
						</Button>
						<Button
							color='secondary'
							variant='contained'
							onClick={handleEditMode}>
							Cancel
						</Button>
					</DialogActions>
				</form>
			);
		}
		
	} else if (props.isRsvpList === true) {
			editFormSection = (<EventDetail {...props} imageArea={imageArea} handleCancelRSVP={handleCancelRSVP} />)
		
	}
	eventSection = (
			<Dialog
				disableBackdropClick
				open={props.open}
				onClose={props.handleClose}
				maxWidth='md'
				aria-labelledby='responsive-dialog-title'>
				<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
					{isEditEventMode ? 'Edit Mode' : props.event_name}
				</DialogTitle>
			{editFormSection}
			
			</Dialog>
		);
	return eventSection;
};
const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		username: state.auth.username,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDeleteEvent: (token, eventTitle) =>
			dispatch(actions.onDeleteEvent(token, eventTitle)),
		onUpdateEvent: (
			token,
			eventTitle,
			eventDate,
			eventTime,
			eventType,
			locationDetail,
			imgUrl,
			eventDescription,
		) =>
			dispatch(
				actions.onUpdateEvent(
					token,
					eventTitle,
					eventDate,
					eventTime,
					eventType,
					locationDetail,
					imgUrl,
					eventDescription,
				),
			),
		onCancelRSVP: (token, eventTitle) => {
			dispatch(actions.onCancelRSVP(token, eventTitle))
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEventDetail);
