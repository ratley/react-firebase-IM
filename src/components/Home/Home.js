import React, { Component } from 'react';
import firebase from '../../firebase.js';

import './Home.scss';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			newMessage: '',
			user: '',
			messages: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
	}

	componentDidMount() {
		const messagesRef = firebase.database().ref('messages');
		messagesRef.on('value', snapshot => {
			let messages = snapshot.val();
			let newState = [];
			for (let message in messages) {
				newState.push({
					id: message,
					content: messages[message].content,
					user: messages[message].user,
					time: messages[message].time
				});
				if (
					message === Object.keys(messages)[Object.keys(messages).length - 1]
				) {
					this.scrollToBottom();
				}
			}
			this.setState({
				messages: newState
			});
		});
	}

	sendMessage() {
		const messagesRef = firebase.database().ref('messages');
		const message = {
			content: this.state.newMessage,
			user: this.state.user,
			time: `Today at ${new Date().toLocaleTimeString()}`
		};
		if (this.state.newMessage !== '') {
			let promise = new Promise((resolve, reject) => {
				messagesRef.push(message);
				this.setState({
					newMessage: ''
				});

				console.log(1);
				resolve('success');
			});
			promise.then(e => {
				const msgs = document.querySelector('.messages');
				console.log(2);
				msgs.scrollTop = document.querySelector('ul').offsetHeight;
			});
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.sendMessage();
	}
	handleEnter(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			document.getElementById('send-message').click();
		}
	}
	scrollToBottom() {
		var messages = document.querySelector('.messages ul');
		messages.scrollTop = messages.scrollHeight;
	}
	render() {
		return (
			<div className="container">
				<div className="messages">
					<ul>
						{this.state.messages.map(message => {
							return (
								<li key={message.id} className="message">
									<span>
										{message.user}
										<span className="time">{message.time}</span>
									</span>
									<h3>{message.content}</h3>
								</li>
							);
						})}
					</ul>
				</div>
				<form id="form" onSubmit={this.handleSubmit}>
					<textarea
						required
						rows="1"
						name="newMessage"
						className="input"
						type="text"
						placeholder="send a message"
						onChange={this.handleChange}
						onKeyDown={this.handleEnter}
						value={this.state.newMessage}
					/>
					<input
						required
						name="user"
						className="name-input"
						type="text"
						placeholder="name"
						onChange={this.handleChange}
						value={this.state.user}
					/>
					<button id="send-message" type="submit">
						submit
					</button>
				</form>
			</div>
		);
	}
}

export default Home;
