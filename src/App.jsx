import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HeaderBar from './containers/headerBar/HeaderBar';
import Register from './containers/auth/register/Register';
import Login from './containers/auth/login/Login';
import Main from './containers/main/Main';
import EventDetail from './containers/eventDetail/EventDetail';
import About from './containers/about/About';
import Home from './containers/home/Home';
import CreateEvent from './containers/createEvent/CreateEvent';
import PostBlog from './containers/postBlog/PostBlog';

import './App.css';

function App() {
	return (
		<div style={{ background: '#fffa71' }}>
			<HeaderBar />
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/about' component={About} />

				{/* this is a for authenticated users */}
				<Route exact path='/home' component={Home} />
				<Route exact path='/event-detail/:id' component={EventDetail} />
				<Route exact path='/create-event' component={CreateEvent} />
				<Route exact path='/post-blog' component={PostBlog} />
			</Switch>
		</div>
	);
}

export default App;
