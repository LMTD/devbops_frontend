import React, { useState } from 'react';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
	Container,
	Typography,
	TextField,
	Button,
	Grid,
	CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CountrySelect from '../UI/countrySelect/CountrySelect';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { LinkedIn } from 'react-linkedin-login-oauth2';


const Register = (props) => {

	const { register, handleSubmit, errors, getValues, watch } = useForm();
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

	const [code, setCode] = useState('');


	const handleSuccess = (data) => {
		console.log('this is data in handlesuccess: ', data);
		setCode(data.code)
	}

	const submitRegisterForm = async (formData) => {

		props.register(formData.username, formData.password, formData.email, formData.firstName, formData.lastName, formData.country, formData.city)
	};

	if (props.authAlertSeverity === 'success') {
		props.handleSwitchMode(true);
	}

	return (
		<Container>
			{props.authAlertMessage && <Alert severity={props.authAlertSeverity}>{props.authAlertMessage}</Alert>}
			<form
				onSubmit={handleSubmit(submitRegisterForm)}
				style={{ margin: '20px 0' }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='username'
							label='Username'
							type='text'
							id='username'
							inputRef={register()}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							size='small'
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
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							inputRef={register({ minLength: 8 })}
							error={errors.password?.type === 'minLength' ? true : false}
							helperText='Password has to be at least 8 characters long'
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							size='small'
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
							error={errors.confirmPassword?.type === 'validate' ? true : false}
							helperText='Password has to be matched'
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							// margin='normal'
							fullWidth
							name='firstName'
							label='First Name'
							type='text'
							id='first-name'
							size='small'
							inputRef={register()}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							fullWidth
							name='lastName'
							label='Last Name'
							type='text'
							id='last-name'
							size='small'
							inputRef={register()}
						/>

					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<CountrySelect inputRef={register()} />

					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							fullWidth
							name='city'
							label='Current City'
							type='text'
							id='city'
							size='small'
							inputRef={register()}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						Already have account?&nbsp;
						<Typography
							variant='caption'
							onClick={() => props.handleSwitchMode(false)}>
							Login Here
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
									!(
										watchFields.username &&
										watchFields.email &&
										watchFields.password &&
										watchFields.confirmPassword &&
										watchFields.firstName &&
										watchFields.lastName &&
										watchFields.country &&
										watchFields.city
									) || props.authLoading
								}>
								Register
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
		authAlertMessage: state.auth.authAlertMessage,
		authAlertSeverity: state.auth.authAlertSeverity,
		authLoading: state.auth.authLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (username, password, email, firstName, lastName, country, city) => dispatch(actions.register(username, password, email, firstName, lastName, country, city))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);
