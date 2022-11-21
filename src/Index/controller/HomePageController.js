import { Urls } from '../../resources/Urls';
export class HomePageController { 
	async sendText(text) {
		const respuesta = await fetch(Urls.searchApi.searching, {
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
