import React, { useState } from 'react';
import { Button, Link, Grid } from '@material-ui/core';
import DialogWindow from '../../UI/dialogWindow/DialogWindow';
import { Link as RouterLink } from 'react-router-dom';

import Profile from '../profile/Profile';

const RightSection = (props) => {
	const [openAuth, setOpenAuth] = useState(false);
	const [openPostBlog, setOpenPostBlog] = useState(false);
	const [openCreateEvent, setOpenCreateEvent] = useState(false);

	const handleAuthClickOpen = () => {
		setOpenAuth(true);
	};

	const handlePostBlogOpen = () => {
		setOpenPostBlog(true);
	};

	const handleCreateEventOpen = () => {
		setOpenCreateEvent(true);
	};

	const handleClose = () => {
		setOpenAuth(false);
		setOpenPostBlog(false);
		setOpenCreateEvent(false);
	};
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item>
					<Button>
						<Link
							component={RouterLink}
							to='/about'
							underline='hover'
							style={{ color: 'black' }}>
							About
						</Link>
					</Button>
				</Grid>
				{props.isAuthenticated ? (
					<Grid item>
						<Button onClick={handleCreateEventOpen}>Create Event</Button>
					</Grid>
				) : null}
				{props.isAuthenticated ? (
					<Grid item>
						<Button onClick={handlePostBlogOpen}>Post A Blog</Button>
					</Grid>
				) : null}
				{props.isAuthenticated ? (
					<Profile />
				) : (
					<Grid item>
						<Button
							style={{
								background: 'white',
								color: 'black',
								fontSize: '0.7rem',
							}}
							color='inherit'
							onClick={handleAuthClickOpen}>
							LAUNCH DEVBOPS
						</Button>
					</Grid>
				)}
			</Grid>

			<DialogWindow
				openAuth={openAuth}
				openPostBlog={openPostBlog}
				openCreateEvent={openCreateEvent}
				handleClose={handleClose}
			/>
		</div>
	);
};

export default RightSection;
