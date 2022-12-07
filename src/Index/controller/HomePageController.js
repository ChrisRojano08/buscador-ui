import { Urls } from '../../resources/Urls';
export class HomePageController { 
	async sendText(text, typeS) {
		let url = Urls.searchApi.searching

		switch(typeS){
			case 'videos':
				url = Urls.searchApi.videos
			break;
			case 'compras':
				url = Urls.searchApi.shops
			break;
			case 'documentos':
				url = Urls.searchApi.pdfs
			break;
			case 'imagenes':
				url = Urls.searchApi.images
			break;
			default:
				url = Urls.searchApi.searching
			break;
		}

		const respuesta = await fetch(url, {
			'method': 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(text)
		  })
			.then(response => response.json())
			.catch(error => console.log(error))
		
			return respuesta;
	}
}
