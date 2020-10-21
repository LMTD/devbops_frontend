import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const PostBlog = (props) => {
	const { register, handleSubmit, watch, reset } = useForm();
	const watchFields = watch(['blogSubject', 'blogBody', 'location']);

	let history = useHistory();

	const handlePostBlog = async (formData) => {
		console.log('this is form data: ', formData);

		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
				{
					Action: 'C',
					Token: props.token,
					BlogSubject: formData.blogSubject,
					BlogBody: formData.blogBody,
					Date: moment().format('dddd MMM Do YYYY'),
					Time: moment().format('hh:mm a'),
					Comment: null,
					Location: formData.location,
				},
			);
			console.log('this is data from post blog: ', data);
			if (data.Status) {
				history.push('/sadadas');
				props.onClose();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container fixed>
			{/* {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>} */}
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
		</Container>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.token,
	};
};
export default connect(mapStateToProps)(PostBlog);
