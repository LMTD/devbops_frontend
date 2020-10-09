import React, { useState } from 'react';
import { Dialog, Typography, DialogContent } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Login from '../../auth/Login';
import Register from '../../auth/Register';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});
const DialogWindow = (props) => {
	const [dialogTitle, setDialogTitle] = useState(props.dialogTitle);
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
