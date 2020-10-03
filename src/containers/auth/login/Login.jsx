import React from 'react';
import { useForm } from 'react-hook-form';
import {
	Container,
	Typography,
	TextField,
	Button,
	Grid,
} from '@material-ui/core';

const Login = () => {
	const { register, handleSubmit, errors } = useForm();
	const submitLoginForm = async (data) => {
		console.log(data);
	};
	return (
		<Container fixed>
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
					inputRef={register({ required: true, minLength: 8 })}
					error={errors.password?.type === 'required'}
				/>
				<Grid container justify='center'>
					<Button type='submit' variant='contained' color='primary'>
						Login
					</Button>
				</Grid>
			</form>
		</Container>
	);
};

export default Login;
