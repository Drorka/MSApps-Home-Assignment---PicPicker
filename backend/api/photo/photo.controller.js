const photoService = require('./photo.service.js')

const logger = require('../../services/logger.service.js')

async function getPhotos(req, res) {
	console.log('herro controller')
	try {
		logger.debug('Getting Photos')
		// const filterBy = {
		// 	txt: req.query.txt || '',
		// }
		const categoryName = req.query.categoryName
		const photos = await photoService.query(categoryName)
		res.json(photos)
	} catch (err) {
		logger.error('Failed to get photos', err)
		res.status(500).send({ err: 'Failed to get photos' })
	}
}

module.exports = {
	getPhotos,
}
