import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin = (stream) => {
		if (this.props.currentUser && stream.userId === this.props.currentUser.userId) {
			return (
				<div className="extra content">
					<span className="right floated">
						<Link to={`/streams/delete/${stream.id}`} className="ui red button">
							Delete
						</Link>
					</span>
					<span>
						<Link to={`/streams/edit/${stream.id}`} className="ui orange button">
							Edit
						</Link>
					</span>
				</div>
			);
		}
		else {
			return (
				<div className="extra content">
					<span className="right floated">{`By: ${stream.author}`}</span>
				</div>
			);
		}
	};

	renderList = () => {
		return this.props.streams.map((stream) => {
			return (
				<div className="card" key={stream.id}>
					<div className="image">
						<img src={stream.profilePicture} alt={stream.author} />
					</div>
					<div className="content">
						<Link to={`/streams/show/${stream.id}`} className="header">
							{stream.title}
						</Link>
						{/* <div className="description">{stream.description}</div> */}
					</div>
					{this.renderAdmin(stream)}
				</div>
			);
		});
	};

	render() {
		return (
			<div className="ui container">
				<h2>Streams</h2>
				<div className="ui four cards">{this.renderList()}</div>
			</div>
		);
	}
}

const mapStateTProps = (state) => {
	const streams = Object.values(state.streams);
	return { streams, currentUser: state.authState.currentUser };
};

export default connect(mapStateTProps, { fetchStreams })(StreamList);
