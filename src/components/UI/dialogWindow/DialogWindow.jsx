import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { connect } from 'react-redux';
import DialogTitle from '../dialogTitle/DialogTitle';
import Login from '../../auth/Login';
import Register from '../../auth/Register';
import PostBlog from '../../postBlog/PostBlog';
import CreateEvent from '../../createEvent/CreateEvent';
import * as homeActions from '../../../store/actions/home';
import * as profileActions from '../../../store/actions/profile';


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
			dialogContent = <Register handleSwitchMode={handleSwitchMode} />;
		}
	} else if (props.openPostBlog) {
		dialogTitle = (
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				Post A Blog
			</DialogTitle>
		);

		dialogContent = <PostBlog onClose={props.handleClose} />;
		props.clearAlertMessage();
	} else if (props.openCreateEvent) {
		dialogTitle = (
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				Create Event
			</DialogTitle>
		);
		dialogContent = <CreateEvent onClose={props.handleClose} />;
		props.clearAlertMessage();
	}
	return (
		<Dialog
			disableBackdropClick
			open={props.openAuth || props.openPostBlog || props.openCreateEvent}
			onClose={props.handleClose}
			aria-labelledby='responsive-dialog-title'
			maxWidth='md'
		>
			{dialogTitle}
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				{dialogContent}
			</DialogContent>
		</Dialog>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearAlertMessage: () => {
			dispatch(homeActions.clearAlertMessage());
			dispatch(profileActions.clearAlertMessage())
		},
	};
};
export default connect(null, mapDispatchToProps)(DialogWindow);
