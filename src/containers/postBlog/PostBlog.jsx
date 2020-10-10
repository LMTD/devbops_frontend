import React from 'react';
import { Grid, Container, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import moment from 'moment';

const PostBlog = () => {
	const { register, handleSubmit, errors, reset, watch } = useForm();

	const submitCreateBlog = async (formData) => {
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
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
				{
					Action: 'C',
					BlogSubject: formData.blogSubject,
					EventName: formData.eventName,
					BlogBody: formData.blogBody,
					Location: formData.location,
					Date: formData.date,
					BlogID: null,
					Token:
						'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6InVzZXJuYW1lIiwiZXhwIjoxNjAyMzc1MDI0LCJpYXQiOjE2MDIyODg2MjR9.72HH661pvz-eG_uEK_KxQvgu8IyYtNx9n-ZSZv-BB5c',
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
				onSubmit={handleSubmit(submitCreateBlog)}
				style={{ margin: '20px 0' }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='blogSubject'
							label='Blog Subject'
							type='text'
							id='blogSubject'
							inputRef={register({ required: true })}
							// error={errors.username?.type === 'required'}
						/>
					</Grid>
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
							name='blogBody'
							label='Blog Body'
							type='text'
							id='blogBody'
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
							name='location'
							label='Location'
							type='text'
							id='location'
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
							Post
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default PostBlog;
