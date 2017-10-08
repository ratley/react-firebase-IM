import React, { Component } from 'react';

import './Message.scss';

class Message extends Component {
	render() {
		return (
			<li className="message">
				<span>
					{this.props.user}
					<span className="time">{this.props.time}</span>
				</span>
				<h3>{this.props.content}</h3>
			</li>
		);
	}
}

export default Message;
