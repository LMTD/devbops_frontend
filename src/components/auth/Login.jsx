import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import Icon from '@material-ui/core/Icon';
import {
	Grid,
	Container,
	Button,
	TextField,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { LinkedIn } from 'react-linkedin-login-oauth2';
import './styles.css';


const Login = (props) => {

	const [code, setCode] = useState('');

	const { register, handleSubmit, errors, watch } = useForm();
	const watchFields = watch(['username', 'password']);


	const handleSuccess = (data) => {
		console.log('this is data in handlesuccess: ', data);
		// setCode(data.code)
		props.login('loginLinkedin', data.code, '', '')
	}


	const submitLoginForm = async (formData) => {

		console.log('this is formdata: ', formData);
		props.login('login', '', formData.username, formData.password)
	};

	if (props.isAuthenticated) {
		props.onClose()
	}

	return (
		<Container fixed>
			{props.authAlertMessage && <Alert severity={props.authAlertSeverity}>{props.authAlertMessage}</Alert>}
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
							onClick={() => props.handleSwitchMode(false)}
							style={{}}>
							Register Here
						</Typography>
					</Grid>
					<Grid container align="center" justify='center' spacing={2}>
						<Grid item>{props.authLoading ? <CircularProgress /> : null}</Grid>
						<Grid item>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								disabled={
									!(watchFields.username && watchFields.password) || props.authLoading
								}>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							Or you can sign in with
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							<LinkedIn clientId="86svu9wdn93n5r"
								onFailure={() => { console.log('there is an error with login with linkedin') }}
								onSuccess={handleSuccess}
								redirectUri={`${window.location.origin}/linkedin`}
								scope="r_emailaddress,r_liteprofile"
							>
								<LinkedInIcon />
							</LinkedIn>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		authAlertMessage: state.auth.authAlertMessage,
		authAlertSeverity: state.auth.authAlertSeverity,
		authLoading: state.auth.authLoading
	}
}


const mapDispatchToProps = (dispatch) => {
	return {

		login: (action, authCode, username, password) => dispatch(actions.login(action, authCode, username, password))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
