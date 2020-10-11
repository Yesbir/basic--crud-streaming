import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';

import StreamForm from './StreamForm';

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.editStream(this.props.stream.id, formValues);
	};

	render() {
		if (this.props.stream) {
			return (
				<div>
					<StreamForm
						onSubmit={this.onSubmit}
						initialValues={_.pick(this.props.stream, 'title', 'description')}
					/>{' '}
					{/*{title:this.props.stream.title,description:this.props.stream.dscription}*/}
				</div>
			);
		}
		else {
			return <div>Loading...</div>;
		}
	}
}

const mapStateToprops = (state, props) => {
	return { stream: state.streams[props.match.params.id] };
};

export default connect(mapStateToprops, { fetchStream, editStream })(StreamEdit);
