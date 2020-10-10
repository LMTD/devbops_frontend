import React, { useState } from 'react';
import {
	Grid,
	Container,
	Button,
	TextField,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';

import './styles.css';

const Login = (props) => {
	const [alertSeverity, setAlertSeverity] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [loading, setLoading] = useState('');

	const { register, handleSubmit, errors, reset, watch } = useForm();
	const watchFields = watch(['username', 'password']);

	const submitLoginForm = async (formData) => {
		setLoading(true);
		console.log('this is formdata: ', formData);
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
			if (data.Status) {
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
		setLoading(false);
	};
	return (
		<Container fixed>
			{alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
			<form
				onSubmit={handleSubmit(submitLoginForm)}
				style={{ margin: '20px 0' }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='username'
							label='Username'
							type='text'
							id='username'
							inputRef={register({ required: true })}
							error={errors.username?.type === 'required'}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							inputRef={register({ required: true })}
							error={errors.password?.type === 'required'}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						Don't have account? &nbsp;
						<Typography
							variant='caption'
							onClick={props.handleSwitchMode}
							style={{}}>
							Register Here
						</Typography>
						{/* <Link
							component={RouterLink}
							underline='hover'
							style={{ color: 'black' }}
							onClick={props.handleSwitchMode}>
							Register Here
						</Link> */}
					</Grid>
					<Grid container justify='center' spacing={2}>
						<Grid item>{loading ? <CircularProgress /> : null}</Grid>
						<Grid item>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								disabled={
									!(watchFields.username && watchFields.password) || loading
								}>
								Login
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default Login;
