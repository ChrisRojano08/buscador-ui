import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomePageController } from '../controller/HomePageController';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


class HomePageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.homePageController = new HomePageController();
		this.state = {
			index: 0,
			results: [['1', '2', 0, '4', ['','']]],
			info: 'NAN',
			type: 'otros',
			search: '',
			page: 0,
			items: 0,
			total: 0
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
		this.updateDimensions();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions = () => {
		if(window.innerWidth>3000){
			this.setState({items: 7})
		}else if(window.innerWidth<=3000 && window.innerWidth>1800){
			this.setState({items: 6})
		}else if(window.innerWidth<=1800 && window.innerWidth>1600){
			this.setState({items: 5})
		}else if(window.innerWidth<=1600 && window.innerWidth>1300){
			this.setState({items: 4})
		}else if(window.innerWidth<=1300 && window.innerWidth>1000){
			this.setState({items: 3})
		}else if(window.innerWidth<=1000 && window.innerWidth>600){
			this.setState({items: 2})
		}else if(window.innerWidth<=600){
			this.setState({items: 1})
		}
	};

	showResults = () => {
		let iKey = 0;

		if (this.state.info === 'NAN') {
			return (
				<></>
			);
		}else{
			return (
				<div className='row justify-content-center align-items-center text-center'>
					{
						this.state.results.length !== 0 ?
							this.state.type === 'otros' ?
								this.state.results.map(items =>
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
								)
							:
								<ImageList
									variant="quilted"
									cols={this.state.items}
									rowHeight="auto"
								>
									{this.state.results.map(item =>
										<a className='border' href={item[0]} target="_blank" rel="noreferrer" key={iKey++}>
											<ImageListItem key={item[2]} cols={item.cols || 1} rows={item.rows || 1}>
											<img src={item[2]}
											loading="lazy"
											className='imgRes'
											alt='waos'
											/>
									  	</ImageListItem>
										</a>
										
									)}
								</ImageList>
						:
							<></>
					}
				</div>
			)
		}

	}

	handleChange = (e) => {
		this.setState({search: e.target.value});
	};

	async searchButtonAction(typeSearch, pageN) {
		document.getElementById('mainBody').style.display = "block";
		const container = document.getElementById('container');
		const searchBox = document.getElementById('searchBox');

		searchBox.style.paddingTop = "5vh";
		container.style.height = "30vh";

		this.setState({ page: pageN }, async ()=>{
			const data = {
				"search": this.state.search,
				"page": this.state.page
			}
			
			console.log(data)
	
			this.setState({ info: 'NAN' });
			document.getElementById('chargging_panel').style.display = "block";
	
			let typeSH = 'otros';
			document.getElementById('v-pills-todos').className = "nav-link my-2 btn-lg";
			document.getElementById('v-pills-imagenes').className = "nav-link my-2 btn-lg";
			document.getElementById('v-pills-videos').className = "nav-link my-2 btn-lg";
			document.getElementById('v-pills-compras').className = "nav-link my-2 btn-lg";
			document.getElementById('v-pills-documentos').className = "nav-link my-2 btn-lg";
			switch(typeSearch){
				case 'all':
					document.getElementById('v-pills-todos').className = "nav-link my-2 btn-lg active";
				break;
				case 'videos':
					document.getElementById('v-pills-videos').className = "nav-link my-2 btn-lg active";
				break;
				case 'compras':
					document.getElementById('v-pills-compras').className = "nav-link my-2 btn-lg active";
				break;
				case 'documentos':
					document.getElementById('v-pills-documentos').className = "nav-link my-2 btn-lg active";
				break;
				case 'imagenes':
					document.getElementById('v-pills-imagenes').className = "nav-link my-2 btn-lg active";
					typeSH = 'imagenes';
				break;
				default:
					typeSH = 'otros';
				break;
			}
			
			const res = await this.homePageController.sendText(data, typeSearch);
			
			document.getElementById('chargging_panel').style.display = "none";
			this.setState({
				results: res.data,
				info: res.time,
				type: typeSH,
				total: res.total
			})
		});
	}

	handleKeyDown = event =>{
		if(event.key === 'Enter'){
			this.searchButtonAction('all', 1)
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
								onChange={this.handleChange}
							/>

							<span className="fas fa-search col-xs-1" data-toggle="tooltip" title="Search"
								onClick={() => this.searchButtonAction('all', 1)}></span>
						</div>
					</div>
				</header >
						<div id="mainBody" className='mx-2 my-2'>
							<div className="d-flex align-items-start">
								<div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
									<button className="nav-link my-2 btn-lg active" id="v-pills-todos" data-bs-toggle="pill"
										data-bs-target="#v-pills-home" type="button" role="tab"
										aria-controls="v-pills-home" aria-selected="true" onClick={() => this.searchButtonAction('all', 1)}>
										Todos
									</button>
									<button className="nav-link my-2 btn-lg" id="v-pills-imagenes" data-bs-toggle="pill" 
										data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" 
										aria-selected="false" onClick={() => this.searchButtonAction('imagenes', 1)}>
										Imagenes
									</button>
									<button className="nav-link my-2 btn-lg" id="v-pills-videos" data-bs-toggle="pill"
										data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" 
										aria-selected="false" onClick={() => this.searchButtonAction('videos', 1)}>
										Videos
									</button>
									<button className="nav-link my-2 btn-lg" id="v-pills-compras" data-bs-toggle="pill"
										data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" 
										aria-selected="false" onClick={() => this.searchButtonAction('compras', 1)}>
										Compras
									</button>
									<button className="nav-link my-2 btn-lg" id="v-pills-documentos" data-bs-toggle="pill"
										data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" 
										aria-selected="false" onClick={() => this.searchButtonAction('documentos', 1)}>
										Documentos
									</button>
								</div>
								<div className="tab-content p-2" id="v-pills-tabContent">
									<div className="tab-pane fade show active p-2" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
										{this.state.results.length !== 0 ? <h5 className='my-4 mx-2 text-center'>{this.state.info}</h5> : <></>}
										{this.showResults()}

										{this.state.total !== 0 && this.state.type === 'imagenes' ?
											<div className='my-3 d-flex justify-content-left align-items-center'>
												<div className='d-flex flex-row'>
													<div className='d-flex flex-column'>
														<div
															className={
																this.state.page > 1
																	? 'button btn btn-outline-danger'
																	: 'button btn btn-outline-danger disabled'
															}
															onClick={
																this.state.page > 1
																	? () => this.searchButtonAction('imagenes', this.state.page-1)
																	: null
															}
														>
															Anterior
														</div>
													</div>
													<div
														className='d-flex flex-column'
														style={{ paddingLeft: '10px' }}
													>
														<div
															className={
																this.state.page * 100 <
																	this.state.total
																	? 'button btn btn-outline-danger'
																	: 'button btn btn-outline-danger disabled'
															}
															onClick={
																this.state.page * 100 <
																	this.state.total
																	? () => this.searchButtonAction('imagenes', this.state.page+1)
																	: null
															}
														>
															Siguiente
														</div>
													</div>
													<p className='mx-4 ml-3 pt-2'>
														Página {this.state.page} de{' '}
														{Math.ceil(this.state.total / 100)}
													</p>
												</div>
											</div>
											: <></>
											}
									</div>
								</div>
							</div>
						</div>
					
				
				<footer id="footerel" className="text-center" />
			</div>
		);
	}
}
export default withRouter(HomePageComponent);
