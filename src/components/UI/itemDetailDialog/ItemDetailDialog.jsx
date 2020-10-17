import React from 'react';
import { Dialog, DialogContent } from '@babel/core';
import DialogTitle from '../../UI/dialogTitle/DialogTitle';

const ItemDetailDialog = (props) => {
	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			maxWidth='md'
			aria-labelledby='responsive-dialog-title'>
			<DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
				This is title
			</DialogTitle>
			<DialogContent style={{ padding: '12px 24px' }} dividers>
				{props.isEvent ? 'event' : 'Blog'}
			</DialogContent>
		</Dialog>
	);
};

export default ItemDetailDialog;
