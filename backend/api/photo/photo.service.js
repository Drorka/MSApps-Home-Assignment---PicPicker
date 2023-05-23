const pixabayService = require('../../services/pixabay.service')
const logger = require('../../services/logger.service')

async function query(categoryName) {
	console.log('herro service')
	try {
		const photos = await pixabayService.getPhotos(categoryName)
		// sort here if needed
		return photos
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
