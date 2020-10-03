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

const Register = () => {
	const [alertSeverity, setAlertSeverity] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const { register, handleSubmit, errors, getValues, reset } = useForm();

	const submitRegisterForm = async (formData) => {
		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/user',
				{
					Action: 'register',
					Username: formData.username,
					Password: formData.password,
					Email: formData.email,
					FirstName: formData.firstName,
					LastName: formData.lastName,
					Country: formData.country,
					City: formData.city,
				},
			);
			console.log('this is data: ', data);
			if (data.statusCode === 200) {
				setAlertSeverity('success');
				setAlertMessage('Register Successfully');
				reset();
			} else {
				setAlertSeverity('error');
				setAlertMessage(data.Error);
			}
			reset();
		} catch (err) {
			console.log('there is an error in register: ', err);
			setAlertSeverity('error');
			setAlertMessage('Network error');
		}
	};

	return (
		<Container fixed>
			{alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
			<Typography component='h1' variant='h5'>
				Register
			</Typography>
			<form
				onSubmit={handleSubmit(submitRegisterForm)}
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
					name='email'
					label='Email'
					type='email'
					id='email'
					inputRef={register({
						required: true,
						pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
					})}
					error={errors.email?.type === 'required'}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					inputRef={register({ required: true, minLength: 8 })}
					error={errors.password?.type === 'required'}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='confirmPassword'
					label='Confirm Password'
					type='password'
					id='confirm-password'
					inputRef={register({
						required: true,
						minLength: 8,
						validate: (value) => {
							console.log('this is value: ', value);
							console.log('this is password: ', getValues('password'));

							return value === getValues('password');
						},
					})}
					error={
						errors.confirmPassword?.type === 'required' ||
						errors.confirmPassword?.type === 'minlength' ||
						errors.confirmPassword?.type === 'validate'
					}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='firstName'
					label='First Name'
					type='text'
					id='first-name'
					inputRef={register({ required: true })}
					error={errors.firstName?.type === 'required'}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='lastName'
					label='Last Name'
					type='text'
					id='last-name'
					inputRef={register({ required: true })}
					error={errors.lastName?.type === 'required'}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='country'
					label='Current Country'
					type='text'
					id='country'
					inputRef={register({ required: true })}
					error={errors.country?.type === 'required'}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='city'
					label='Current City'
					type='text'
					id='city'
					inputRef={register({ required: true })}
					error={errors.state?.type === 'required'}
				/>
				<Grid container justify='center'>
					<Button type='submit' variant='contained' color='primary'>
						Register
					</Button>
				</Grid>
			</form>
		</Container>
	);
};

export default Register;
