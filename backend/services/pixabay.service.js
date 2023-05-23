const axios = require('axios')

module.exports = {
	getPhotos,
}

const API_KEY = '25540812-faf2b76d586c1787d2dd02736'

async function getPhotos(categoryName) {
	console.log('herro pixabay')

	let URL = `https://pixabay.com/api/?key=${API_KEY}&q=${categoryName}&per_page=27`

	try {
		console.log('pixabay service getPhotos try')
		const response = await axios.get(URL)
		const { hits } = response.data
		const photos = hits.map((photo) => ({
			id: photo.id,
			type: photo.type,
			tags: photo.tags,
			previewURL: photo.previewURL,
			largeImageURL: photo.largeImageURL,
			views: photo.views,
			downloads: photo.downloads,
			collections: photo.collections,
		}))
		return photos
	} catch (err) {
		console.error('ERROR in getting photos!', err)
	}
}
