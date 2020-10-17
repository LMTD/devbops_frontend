import React from 'react';

import {
	Container,
	Grid,
	Typography,
	Card,
	CardActionArea,
	CardActions,
	CardMedia,
	CardContent,
	Button,
	Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		maxWidth: 500,
	},
	media: {
		height: 500,
	},
});

const About = () => {
	const classes = useStyles();

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12}>
					<Typography variant='h4'>About Us</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Typography variant='subtitle1'>
						DevBops is changing the way Engineers connect. More than just a
						platform for finding and RSVPing for events, DevBops serves as a
						bridge for engineers all over the world to share their experiences
						and network. Our website encourages engineers to find events and
						people that share their passion.
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Typography variant='h4'>Our Founders</Typography>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<Card className={classes.root}>
						{/* <CardActionArea> */}
						<CardMedia
							className={classes.media}
							image='https://media-exp1.licdn.com/dms/image/C4D03AQH72sZZV2E-Tg/profile-displayphoto-shrink_800_800/0?e=1608163200&v=beta&t=iCF-FHJD3Z-NdJjMC1iwywaJ58sBkFZSXJEaURrLD64'
							title='Cameron Flowers'
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								Cameron Flowers
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								Cameron Flowers is the co-founder and Chairman of DevBops Inc.
								After spending many years consulting and solving software
								problems for billion dollar companies, Cameron decided to become
								the change he wanted to see in the world and started his own
								firm, Floreo Labs. In this capacity he trains and mentors new
								and aspiring Software and DevOps Engineers preparing them for a
								future in technology and working to close the economic gap in
								underserved communities. Sharing a passion for
								community-oriented solutions, innovation and inclusion Cameron
								joined Shafan Sugarman and together they created the DevBops
								platform. Originally from Chicago, he believes that “technology
								should be used just like music or poetry; to facilitate the
								creation of innovative spaces of connection where we can define
								new realms of possibility”. In his free time Cameron enjoys
								networking, creating poetic pieces and playing various musical
								instruments
							</Typography>
						</CardContent>
						{/* </CardActionArea> */}
						<CardActions>
							<Button
								size='large'
								color='primary'
								variant='outlined'
								style={{ margin: '0 auto' }}>
								<Link
									component='a'
									href='https://www.linkedin.com/in/cameronflowers/'
									target='_blank'>
									LinkedIn
								</Link>
							</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<Card className={classes.root}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image='https://media-exp1.licdn.com/dms/image/C5103AQEi-Ev0g59Gqw/profile-displayphoto-shrink_800_800/0?e=1608163200&v=beta&t=Jy4H5vAwBkxD069HyDyoCyTMfidH12yMtv3Fpa4bmt4'
								title='Shafan Sugarman'
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='h2'>
									Shafan Sugarman
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									Shafan Sugarman is the co-founder and CTO of DevBops. As a
									college student, Shafan worked with software engineers in both
									silicon valley and New York City to host various events on
									DevOps and Cloud Computing. During his third year at Amazon,
									Shafan’s passion for helping others inspired him to join
									Cameron Flowers to create a platform where engineers across
									the United States could share, teach, and learn about cloud
									computing. DevBops was formed to help students and engineers
									easily connect through events, blogs, and networking
									opportunities on the web. Shafan was able to leverage his
									connections on Wall Street to attract angel investors, which
									valued DevBops at $1.7B as of October 17, 2020. During his
									free time, Shafan likes to play his guitar and teach students
									in New York city computer science and DevOps.
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button
								size='large'
								color='primary'
								variant='outlined'
								style={{ margin: '0 auto', marginTop: '35px' }}>
								<Link
									component='a'
									href='https://www.linkedin.com/in/shafan-sugarman/'
									target='_blank'>
									LinkedIn
								</Link>
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default About;
