import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Typography, TextField, Button } from '@material-ui/core';

const Login = () => {
	const { register, handleSubmit, errors, getValues } = useForm();
	const submitLoginForm = async (data) => {
		console.log(data);
	};
	return (
		<Container fixed>
			<Typography component='h1' variant='h5'>
				Login
			</Typography>
			<form onSubmit={handleSubmit(submitLoginForm)}>
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
					inputRef={register({ required: true, minLength: 8 })}
					error={errors.password?.type === 'required'}
				/>

				<Button type='submit' fullWidth variant='contained' color='primary'>
					Login
				</Button>
			</form>
		</Container>
	);
};

export default Login;
