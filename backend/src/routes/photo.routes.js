const express = require('express')
const { getPhotos } = require('../controllers/photo.controller')
const router = express.Router()

router.get('/', getPhotos)
router.get('/:category', getPhotos)

module.exports = router
