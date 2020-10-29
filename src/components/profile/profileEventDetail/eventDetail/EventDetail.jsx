import React from 'react';
import {
	DialogContent,
	Typography,
	Card,
	CardContent,
	Grid,
	DialogActions,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListData from '../../../UI/listData/ListData';

const useStyles = makeStyles(() => ({
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
}));
const EventDetail = (props) => {
	const classes = useStyles();

	let rsvpList = null;

	let buttons = null;

	if (props.isRsvpList) {
		buttons = (
			<DialogActions>
				<Button
					color='secondary'
					variant='contained'
					onClick={props.handleCancelRSVP}>
					Cancel RSVP
				</Button>
			</DialogActions>
		);
	} else if (props.isRsvpList === false) {
		buttons = (
			<DialogActions>
				<Button
					color='primary'
					variant='contained'
					onClick={props.handleEditMode}>
					Update Event
				</Button>
				<Button
					color='secondary'
					variant='contained'
					onClick={props.handleDeleteEvent}>
					Delete
				</Button>
			</DialogActions>
		);
		rsvpList = (
			<ListData
				listTitleAlter='There is no one RSVP to your event yet...'
				listTitle={`RSVP List(${props.RSVP.length})`}
				list={props.RSVP}
			/>
		);
	}

	return (
		<div>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				<Card className={classes.root}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={5}>
							{props.imageArea}
						</Grid>
						<Grid item xs={12} sm={12} md={7}>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<Grid container spacing={2}>
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											style={{ textAlign: 'center' }}>
											<Typography variant='h4'>{props.event_name}</Typography>
										</Grid>

										<Grid item xs={2} sm={2} md={2}>
											<label
												htmlFor='eventDate'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												Date
											</label>
										</Grid>
										<Grid item xs={5} sm={5} md={5}>
											<Typography variant='subtitle1'>
												{props.Event_date}
											</Typography>
										</Grid>

										<Grid item xs={2} sm={2} md={2}>
											<label
												htmlFor='eventTime'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												Time
											</label>
										</Grid>
										<Grid item xs={3} sm={3} md={3}>
											<Typography variant='subtitle1'>
												{props.Event_time}
											</Typography>
										</Grid>

										<Grid item xs={3} sm={3} md={3}>
											<label
												htmlFor='eventLocation'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												{props.Online === 'Online' ? 'Online' : 'In-person'}
											</label>
										</Grid>

										<Grid item xs={8} sm={8} md={8}>
											<Typography variant='subtitle1'>
												{props.Event_location}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={12} md={12}>
											<label
												htmlFor='eventLocation'
												style={{
													display: 'inline-block',
													fontSize: '1.3em',
													fontWeight: 'bolder',
												}}>
												Event Description
											</label>
										</Grid>
										<Grid item xs={12} sm={12} md={12}>
											<Typography
												component='p'
												variant='subtitle2'
												color='textPrimary'>
												{props.Event_desc}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</div>
						</Grid>
					</Grid>
				</Card>
				{rsvpList}
			</DialogContent>

			{buttons}
		</div>
	);
};

export default EventDetail;
