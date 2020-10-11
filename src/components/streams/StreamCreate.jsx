import React, { Component } from 'react';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';

import { createStream } from '../../actions';

import './StreamCreate.css';

class StreamCreate extends Component {

	onSubmit = (formValues) => {
		this.props.createStream(formValues);

	};

	render() {
		return (
			<div>
				<h2>Creating Stream</h2>
				<StreamForm onSubmit={this.onSubmit}/>
			</div>
		);
	}
}


export default connect(null, {
	createStream
})(StreamCreate);
