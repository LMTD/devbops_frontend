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
	const { register, handleSubmit, errors, getValues, reset, watch } = useForm();
	const watchFields = watch([
		'username',
		'email',
		'password',
		'confirmPassword',
		'firstName',
		'lastName',
		'country',
		'city',
	]);

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
					inputRef={register()}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='email'
					label='Email'
					type='text'
					id='email'
					inputRef={register({
						pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
					})}
					error={errors.email?.type === 'pattern'}
					helperText={
						errors?.email?.type === 'pattern'
							? 'Please enter a valid email'
							: null
					}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					inputRef={register({ minLength: 8 })}
					error={errors.password?.type === 'minLength'}
					helperText={
						errors?.password?.type === 'minLength'
							? 'Password has to be at least 8 characters long'
							: null
					}
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
						validate: (value) => {
							return value === getValues('password');
						},
					})}
					error={errors.confirmPassword?.type === 'validate'}
					helperText={
						errors?.confirmPassword?.type === 'validate'
							? 'Password has to be matched'
							: null
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
					inputRef={register()}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='lastName'
					label='Last Name'
					type='text'
					id='last-name'
					inputRef={register()}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='country'
					label='Current Country'
					type='text'
					id='country'
					inputRef={register()}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					name='city'
					label='Current City'
					type='text'
					id='city'
					inputRef={register()}
				/>
				<Grid container justify='center'>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						disabled={
							!(
								watchFields.username &&
								watchFields.email &&
								watchFields.password &&
								watchFields.confirmPassword &&
								watchFields.firstName &&
								watchFields.lastName &&
								watchFields.country &&
								watchFields.city
							)
						}>
						Register
					</Button>
				</Grid>
			</form>
		</Container>
	);
};

export default Register;
