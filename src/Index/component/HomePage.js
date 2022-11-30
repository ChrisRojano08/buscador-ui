import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomePageController } from '../controller/HomePageController';

class HomePageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.homePageController = new HomePageController();
		this.state = {
			index: 0,
			results: [['1', '2', 0, '4', ['','']]],
			info: 'NAN'
		};
	}

	componentDidMount() {

	}

	showResults = () => {
		let iKey = 0;

		if (this.state.info === 'NAN') {
			return (
				<></>
			);
		} else {
			return (
				<div className='row justify-content-center align-items-center text-center'>
					<h5 className='my-4 mx-2'>{this.state.info}</h5>

					{this.state.results.map(items =>
					<div className='box_result col-8'>
						<div className='urlR'>
							<a key={iKey++} href={items[0]} target="_blank" rel="noreferrer" className='text-decoration-none'>
								<h3>{items[1] !== 'URL' ? '[' + items[1] + ']' : ''} {items[3]}</h3>
							</a>
						</div>
						<div className='mt-2 incR'>
							<span>Total de incidencias: {items[2]}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
							{
								items[4].map(l =>
									<span key={l[0]}>[{l[0]} , {l[1]}]&nbsp; &nbsp; &nbsp;</span>
								)
							}
						</div>
					</div>
					)}
				</div>
			)
		}

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

		this.setState({ info: 'NAN' });
		document.getElementById('chargging_panel').style.display = "block";

		const res = await this.homePageController.sendText(data);
		
		document.getElementById('chargging_panel').style.display = "none";
		this.setState({
			results: res.data,
			info: res.time
		})
	}

	handleKeyDown = event =>{
		if(event.key === 'Enter'){
			this.searchButtonAction()
		}
	}

	render() {

		return (
			<div>
				<div className='chargging_panel' id='chargging_panel' />
				<header id="container" className="container-fluid" >
					<div className="container text-center" id="searchBox">
						<h1>Buscador Python</h1>
						<div className="form col-xs-12">
							<input className="col-xs-12 mx-2" id="searchBar"
								type="text"
								placeholder="search"
								onKeyDown={this.handleKeyDown}
							/>

							<span className="fas fa-search col-xs-1" data-toggle="tooltip" title="Search"
								onClick={() => this.searchButtonAction()}></span>
						</div>
					</div>
				</header >
				<div id="mainBody">
					{this.showResults()}
				</div>
				<footer id="footerel" className="text-center">

				</footer>
			</div>
		);
	}
}
export default withRouter(HomePageComponent);
