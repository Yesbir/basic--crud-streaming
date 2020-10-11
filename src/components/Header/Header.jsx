import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import streamyIcon from '../../images/streamy_icon.png';
import GoogleAuth from '../GoogleOAuth/GoogleOAuth';

export default class Header extends Component {
	state = { curActive: null };

	activeClassHandler = (evt) => {
		const curActive = { ...this.state.curActive };
		if (curActive.target !== undefined) {
			if (curActive.target.name === evt.target.name) return;
			curActive.target.className = 'item';
		}
		evt.target.className = 'item active';
		this.setState({
			curActive: { ...evt }
		});
	};
	onIconClickHandler = () => {
		if (this.state.curActive === null) return;
		const modcurState = { ...this.state.curActive };
		modcurState.target.className = 'item';
		this.setState({ curActive: null });
	};
	render() {
		console.log(this.props);
		return (
			<div className="ui pointing menu">
				<Link to="/" name="streamy" className="item" onClick={this.onIconClickHandler}>
					<img src={streamyIcon} alt={'streamy'} className="icon" />
				</Link>
				<Link to="/streams/new" name="new" className="item" onClick={this.activeClassHandler}>
					Add Stream
				</Link>
				<div className="right menu">
					<Link to="/" className="item" name="help" onClick={this.activeClassHandler}>
						Stream
					</Link>
					<div className="item">
						<div className="ui transparent icon input">
							<input type="text" placeholder="Search..." />
							<i className="search link icon" />
						</div>
					</div>
					<div className="item">
						<GoogleAuth />
					</div>
				</div>
			</div>
		);
	}
}
