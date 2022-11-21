import { Urls } from '../../resources/Urls';
import { Client } from '../../resources/Client';
export class HomePageController { 
	async sendText(text) {
		const resp = await Client.POST({
			url: Urls.searchApi.searching,
			data: text
		});
		return resp;
	}
}
