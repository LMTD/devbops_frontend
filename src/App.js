import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HeaderBar from './containers/headerBar/HeaderBar';
import Login from './containers/auth/login/Login';
import SignUp from './containers/auth/signUp/SignUp';
import Home from './containers/home/Home';
import EventDetail from './containers/eventDetail/EventDetail';

function App() {
	return (
		<div>
			<HeaderBar />
			<Switch>
				<Route exact path={['/', '/home']} component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/sign-up' component={SignUp} />
				<Route exact path='/event-detail/:id' component={EventDetail} />
			</Switch>
		</div>
	);
}

export default App;
