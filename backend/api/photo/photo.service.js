const pixabayService = require('../../services/pixabay.service')
const logger = require('../../services/logger.service')

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
		logger.error('cannot find photos', err)
		throw err
	}
}

// async function query(filterBy = { txt: '' }) {
// 	try {
// 		const criteria = {
// 			vendor: { $regex: filterBy.txt, $options: 'i' },
// 		}
// 		const collection = await dbService.getCollection('photo')
// 		var photos = await collection.find(criteria).toArray()
// 		return photos
// 	} catch (err) {
// 		logger.error('cannot find photos', err)
// 		throw err
// 	}
// }

module.exports = {
	query,
}
