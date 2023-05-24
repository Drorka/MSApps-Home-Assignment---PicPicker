const pixabayService = require('../../services/pixabay.service')

async function query(filterBy) {
	try {
		const photos = await pixabayService.getPhotos(filterBy)
		return photos
		// sort here

		// If I were to implement pagination manually:
		// const pageSize = 9
		// const startIndex = (pageNumber - 1) * pageSize
		// const endIndex = startIndex + pageSize
		// const pagePhotos = photos.slice(startIndex, endIndex)
		// return pagePhotos
	} catch (err) {
		console.log('cannot find photos', err)
		throw err
	}
}

module.exports = {
	query,
}
