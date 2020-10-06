import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HeaderBar from './containers/headerBar/HeaderBar';
// import Register from './containers/auth/register/Register';
// import Login from './containers/auth/login/Login';
import Home from './containers/home/Home';
import EventDetail from './containers/eventDetail/EventDetail';
import About from './containers/about/About';

import './App.css';

function App() {
	return (
		<div style={{ background: '#fffa71' }}>
			<HeaderBar />
			<Switch>
				<Route exact path={['/', '/home']} component={Home} />
				{/* <Route path='/login' component={Login} />
				<Route path='/register' component={Register} /> */}
				<Route exact path='/event-detail/:id' component={EventDetail} />
				<Route path='/about' component={About} />
			</Switch>
		</div>
	);
}

export default App;
