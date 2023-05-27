const axios = require('axios')

module.exports = {
	getPhotos,
}

const API_KEY = '25540812-faf2b76d586c1787d2dd02736'
const BASE_URL = 'https://pixabay.com/api/'

async function getPhotos(searchCriteria) {
	let { category, pageNumber, order, per_page = 9 } = searchCriteria

	try {
		const response = await axios.get(BASE_URL, {
			params: {
				key: API_KEY,
				category: category,
				page: pageNumber,
				per_page,
				order: order,
			},
		})
		const { totalHits, hits } = response.data
		const photos = hits.map((photo) => ({
			id: photo.id,
			tags: photo.tags,
			webformatURL: photo.webformatURL,
			largeImageURL: photo.largeImageURL,
			views: photo.views,
			downloads: photo.downloads,
			collections: photo.collections,
		}))
		return { totalHits, photos }
	} catch (err) {
		console.error('ERROR in getting photos!', err, searchCriteria)
		throw err
	}
}
