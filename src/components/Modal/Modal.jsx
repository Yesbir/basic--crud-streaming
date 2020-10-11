import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal(props) {
	return ReactDOM.createPortal(renderModal(props), document.querySelector('#modal'));
}

const renderModal = ({ header, content, actions, onDismis }) => {
	return (
		<div className="ui dimmer modals visible active" onClick={onDismis}>
			<div
				className="ui standard modal visible active"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="header">{header}</div>
				<div className="content">{content}</div>
				<div className="actions">{actions}</div>
			</div>
		</div>
	);
};
