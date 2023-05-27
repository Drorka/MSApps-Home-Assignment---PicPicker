const pixabayService = require('./pixabay.service')

async function getPhotos(req, res) {
	try {
		console.debug('req.query', req.query)
		const filterBy = {
			category: req.query.category || '',
			pageNumber: req.query.pageNumber || 1,
			order: req.query.order || 'popular',
		}
		const photosData = await pixabayService.getPhotos(filterBy)
		res.json(photosData)
	} catch (err) {
		console.error('Failed to get photos', err)
		res.status(500).send({ err: 'Failed to get photos' })
	}
}

module.exports = {
	getPhotos,
}
