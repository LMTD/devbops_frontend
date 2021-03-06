import React, { useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { red } from '@material-ui/core/colors';

import {
	Dialog,
	DialogContent,
	Typography,
	Card,
	IconButton,
	CardContent,
	Avatar,
	TextField,
	Grid,
	DialogActions,
	Button,
} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const BlogDetail = (props) => {
	const [showCommentInputField, setShowCommentInputField] = useState(false);
	const { register, handleSubmit, watch } = useForm();
	const watchComment = watch('comment');

	const handleShowCommentInputField = () => {
		setShowCommentInputField(!showCommentInputField);
	};

	const submitComment = async (formData) => {
		console.log('this is comment form data: ', formData);

		try {
			const { data } = await axios.post(
				'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
				{
					Action: 'Q',
					Token: props.token,
					BlogSubject: props.blogTitle,
					BlogBody: null,
					Location: null,
					Date: null,
					Time: null,
					Comment: formData.comment,
				},
			);
			console.log('this is data: ', data);
			if (data.Status) {
				setShowCommentInputField(false);
				props.updateComment(props.blogTitle, props.username, formData.comment);
			}
		} catch (err) {
			console.log('there is error in comment: ', err);
		}
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
	let commentSection = null;
	if (showCommentInputField) {
		commentSection = Object.entries(props.blogComment).map((commentEntry) => (
			<Grid container spacing={4}>
				<Grid item xs={1} sm={1} md={1}>
					<Avatar aria-label='recipe' style={{ background: red[500] }}>
						{commentEntry[0][0]}
					</Avatar>
				</Grid>
				<Grid item xs={11} sm={11} md={11}>
					<Grid style={{ fontStyle: 'italic' }}>{commentEntry[0]}</Grid>
					<Grid>{commentEntry[1]}</Grid>
				</Grid>
			</Grid>
		));
	}

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
							{props.blogTitle}
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
							{props.blogAuthor}
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
							{`${props.blogDate}, ${props.blogTime}`}
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
							{props.blogLocation}
						</Typography>
					</Grid>

					<Grid item>
						<Typography component='p' variant='subtitle2' color='textSecondary'>
							{props.blogBody}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<Button component='p' onClick={handleShowCommentInputField}>
							Comment
							{`${
								Object.keys(props.blogComment).length > 0
									? '(' + Object.keys(props.blogComment).length + ')'
									: ''
							}`}
						</Button>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						{commentSection}
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
const mapStateToProps = (state) => {
	return {
		token: state.token,
		username: state.username,
	};
};
export default connect(mapStateToProps)(BlogDetail);
