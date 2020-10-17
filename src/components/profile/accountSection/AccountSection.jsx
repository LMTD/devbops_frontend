import React, { useState } from 'react';
import {
	Grid,
	Button,
	TextField,
	Typography,
	Card,
	CardContent,
} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import { AccountCircle } from '@material-ui/icons';
import * as actions from '../../../store/actions/auth';
const AccountSection = (props) => {
	const [isModifyMode, setIsModifyMode] = useState(false);
	const { register, handleSubmit, errors, getValues, reset, watch } = useForm();

	const handleModifyMode = () => {
		setIsModifyMode(!isModifyMode);
	};

	const handleSubmitModifyInfo = async (formData) => {
		console.log('formData: ', formData);

		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/user',
				{
					Action: 'U',
					Token: props.token,
					Password: formData.password === '' ? null : formData.password,
					Email: formData.email,
					FirstName: formData.firstName,
					LastName: formData.lastName,
					City: formData.city,
					Country: formData.country,
				},
			);
			if (data.status) {
				console.log('this is update user: ', data);
				props.updateUserSuccess(
					formData.email,
					formData.firstName,
					formData.lastName,
					formData.city,
					formData.country,
				);
			}
			console.log('this is data from update user : ', data);
		} catch (err) {
			console.log('there is an error to update user: ', err);
		}

		setIsModifyMode(!isModifyMode);
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={4} md={4} style={{ paddingTop: '0' }}>
				<Card
					style={{
						textAlign: 'center',
						background: 'none',
						boxShadow: 'none',
					}}>
					<CardContent style={{ paddingTop: '0' }}>
						<AccountCircle style={{ color: 'black', fontSize: '14rem' }} />
						<Grid
							container
							spacing={3}
							style={{ display: 'flex', justifyContent: 'space-evenly' }}>
							<div>
								<label
									htmlFor='username'
									style={{
										display: 'inline-block',
										fontSize: '1.3em',
									}}>
									Username:
								</label>
							</div>
							<div>
								<Typography variant='h6'>{props.username}</Typography>
							</div>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={8} md={8}>
				<form onSubmit={handleSubmit(handleSubmitModifyInfo)}>
					<Grid container spacing={3}>
						<Grid item xs={2} sm={2} md={2}>
							<label
								htmlFor='email'
								style={{
									display: 'inline-block',
									fontSize: '1.3em',
								}}>
								Email:
							</label>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							{isModifyMode ? (
								<TextField
									id='email'
									aria-describedby='my-helper-text'
									defaultValue={props.email}
									// fullWidth
									name='username'
									inputRef={register()}
								/>
							) : (
								<Typography variant='h6'>{props.email}</Typography>
							)}
						</Grid>
						<Grid item xs={2} sm={2} md={2}>
							<label
								htmlFor='password'
								style={{
									display: 'inline-block',
									fontSize: '1.3em',
								}}>
								Password:
							</label>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							{isModifyMode ? (
								<TextField
									id='password'
									aria-describedby='my-helper-text'
									// defaultValue='*************************'

									// fullWidth
									name='password'
									inputRef={register()}
								/>
							) : (
								<Typography variant='h6'>*************************</Typography>
							)}
						</Grid>
						<Grid item xs={2} sm={2} md={2}>
							<label
								htmlFor='firstName'
								style={{
									display: 'inline-block',
									fontSize: '1.3em',
								}}>
								First Name:
							</label>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							{isModifyMode ? (
								<TextField
									id='firstName'
									aria-describedby='my-helper-text'
									defaultValue={props.firstName}
									// fullWidth
									name='firstName'
									inputRef={register()}
								/>
							) : (
								<Typography variant='h6'>{props.firstName}</Typography>
							)}
						</Grid>
						<Grid item xs={2} sm={2} md={2}>
							<label
								htmlFor='lastName'
								style={{
									display: 'inline-block',
									fontSize: '1.3em',
								}}>
								Last Name:
							</label>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							{isModifyMode ? (
								<TextField
									id='lastName'
									aria-describedby='my-helper-text'
									defaultValue={props.lastName}
									// fullWidth
									name='lastName'
									inputRef={register()}
								/>
							) : (
								<Typography variant='h6'>{props.lastName}</Typography>
							)}
						</Grid>
						<Grid item xs={2} sm={2} md={2}>
							<label
								htmlFor='city'
								style={{
									display: 'inline-block',
									fontSize: '1.3em',
								}}>
								City:
							</label>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							{isModifyMode ? (
								<TextField
									id='city'
									aria-describedby='my-helper-text'
									defaultValue={props.city}
									// fullWidth
									name='city'
									inputRef={register()}
								/>
							) : (
								<Typography variant='h6'>{props.city}</Typography>
							)}
						</Grid>
						<Grid item xs={2} sm={2} md={2}>
							<label
								htmlFor='country'
								style={{
									display: 'inline-block',
									fontSize: '1.3em',
								}}>
								Country:
							</label>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							{isModifyMode ? (
								<TextField
									id='country'
									aria-describedby='my-helper-text'
									defaultValue={props.country}
									inputRef={register()}
									name='country'
								/>
							) : (
								<Typography variant='h6'>{props.country}</Typography>
							)}
						</Grid>

						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							style={{ display: 'flex', justifyContent: 'space-evenly' }}>
							{isModifyMode ? (
								<Button
									variant='contained'
									color='primary'
									type='submit'
									style={{ marginTop: '18px' }}>
									Save Changes
								</Button>
							) : null}

							<Button
								variant='contained'
								color={isModifyMode ? 'secondary' : 'primary'}
								style={{ marginTop: '18px' }}
								onClick={handleModifyMode}
								type='button'>
								{isModifyMode ? 'Cancel' : 'Update Account Information'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.token,
		username: state.username,
		email: state.email,
		firstName: state.firstName,
		lastName: state.lastName,
		city: state.city,
		country: state.country,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateUserSuccess: (
			newEmail,
			newFirstName,
			newLastName,
			newCity,
			newCountry,
		) =>
			dispatch(
				actions.updateUserSuccess(
					newEmail,
					newFirstName,
					newLastName,
					newCity,
					newCountry,
				),
			),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountSection);
