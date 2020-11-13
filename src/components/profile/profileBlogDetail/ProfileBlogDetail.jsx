import React from 'react';
import { red } from '@material-ui/core/colors';

import {
	Dialog,
	DialogContent,
	Typography,
	Avatar,
	Grid,
	DialogActions,
	Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/profile';

const ProfileBlogDetail = (props) => {
	const handleDeleteBlog = () => {
		props.onDeleteBlog(props.token, props.blogName);
		props.handleClose();
	};

	let commentSection = null;

	if (JSON.stringify(props.BlogComment) === '{}') {
		commentSection = (
			<Typography component='p' variant='body2'>
				There is no comment so far
			</Typography>
		);
	} else {
		commentSection = Object.entries(props.BlogComment).map((commentEntry) => (
			<Grid container spacing={2}>
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

					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						style={{
							borderBottom: '0.8px solid #ccc5c5',
							padding: '20px 0',
						}}>
						<Typography component='p' variant='subtitle1' color='textPrimary'>
							{props.BlogContent}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						{commentSection}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={handleDeleteBlog}
					color='secondary'
					variant='contained'>
					Delete
				</Button>
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

const mapDispatchToProps = (dispatch) => {
	return {
		onDeleteBlog: (token, blogSubject) =>
			dispatch(actions.onDeleteBlog(token, blogSubject)),
	};
};

export default connect(null, mapDispatchToProps)(ProfileBlogDetail);
