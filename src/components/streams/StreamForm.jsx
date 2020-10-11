import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import './StreamCreate.css';

class StreamForm extends Component {
	// state = { isFormSubmitted: false };

	renderInput = ({ input, label, meta }) => {
		//meta contain the error passes
		// console.log(input);
		return (
			<div className="field">
				<label>{label}</label>
				<input type="text" {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <div className="ui pointing red basic label">{error}</div>;
		}
		return undefined;
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
		// this.setState({ isFormSubmitted: true });
		// setTimeout(() => {
		// 	this.setState({ isFormSubmitted: false });
		// }, 2000);
	};

	render() {
		if (!this.props.isSignedIn) {
			return (
				<div className="ui warning message">
					<div className="header">You must Sign In for Creating Or Editing the Stream!</div>
					First Sign In and then try again
				</div>
			);
		}
		return (
			<div>
				<form className="ui fluid form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<div>
						<Field name="title" component={this.renderInput} label="Enter Title" />
						<div className="ui divider" />
						<Field name="description" component={this.renderInput} label="Enter Description" />
					</div>

					<div>
						<button className="ui button primary form-button">Submit</button>
					</div>
				</form>
				{/* {this.state.isFormSubmitted ? (
					<div>
						<div className="ui divider" />
						<div className="ui compact success message">
							<div className="header">Your Stream is created Successfully.</div>
						</div>
					</div>
				) : (
					undefined
				)} */}
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'You must Enter the title';
	}
	if (!formValues.description) {
		errors.description = 'Must enter the description';
	}
	return errors;
};

const mapStateToProps = (state) => {
	return { isSignedIn: state.authState.isSignedIn };
};

const streamFormWrap = reduxForm({
	form: 'streamForm',
	validate: validate
})(StreamForm);

export default connect(mapStateToProps)(streamFormWrap);
