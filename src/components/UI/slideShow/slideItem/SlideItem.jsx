import React from 'react';
import {
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		margin: '0 20px',
	},
});

const SlideItem = (props) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component='img'
					alt='Contemplative Reptile'
					image={props.imageUrl}
					height={225}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{props.title}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						{props.description.length > 40
							? props.description.slice(0, 40) + '...'
							: props.description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default SlideItem;
