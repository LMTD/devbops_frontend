import React from 'react';
import moment from 'moment';
import {
	Dialog,
	DialogContent,
	Typography,
	Card,
	IconButton,
	CardContent,
	CardMedia,
	Grid,
	DialogActions,
	Button,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '../../UI/dialogTitle/DialogTitle';

const BlogDetail = (props) => {
	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			maxWidth='md'
			aria-labelledby='responsive-dialog-title'>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={12}>
						<Typography component='h6' variant='h6'>
							{props.title}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<Typography
							component='p'
							variant='subtitle2'
							color='textSecondary'
							display='block'>
							Author: {props.author}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={5} md={5}>
						<Typography
							component='p'
							variant='subtitle2'
							color='textSecondary'
							display='block'>
							Post Date: {moment().format('dddd')},{' '}
							{moment().format('MMMM Do YYYY, h:mm a')}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3} md={3}>
						<Typography
							component='p'
							variant='subtitle2'
							color='textSecondary'
							display='block'>
							location: {props.location}
						</Typography>
					</Grid>

					<Grid item>
						<Typography component='p' variant='subtitle2' color='textSecondary'>
							{props.blogBody}
						</Typography>
					</Grid>
					<Grid item>
						<IconButton aria-label='add to favorites'>
							<ThumbUpIcon />
						</IconButton>
						<Button component='p'>Comment</Button>
					</Grid>
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
