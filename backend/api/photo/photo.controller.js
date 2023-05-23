const photoService = require('./photo.service.js')

const logger = require('../../services/logger.service.js')

async function getPhotos(req, res) {
	console.log('herro controller')
	try {
		logger.debug('Getting Photos')
		console.log('req.query', req.query)
		const filterBy = {
			category: req.query.category || '',
			pageNumber: req.query.pageNumber || 1,
		}
		const photos = await photoService.query(filterBy)
		res.json(photos)
	} catch (err) {
		logger.error('Failed to get photos', err)
		res.status(500).send({ err: 'Failed to get photos' })
	}
}

module.exports = {
	getPhotos,
}
