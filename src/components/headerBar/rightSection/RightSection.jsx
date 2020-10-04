import React from 'react';
import { Button } from '@material-ui/core';

import DialogWindow from '../../UI/dialogWindow/DialogWindow';

const ProfileArea = (props) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
	};
	return (
		<div>
			<Button
				// variant='button'
				align='center'
				style={{ background: 'white', color: 'black', fontSize: '0.7rem' }}
				color='inherit'
				onClick={handleClickOpen}>
				LAUNCH DEVBOPS
			</Button>
			<DialogWindow open={open} handleClose={handleClose} dialogTitle='Login' />
		</div>
	);
};

export default ProfileArea;
