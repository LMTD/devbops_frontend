import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Button,
	TextField,
	Typography,
	Select,
	MenuItem,
	FormControl,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import * as actions from '../../store/actions/profile';

import { connect } from 'react-redux';

import SlideShow from '../../components/UI/slideShow/SlideShow';

const Home = (props) => {
	const [allEvents, setAllEvents] = useState([]);
	const [isEventLoading, setIsEventLoading] = useState(false);
	const [allBlogs, setAllBlogs] = useState([]);
	const [isBlogLoading, setIsBlogLoading] = useState(false);
	const [allOnlineEvents, setAllOnlineEvents] = useState([]);
	const [isOnlineEventLoading, setIsOnlineEventLoading] = useState(false);

	useEffect(() => {
		// console.log('this is useeff');
		const fetchEvents = async () => {
			setIsOnlineEventLoading(true);
			setIsEventLoading(true);

			try {
				const { data } = await axios.post(
					'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
					{
						Token: props.token,
						Action: 'R',
						eventTitle: null,
						eventDate: null,
						eventTime: null,
						eventDescription: null,
						imgUrl: null,
						locationDetail: null,
						eventType: null,
					},
				);

				if (data.Status) {
					console.log('this is data from fetch all events: ', data);

					const fetchedAllOnlineEvents = data.EventsDB.filter(
						(event) => event.Online === 'Online',
					);
					console.log(
						'this is fetchedAllOnlineEvents: ',
						fetchedAllOnlineEvents,
					);
					setIsEventLoading(true);
					setAllEvents(data.EventsDB);
					setIsEventLoading(false);
					setAllOnlineEvents(fetchedAllOnlineEvents);
				}
			} catch (err) {
				console.log('there is an error in fetch all events: ', err);
			}
			setIsOnlineEventLoading(false);
			setIsEventLoading(false);
		};

		const fetchBlogs = async () => {
			try {
				setIsBlogLoading(true);
				const { data } = await axios.post(
					'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
					{
						Token: props.token,
						Action: 'R',
						BlogSubject: null,
						BlogBody: null,
						Date: null,
						Time: null,
						Comment: null,
						Location: null,
					},
				);

				console.log('this is data in blogs: ', data);

				if (data.Status) {
					setAllBlogs(data.BlogsDB);
				}
			} catch (err) {
				console.log('there is an error in fetch all events: ', err);
			}
			setIsBlogLoading(false);
		};

		fetchEvents();
		fetchBlogs();
		props.onFetchBlogs(props.token);
	}, []);

	const updateComment = (blogName, userName, comment) => {
		const blogs = [...allBlogs];
		console.log('this is blogname beofr map: ', blogName);
		const updatedBlogs = blogs.map((blog) => {
			if (blog.blogName === blogName) {
				console.log(
					'name matched: ',
					blog.blogName,
					'and this is userName: ',
					userName,
				);
				const updatedBlog = { ...blog };
				const updatedBlogComment = {
					...updatedBlog.BlogComment,
				};
				updatedBlogComment[userName] = comment;

				// updatedBlogComment[userName] = comment;
				console.log('this is updatedBlogComment: ', updatedBlogComment);

				return { ...updatedBlog, BlogComment: updatedBlogComment };
			}
			return blog;
		});

		// console.log('this is updateBlogs: ', updatedBlogs);
		setAllBlogs(updatedBlogs);
	};

	let trendingOnlineEvents = <CircularProgress />;
	let trendingEvents = <CircularProgress />;
	let blogs = <CircularProgress />;
	// if (!isOnlineEventLoading) {
	// 	trendingOnlineEvents = (
	// 		<SlideShow slideItems={allOnlineEvents} isEvent={true} />
	// 	);
	// }
	// if (!isEventLoading) {
	// 	trendingEvents = <SlideShow slideItems={allEvents} isEvent={true} />;
	// }

	// if (!isBlogLoading) {
	// 	blogs = (
	// 		<SlideShow
	// 			slideItems={allBlogs}
	// 			isEvent={false}
	// 			updateComment={updateComment}
	// 		/>
	// 	);
	// }
	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={8}>
					<TextField
						variant='outlined'
						size='small'
						fullWidth
						name='searchTerm'
						placeholder='Search'
						// label='Search Term'
						type='text'
						id='search-term'
						// inputRef={register({ required: true })}
						// error={errors.username?.type === 'required'}
					/>
				</Grid>
				<Grid item xs={3} sm={3} md={2}>
					<FormControl variant='outlined' style={{ width: '100%' }}>
						<FormControl variant='outlined'>
							{/* <InputLabel id='demo-simple-select-filled-label'>Age</InputLabel> */}
							<Select
								displayEmpty
								value={''}
								onChange={() => {
									console.log('');
								}}
								style={{ height: '40px' }}>
								<MenuItem value=''>Filter</MenuItem>
								<MenuItem value={10}>Filter 1</MenuItem>
								<MenuItem value={20}>Filter 2</MenuItem>
								<MenuItem value={30}>Filter 3</MenuItem>
							</Select>
						</FormControl>
					</FormControl>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<Button variant='contained' color='primary' size='medium'>
						Search
					</Button>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						Popular Online Events
					</Typography>
					{trendingOnlineEvents}
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						Trending Events
					</Typography>
					{trendingEvents}
				</Grid>
				<Grid item xs={12} sm={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						Recent Blogs
					</Typography>
					{blogs}
				</Grid>
			</Grid>
		</Container>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchEvents: (token, action) =>
			dispatch(actions.onFetchEvents(token, action)),
		onFetchBlogs: (token) => dispatch(actions.onFetchBlogs(token)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
