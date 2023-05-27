const pixabayService = require('../services/pixabay.service')

async function getPhotos(req, res) {
	try {
		console.debug('req.query', req.query)
		const searchCriteria = {
			category: req.query.category || '',
			pageNumber: req.query.pageNumber || 1,
			order: req.query.order || 'popular',
		}
		const photosData = await pixabayService.getPhotos(searchCriteria)
		res.json(photosData)
	} catch (err) {
		console.error('Failed to get photos', err)
		res.status(500).send({ err: 'Internal Server Error' })
	}
}

module.exports = {
	getPhotos,
}
