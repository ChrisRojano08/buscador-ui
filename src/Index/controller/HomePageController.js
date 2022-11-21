import { Urls } from '../../resources/Urls';
import { Client } from '../../resources/Client';
export class HomePageController { 
	async sendText(text) {
		const resp = await Client.GET({
			url: Urls.searchApi.searching,
			data: text
		});
		return resp;
	}
}
