const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getPhotos } = require('./photo.controller')
const router = express.Router()

router.get('/', log, getPhotos)

module.exports = router
