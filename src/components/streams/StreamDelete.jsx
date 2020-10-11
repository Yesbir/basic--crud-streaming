import React from 'react';
import Modal from '../Modal/Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderContent = () => {
		if (this.props.stream) return `Are you sure you want to delete stream with title: ${this.props.stream.title}`;
		return `Are you sure you want to delete this Stream`;
	};

	onDismis = () => {
		history.push('/');
	};

	handleDelete = () => {
		this.props.deleteStream(this.props.match.params.id);
	};

	renderActions = () => {
		return (
			<React.Fragment>
				<button className="ui negative button " onClick={this.handleDelete}>
					Delete
				</button>
				<button className="ui button " onClick={this.onDismis}>
					Cancel
				</button>
			</React.Fragment>
		);
	};

	render() {
		return (
			<div>
				<Modal
					header="Delete Stream"
					content={this.renderContent()}
					onDismis={this.onDismis}
					actions={this.renderActions()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return { stream: state.streams[props.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
