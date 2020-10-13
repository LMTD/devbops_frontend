import React from 'react';
import { Grid, Container, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import moment from 'moment';

const CreateEvent = () => {
	const { register, handleSubmit, errors, reset, watch } = useForm();

	const submitCreateEventForm = async (formData) => {
		/**
		 * Action: one of 'C U R D'
		 * EventName: string
		 * EventDescription: string
		 * Location: country and city
		 * Date: Date
		 * Time: Date
		 * Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6InVzZXJuYW1lIiwiZXhwIjoxNjAyMzc1MDI0LCJpYXQiOjE2MDIyODg2MjR9.72HH661pvz-eG_uEK_KxQvgu8IyYtNx9n-ZSZv-BB5c
		 * Image: base64 encoded string
		 *  url: 'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/user',
		 *
		 */

		console.log('this is form data: ', formData);

		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
				{
					Action: 'C',
					EventName: formData.eventName,
					EventDescription: formData.eventDescription,
					Location: formData.location,
					Date: formData.date,
					Time: formData.time,
					EventID: null,
					Token:
						'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6InVzZXJuYW1lIiwiZXhwIjoxNjAyMzc1MDI0LCJpYXQiOjE2MDIyODg2MjR9.72HH661pvz-eG_uEK_KxQvgu8IyYtNx9n-ZSZv-BB5c',
					Image:
						'data:image/png;base64,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',
				},
			);
			if (data.Status) {
				console.log('this is data: ', data);
				// setAlertSeverity('success');
				// setAlertMessage('Login Successfully');
				reset();
			} else {
				console.log('data.error: ', data.Error);
				// setAlertSeverity('error');
				// setAlertMessage(data.Error);
			}
		} catch (err) {
			console.log('there is an error in login: ', err);
		}
	};

	return (
		<Container fixed>
			<form
				onSubmit={handleSubmit(submitCreateEventForm)}
				style={{ margin: '20px 0' }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='eventName'
							label='Event Name'
							type='text'
							id='eventName'
							inputRef={register({ required: true })}
							// error={errors.username?.type === 'required'}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='eventDescription'
							label='Event Description'
							type='text'
							multiLine
							row='2'
							id='eventDescription'
							inputRef={register({ required: true })}
							// error={errors.password?.type === 'required'}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='location'
							label='Location'
							type='text'
							id='location'
							inputRef={register({ required: true })}
							// error={errors.password?.type === 'required'}
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='date'
							label='Date'
							type='date'
							id='date'
							inputRef={register({ required: true })}
							// error={errors.password?.type === 'required'}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='time'
							label='Time'
							type='time'
							id='time'
							inputRef={register({ required: true })}
							// error={errors.password?.type === 'required'}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='image'
							label='Image'
							type='text'
							id='image'
							inputRef={register({ required: true })}
							// error={errors.password?.type === 'required'}
						/>
					</Grid>
					<Grid container justify='center'>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							// disabled={ !(watchFields.username && watchFields.password) }
						>
							Create Event
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default CreateEvent;
