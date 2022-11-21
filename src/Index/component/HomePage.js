import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomePageController } from '../controller/HomePageController';

class HomePageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.homePageController = new HomePageController();
		this.state = {
			index: 0,
			results: [['1', '2', 0, '4']]
		};
	}

	componentDidMount() {

	}

	showResults = () => {
		console.log("xd", this.state.results);
		return this.state.results.map(items =>
			<a href={items[0]} target="_blank" rel="noreferrer" className='text-decoration-none'>
				<li>
					<h3>{items[1] !== 'URL' ? '['+items[1]+']' : ''} {items[3]}</h3>
				</li>
			</a>
		)
	}

	async searchButtonAction() {
		const searchButton = document.getElementById('searchBar');
		const container = document.getElementById('container');
		const searchBox = document.getElementById('searchBox');

		searchBox.style.paddingTop = "5vh";
		container.style.height = "30vh";
		
		const data = {
			"search": searchButton.value
		}
		const res = await this.homePageController.sendText(data);

		this.setState({
			results: res.data
		})
	}

	render() {

		return (
			<div>
				<header id="container" className="container-fluid" >
					<div className="container text-center" id="searchBox">
						<h1>Buscador Python</h1>
						<div className="form col-xs-12">
							<input className="col-xs-12" id="searchBar" type="text" placeholder="search" />
							<span className="fas fa-search col-xs-1" data-toggle="tooltip" title="Search"
								onClick={() => this.searchButtonAction()}></span>
						</div>
					</div>
				</header >
				<div id="mainBody" className="container text-center">
					<ul id="results">
						{this.showResults()}
					</ul>
				</div>
				<footer id="footerel" className="text-center">

				</footer>
			</div>
		);
	}
}
export default withRouter(HomePageComponent);
