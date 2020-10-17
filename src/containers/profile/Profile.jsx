import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
	Grid,
	Container,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import AccountSection from '../../components/profile/accountSection/AccountSection';
import SlideShow from '../../components/UI/slideShow/SlideShow';

const Profile = (props) => {
	const [loading, setLoading] = useState(false);
	const [myBlogs, setMyBlogs] = useState([]);
	useEffect(() => {
		const getAllBlogs = async () => {
			setLoading(true);
			try {
				const { data } = await axios.post(
					'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
					{
						Action: 'H',
						Token: props.token,
						BlogSubject: null,
						BlogBody: null,
						Location: null,
						Date: null,
						Time: null,
						Comment: null,
					},
				);
				console.log('this is blogs: ', data);
				if (data.Status) {
					setMyBlogs(data.BlogsDB);
				}
				setLoading(false);
			} catch (err) {
				console.log('there is error in fetch blog history: ', err);
			}
		};
		getAllBlogs();
	}, []);

	let blogSection = null;

	if (loading) {
		blogSection = <CircularProgress />;
	} else {
		blogSection = (
			<Grid item xs={12} sm={12} md={12}>
				<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
					My Blogs
				</Typography>
				<SlideShow slideItems={myBlogs} isEvent={false} />
			</Grid>
		);
	}

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12}>
					<AccountSection />
				</Grid>
				{blogSection}
			</Grid>
		</Container>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.token,
	};
};
export default connect(mapStateToProps)(Profile);
