import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePageComponent from './Index/component/HomePage';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 0
		};
	}

	render() {
		return (
			<div className='App'>
				<Router>
					<div className='mt-3'>
						<Switch>
							<Route path='/' component={HomePageComponent} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
