import React from 'react';

import { useForm } from 'react-hook-form';
import { red } from '@material-ui/core/colors';

import {
	Dialog,
	DialogContent,
	Typography,
	Avatar,
	TextField,
	Grid,
	DialogActions,
	Button,
	CircularProgress,
	Divider,
} from '@material-ui/core';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/home';

const BlogDetail = (props) => {
	const { register, handleSubmit, watch, reset } = useForm();
	const watchComment = watch('comment');

	const submitComment = async (formData) => {
		console.log('this is comment form data: ', formData);
		props.postBlogComment(
			props.token,
			props.username,
			props.blogName,
			formData.comment,
		);

		reset();
	};

	const commentForm = (
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
				</div>
			) : null}
		</form>
	);
	let commentSection = null;

	if (props.onPostingBlogComment) {
		commentSection = <CircularProgress />;
	} else {
		commentSection = Object.entries(props.BlogComment).map((commentEntry) => (
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
							{props.blogName}
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
							{props.UserName}
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
							{`${props.BlogDate}, ${props.BlogTime}`}
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
							{props.BlogLocation}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<Typography component='p' variant='subtitle1' color='textPrimary'>
							{props.BlogContent}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<Divider
							variant='fullWidth'
							style={{ background: 'rgb(197 190 190)' }}
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						{commentSection}
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						{commentForm}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={props.handleClose}
					color='primary'
					variant='contained'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const mapStateToProps = (state) => {
	return {
		onPostingBlogComment: state.home.onPostingBlogComment,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postBlogComment: (token, username, blogSubject, blogComment) => {
			dispatch(
				actions.postBlogComment(token, username, blogSubject, blogComment),
			);
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
