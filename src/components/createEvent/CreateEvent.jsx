import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Grid,
	Container,
	Button,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	CardContent,
	Fab,
	CardActionArea,
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import blue from '@material-ui/core/colors/blue';
import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';

const CreateEvent = () => {
	const { register, handleSubmit, watch } = useForm();
	const [eventType, setEventType] = useState('');
	const [selectedFile, setSelectedFile] = useState('');
	const [isSelectImageMode, setIsSelectImageMode] = useState(true);
	const watchFields = watch([
		'eventTitle',
		'startDate',
		'endDate',
		'eventType',
		'locationDetail',
		'eventDescription',
	]);

	const handleRadioChange = (event) => {
		setEventType(event.target.value);
	};
	const handleCreateEvent = (formData) => {
		console.log(
			'this is form data: ',
			formData,
			' this is selected fiel: ',
			selectedFile,
		);
	};

	const handleUploadClick = (event) => {
		var file = event.target.files[0];
		const reader = new FileReader();
		var url = reader.readAsDataURL(file);
		console.log('file: ', file);
		console.log('this is reader: ', reader);
		// setSelectedFile([reader.result])
		reader.onloadend = function (e) {
			setSelectedFile(reader.result);
		};
		console.log(url); // Would see a path?
		setIsSelectImageMode(false);
		setSelectedFile(event.target.files[0]);
	};

	const imageResetHandler = (event) => {
		setSelectedFile(null);
		setIsSelectImageMode(true);
	};

	let eventImageSection = (
		<CardContent
			style={{
				border: '1px solid black',
			}}>
			<TextField
				accept='image/*'
				id='contained-button-file'
				multiple
				type='file'
				name='eventImage'
				fullWidth
				inputRef={register({ required: true })}
				onChange={handleUploadClick}
				style={{ display: 'none' }}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					textAlign: 'center',
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

	return (
		<Container fixed>
			<form
				onSubmit={handleSubmit(handleCreateEvent)}
				style={{ margin: '20px 0' }}>
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
							name='startDate'
							label='Event Starts *'
							type='datetime-local'
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
							name='endDate'
							label='Event Ends *'
							type='datetime-local'
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
						{eventImageSection}
					</Grid>
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
									watchFields.startDate &&
									watchFields.endDate &&
									watchFields.eventType &&
									watchFields.locationDetail &&
									watchFields.eventDescription
								)
							}>
							Publish
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default CreateEvent;
