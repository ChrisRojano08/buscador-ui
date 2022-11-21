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
	
	searchButtonAction=()=> {
		const searchButton = document.getElementById('searchBar');
		const container = document.getElementById('container');
		const searchBox = document.getElementById('searchBox');
		console.log(searchButton.value);
			//keyword = searchBar.val();
			//resultArea.empty();
			//footer.empty();
			//displayResults();
			searchBox.style.padding_top=0;

    	container.style.height="30vh";
	}

	render() {

		return (
			<div>
				{/* 
			<div className="container">
    			<br/>
				<div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <form className="card card-sm">
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Ingresa una palabra o frase"/>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-lg btn-success" type="submit">Buscar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
			</div>*/}
			<header id= "container" className="container-fluid" >
				<div className="container text-center" id="searchBox">
					<h1>Buscador Python</h1>
					<div className="form col-xs-12">
						<input className="col-xs-12" id="searchBar" type="text" placeholder="search" />
						<span className="fas fa-search col-xs-1" data-toggle="tooltip" title="Search"
						onClick={()=>this.searchButtonAction()}></span>
					</div>
				</div>  
			</header >
				<div id="mainBody" className="container text-center">
  					<ul id="results">
			  		</ul>
			</div>
			<footer id="footerel" className="text-center">
  
			</footer>
			</div>
		);
	}
}
export default withRouter(HomePageComponent);
