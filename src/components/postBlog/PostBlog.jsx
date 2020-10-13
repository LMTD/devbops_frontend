import React from 'react';
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

const PostBlog = (props) => {
	const { register, handleSubmit, errors, watch, reset } = useForm();
	const watchFields = watch(['blogName', 'blogContent']);

	const handlePostBlog = (formData) => {
		console.log('this is form data: ', formData);
		// axios call

		alert(`You submitted the blog: ${formData.blogContent}`);
		reset();
		props.onClose();
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
							name='blogName'
							label='Blog Name *'
							type='text'
							id='blogName'
							inputRef={register({ required: true })}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='eventName'
							label='Event Name'
							type='text'
							id='eventName'
							inputRef={register()}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							variant='outlined'
							size='small'
							fullWidth
							name='blogContent'
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
							disabled={!(watchFields.blogName && watchFields.blogContent)}>
							Post
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default PostBlog;
