import React, { Component } from 'react';
import Home from './components/Home/Home';
import './App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<div>
				<Home />
			</div>
		);
	}
}

export default App;
