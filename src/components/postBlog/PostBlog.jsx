import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Button, TextField, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import * as homeActions from '../../store/actions/home';
import * as profileActions from '../../store/actions/profile';

const PostBlog = (props) => {
	const { register, handleSubmit, watch } = useForm();
	const watchFields = watch(['blogSubject', 'blogBody', 'location']);

	const handlePostBlog = async (formData) => {
		console.log('this is form data: ', formData);

		const currentDate = moment().format('dddd MMM Do YYYY');
		const currentTime = moment().format('hh:mm a')

		if (window.location.href.includes('/profile')) {
			props.postBlogOnProfile(props.token, props.username, formData.blogSubject, formData.blogBody, currentDate,
				currentTime, formData.location)

		} else if (window.location.href.includes('/')) {
			props.postBlogOnHome(props.token, props.username, formData.blogSubject, formData.blogBody, currentDate,
				currentTime, formData.location)
		}

	};

	let alert = null;

	if (props.homeAlertMessage) {
		alert = <Alert severity={props.homeAlertType}>{props.homeAlertMessage}</Alert>;
	} else if (props.profileAlertMessage) {
		alert = <Alert severity={props.profileAlertType}>{props.profileAlertMessage}</Alert>;

	}

	let postBlogContent = null;

	if (props.homeCreating || props.profileCreating) {
		postBlogContent = <CircularProgress />
	} else {
		postBlogContent = (
			<form
				onSubmit={handleSubmit(handlePostBlog)}
				style={{ margin: '20px 0' }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='blogSubject'
							label='Blog Subject *'
							type='text'
							inputRef={register({ required: true })}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='location'
							label='Location *'
							type='text'
							inputRef={register({ required: true })}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='blogBody'
							placeholder='What do you like to share?'
							type='text'
							multiline
							rows={4}
							id='blogContent'
							inputRef={register({ required: true })}
						/>
					</Grid>

					<Grid container justify='center'>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							disabled={
								!(
									watchFields.blogSubject &&
									watchFields.blogBody &&
									watchFields.location
								)
							}>
							Post
						</Button>
					</Grid>
				</Grid>
			</form>
		)
	}

	if (props.homeAlertType === 'success' || props.profileAlertType === 'success') {
		props.onClose()
	}

	return (
		<Container fixed>
			{/* {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>} */}
			{alert}
			{postBlogContent}
		</Container>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		username: state.auth.username,
		homeAlertMessage: state.home.alertMessage,
		homeAlertType: state.home.alertType,
		homeCreating: state.home.isCreating,
		profileCreating: state.profile.isCreating,
		profileAlertMessage: state.profile.createdAlertMessage,
		profileAlertType: state.profile.profileAlertType
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postBlogOnHome: (
			token,
			username,
			blogSubject,
			blogBody,
			currentDate,
			currentTime,
			currentLocation
		) => {
			dispatch(homeActions.postBlog(token,
				username,
				blogSubject,
				blogBody,
				currentDate,
				currentTime,
				currentLocation))
		},
		postBlogOnProfile: (token,
			username,
			blogSubject,
			blogBody,
			currentDate,
			currentTime,
			currentLocation
		) => {
			dispatch(profileActions.postBlog(token,
				username,
				blogSubject,
				blogBody,
				currentDate,
				currentTime,
				currentLocation))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostBlog);
