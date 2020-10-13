import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';

import DialogTitle from '../dialogTitle/DialogTitle';
import Login from '../../auth/Login';
import Register from '../../auth/Register';
import PostBlog from '../../postBlog/PostBlog';

const DialogWindow = (props) => {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [registerSucceed, setRegisterSucceed] = useState(false);
	const handleSwitchMode = (successRegister) => {
		setRegisterSucceed(successRegister);
		setIsLoginMode(!isLoginMode);
	};
	const clearRegisterSuccess = () => {
		setRegisterSucceed(false);
	};

	let dialogContent = null;
	let dialogTitle = null;
	if (props.openAuth) {
		dialogTitle = (
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				{isLoginMode ? 'Login' : 'Register'}
			</DialogTitle>
		);
		if (isLoginMode) {
			dialogContent = (
				<Login
					handleSwitchMode={handleSwitchMode}
					onClose={props.handleClose}
					registerSucceed={registerSucceed}
					clearRegisterSuccess={clearRegisterSuccess}
				/>
			);
		} else {
			DialogContent = <Register handleSwitchMode={handleSwitchMode} />;
		}
	} else if (props.openPostBlog) {
		dialogTitle = (
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				Post A Blog
			</DialogTitle>
		);

		dialogContent = <PostBlog onClose={props.handleClose} />;
	}
	return (
		<Dialog
			disableBackdropClick
			open={props.openAuth || props.openPostBlog}
			onClose={props.handleClose}
			aria-labelledby='responsive-dialog-title'>
			{dialogTitle}
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				{dialogContent}
			</DialogContent>
		</Dialog>
	);
};

export default DialogWindow;
