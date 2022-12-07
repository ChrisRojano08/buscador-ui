const baseURl = 'http://cajitasdeamor.mx:8089';

// this is a explame data for base url api
const baseApi = {
	search: baseURl + '/'
};

// this is a exmple data for enpoint api
export const Urls = {
	searchApi: {
		searching: baseApi.search + 'search',
		images: baseApi.search + 'search/images',
		videos: baseApi.search + 'search/videos',
		shops: baseApi.search + 'search/shops',
		pdfs: baseApi.search + 'search/pdfs'
	}
};
