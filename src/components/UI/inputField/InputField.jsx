import React from 'react';

import { TextField } from '@material-ui/core';

const InputField = (props) => {
	console.log('this is errors: ', props.errors);
	return (
		<TextField
			variant='outlined'
			margin='normal'
			fullWidth
			{...props.elementConfig}
		/>
	);
};

export default InputField;
