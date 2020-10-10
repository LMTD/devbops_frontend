import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';

import Login from '../../auth/Login';
import Register from '../../auth/Register';
import DialogTitle from '../dialogTitle/DialogTitle';

const DialogWindow = (props) => {
	const [isLoginMode, setIsLoginMode] = useState(true);

	const handleSwitchMode = () => {
		setIsLoginMode(!isLoginMode);
	};

	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			// maxWidth='md'
			aria-labelledby='responsive-dialog-title'>
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				{isLoginMode ? 'Login' : 'Register'}
			</DialogTitle>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				{isLoginMode ? (
					<Login handleSwitchMode={handleSwitchMode} />
				) : (
					<Register handleSwitchMode={handleSwitchMode} />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default DialogWindow;
