import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
		// this.state = {
		// 	token: null
		// }
		this.props.onTryAuthLogin();

	}
	// componentWillMount() {


	// 	this.props.onTryAuthLogin();
	// }
	render() {

		let routes = <Switch>
			<Route path='/about' component={About} />
			<Route exact path='/' component={Main} />
			<ProtectedRoute exact path='/home' component={Home} />
			<ProtectedRoute exact path='/profile' component={Profile} />
			<ProtectedRoute exact path='/logout' component={Logout} />
			<Redirect from="/*" to={this.props.isAuthenticated ? "/home" : '/'} />

		</Switch>

		// console.log('this is window.location.href: ', window.location.href)

		// let routes = null;

		// if (localStorage.getItem('userData') !== null) {
		// 	console.log('this is token: ', localStorage.getItem('userData'))

		// 	routes = (
		// 		<Switch>
		// 			{/* <Route exact path='/' component={Main} /> */}
		// 			<Route path='/about' component={About} />
		// 			<Route exact path='/home' component={Home} />
		// 			<Route exact path='/profile' component={Profile} />
		// 			<Route path='/logout' component={Logout} />
		// 			{/* <Redirect exact from='/cancel-rsvp' to='/profile' /> */}

		// 			{/* <Redirect exact from='/profile' to='/profile' />
		// 			<Redirect exact from='/*' to='/home' /> */}
		// 		</Switch>
		// 	);
		// } else {
		// 	routes = (
		// 		<Switch>
		// 			<Route exact path='/about' component={About} />
		// 			<Route exact path='/' component={Main} />
		// 			{/* <Redirect exact from='/home' to='/home' /> */}
		// 			{/* <Route exact path='/profile' component={Profile} /> */}
		// 			{/* <Redirect exact from='/profile' to='/profile' /> */}
		// 			<Redirect from='/*' to='/' />
		// 		</Switch>
		// 	);
		// }






		return (
			<div>
				<HeaderBar />
				{routes}
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
