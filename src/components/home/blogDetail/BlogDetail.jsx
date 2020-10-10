import React, { useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import {
	Dialog,
	DialogContent,
	Typography,
	Card,
	IconButton,
	CardContent,
	TextField,
	Grid,
	DialogActions,
	Button,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const BlogDetail = (props) => {
	const [showCommentInputField, setShowCommentInputField] = useState(false);
	const { register, handleSubmit, watch } = useForm();
	const watchComment = watch('comment');

	const handleShowCommentInputField = () => {
		setShowCommentInputField(!showCommentInputField);
	};

	const submitComment = (formData) => {
		console.log('this is comment: ', formData);
		alert(`comment submited and this is comment: ${formData['comment']}`);
	};

	const commentForm = (
		<Grid item sm={12}>
			<form onSubmit={handleSubmit(submitComment)}>
				<TextField
					variant='outlined'
					size='small'
					fullWidth
					multiline
					name='comment'
					label='Comment'
					type='text'
					id='comment'
					inputRef={register({ required: true })}
				/>

				{watchComment ? (
					<div>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							style={{ margin: '6px 0' }}>
							Post Comment
						</Button>
						<Button
							variant='contained'
							color='secondary'
							onClick={handleShowCommentInputField}
							style={{ margin: ' 0 6px' }}>
							Cancel Comment
						</Button>
					</div>
				) : null}
			</form>
		</Grid>
	);

	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			maxWidth='md'
			aria-labelledby='responsive-dialog-title'>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}
						style={{ borderBottom: '1px solid black' }}>
						<Typography component='h4' variant='h4'>
							{props.title}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
						md={3}
						style={{ borderBottom: '1px solid black' }}>
						<Typography component='p' variant='subtitle1'>
							Author
						</Typography>
						<Typography
							component='p'
							variant='subtitle2'
							color='textSecondary'
							display='block'>
							{props.author}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
						md={3}
						style={{ borderBottom: '1px solid black' }}>
						<Typography component='p' variant='subtitle1'>
							Posted Date
						</Typography>
						<Typography
							component='p'
							variant='subtitle2'
							color='textSecondary'
							display='block'>
							{moment().format('dddd')}
							{moment().format('MMMM Do YYYY')}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
						md={2}
						style={{ borderBottom: '1px solid black' }}>
						<Typography component='p' variant='subtitle1'>
							Posted Location
						</Typography>
						<Typography
							component='p'
							variant='subtitle2'
							color='textSecondary'
							display='block'>
							{props.location}
						</Typography>
					</Grid>

					<Grid item>
						<Typography component='p' variant='subtitle2' color='textSecondary'>
							{props.blogBody}
						</Typography>
					</Grid>

					<Grid item>
						{/* <IconButton aria-label='add to favorites'>
							<ThumbUpIcon />
						</IconButton> */}
						<Button component='p' onClick={handleShowCommentInputField}>
							Comment
						</Button>
					</Grid>
					{showCommentInputField ? commentForm : null}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={props.handleClose}
					color='secondary'
					variant='contained'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default BlogDetail;
