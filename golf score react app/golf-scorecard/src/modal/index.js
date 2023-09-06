import React from 'react';
import ReactDOM from 'react-dom'

function Modal(props) {
	const fragClass = `light-modal ${props.classes || ''}`.trim();

	return props.modalView ? ReactDOM.createPortal(
		<React.Fragment>
			<div className={fragClass} aria-modal aria-hidden tabIndex={-1} role="dialog" /*onClick={props.hide}*/>
				<div className="light-modal-content animated zoomInUp">
					<div className="light-modal-header">
						<h3 className="light-modal-heading">{props.content.heading}</h3>
						<a href="#" className="light-modal-close-icon" onClick={props.hide} aria-label="close">×</a>
					</div>
					<div className="light-modal-body">
						{props.content.body}
					</div>
					<div className="light-modal-footer">
						<a href="#" className="light-modal-close-btn" onClick={props.hide} aria-label="close">Close</a>
						{props.content.footer}
					</div>
				</div>
			</div>
		</React.Fragment>, document.body
	) : null;
}

export default Modal;