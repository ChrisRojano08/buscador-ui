import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomePageController } from '../controller/HomePageController';

class HomePageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.homePageController = new HomePageController();
		this.state = {
			index: 0,
		};
	}

	componentDidMount() {
		
	}

	render() {
		window.scroll({top: 0});

		return (
			<div>
				A
			</div>
		);
	}
}
export default withRouter(HomePageComponent);
