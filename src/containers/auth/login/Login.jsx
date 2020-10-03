import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import {
	Container,
	Typography,
	TextField,
	Button,
	Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Login = () => {
	const [alertSeverity, setAlertSeverity] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	const { register, handleSubmit, errors, reset, watch } = useForm();
	const watchFields = watch(['username', 'password']);

	const submitLoginForm = async (formData) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/user',
				{
					Action: 'login',
					Username: formData.username,
					Password: formData.password,
				},
			);
			console.log('this is data: ', data);
			if (data.statusCode === 200) {
				setAlertSeverity('success');
				setAlertMessage('Login Successfully');
				reset();
			} else {
				setAlertSeverity('error');
				setAlertMessage(data.Error);
			}
		} catch (err) {
			console.log('there is an error in login: ', err);
			setAlertSeverity('error');
			setAlertMessage('Network error');
		}
	};
	return (
		<Container fixed>
			{alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
			<Typography component='h1' variant='h5'>
				Login
			</Typography>
			<form
				onSubmit={handleSubmit(submitLoginForm)}
				style={{ margin: '20px 0' }}>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='username'
					label='Username'
					type='text'
					id='username'
					inputRef={register({ required: true })}
					error={errors.username?.type === 'required'}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					inputRef={register({ required: true })}
					error={errors.password?.type === 'required'}
				/>
				<Grid container justify='center'>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						disabled={!(watchFields.username && watchFields.password)}>
						Login
					</Button>
				</Grid>
			</form>
		</Container>
	);
};

export default Login;
