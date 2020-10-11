import React, { Component } from 'react';
import { connect } from 'react-redux';

import { trySignIn, trySignOut, getUserInfo } from '../../actions';

class GoogleOAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '455978507128-rd7f3m7uedu1e1g5gpbtimmcdu93u548.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					// this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			const userId = this.auth.currentUser.get().getId();
			this.props.trySignIn(userId);
			this.props.getUserInfo({
				userId: userId,
				profilePicture: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
				email: this.auth.currentUser.get().getBasicProfile().getEmail(),
				name: this.auth.currentUser.get().getBasicProfile().getName()
			});
		}
		if (isSignedIn === false) this.props.trySignOut();
		// this.setState({ isSignedIn: this.props.isSignedIn });
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	handleGoogleAuth = () => {
		if (this.props.isSignedIn == null) return 'loading...';
		else if (this.props.isSignedIn)
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		else
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			);
	};

	render() {
		return <div>{this.handleGoogleAuth()}</div>;
	}
}

const mapStatesToProps = (state) => {
	return { isSignedIn: state.authState.isSignedIn };
};

export default connect(mapStatesToProps, { trySignIn, trySignOut, getUserInfo })(GoogleOAuth);
