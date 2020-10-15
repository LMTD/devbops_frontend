import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderBar from './containers/headerBar/HeaderBar';
import Main from './containers/main/Main';
import About from './containers/about/About';
import Home from './containers/home/Home';
import CreateEvent from './containers/createEvent/CreateEvent';
import Logout from './containers/auth/logout/Logout';
import * as actions from './store/actions/auth';

import './App.css';

function App(props) {
	props.onTryAuthLogin();

	let routes = null;

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				{/* <Route exact path='/' component={Main} /> */}
				<Route path='/about' component={About} />
				<Route exact path='/home' component={Home} />
				<Route exact path='/create-event' component={CreateEvent} />
				<Route path='/logout' component={Logout} />
				<Redirect exact from='/' to='/home' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/about' component={About} />
				{/* <Redirect from='/*' to='/' /> */}
			</Switch>
		);
	}

	return (
		<div>
			<HeaderBar />
			{routes}
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAuthLogin: () => dispatch(actions.authCheckState()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
