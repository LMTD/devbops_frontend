import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const ProtectedRoute = ({ isAuthenticated, onAuth, component: Component, ...rest }) => {

	return (
		<Route
			{...rest}
			render={(props) => {

				console.log('this is rest.isAuthenticated: ', rest.isAuthenticated)
				console.log('this is props in protected: ', props)
				if (onAuth) {
					return <CircularProgress />
				} else if (isAuthenticated) {

					return <Component {...props} />;
				} else {
					return <Redirect to={{
						pathname: "/",
						state: {
							from: props.location
						}
					}} />
				}

			}}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		onAuth: state.auth.onAuth
	};
};

export default connect(mapStateToProps)(ProtectedRoute);
