import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import ProtectedRoute from './ProtectedRoute';
import HeaderBar from './containers/headerBar/HeaderBar';
import Main from './containers/main/Main';
import About from './containers/about/About';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';
import Logout from './containers/auth/logout/Logout';
import * as actions from './store/actions/auth';

import './App.css';


class App extends Component {

	constructor(props) {
		super(props);

		this.props.onTryAuthLogin();

	}

	render() {

		return (
			<div>
				<HeaderBar />
				<Switch>
					<Route exact path="/linkedin" component={LinkedInPopUp} />
					<Route exact path='/' component={Home} />
					<Route path='/about' component={About} />
					{/* <ProtectedRoute exact path='/home' component={Home} /> */}
					<ProtectedRoute exact path='/profile' component={Profile} />
					<ProtectedRoute exact path='/logout' component={Logout} />
					<Route path='/main' component={Main} />
					<Redirect from="/*" to='/main' />

				</Switch>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAuthLogin: () => dispatch(actions.authCheckState()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
