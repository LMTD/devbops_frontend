import React from 'react';
import moment from 'moment';
import {
	Dialog,
	DialogContent,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Grid,
	DialogActions,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '../UI/dialogTitle/DialogTitle';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		boxShadow: 'none',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 400,
		margin: '0 20px',
	},
}));
const EventDetail = (props) => {
	const classes = useStyles();

	// console.log('this is other props: ', props.otherProps);

	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			maxWidth='md'
			aria-labelledby='responsive-dialog-title'>
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				{props.title}
			</DialogTitle>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				<Card className={classes.root}>
					<CardMedia
						className={classes.cover}
						component='img'
						alt={`Iamge of ${props.title}`}
						image={props.imageUrl}
						height={225}
					/>
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={6}>
									<Typography component='h6' variant='h6'>
										Date And Time
									</Typography>
									<Typography
										component='p'
										variant='subtitle2'
										color='textSecondary'
										display='block'>
										{moment().format('dddd')},{' '}
										{moment().format('MMMM Do YYYY, h:mm a')}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12} md={6}>
									<Typography component='h6' variant='h6'>
										Location
									</Typography>
									<Typography
										component='p'
										variant='subtitle2'
										color='textSecondary'>
										{props.location}
									</Typography>
								</Grid>
								<Grid item>
									<Typography component='h6' variant='h6'>
										About The Event
									</Typography>
									<Typography
										component='p'
										variant='subtitle2'
										color='textSecondary'>
										{props.eventDescription}
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</div>
				</Card>
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={() => {
						alert('RSVP successfully');
					}}
					color='secondary'
					variant='contained'>
					RSVP
				</Button>
			</DialogActions>
		</Dialog>
		// <div>123</div>
	);
};

export default EventDetail;
