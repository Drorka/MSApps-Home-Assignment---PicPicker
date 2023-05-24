const express = require('express')
const { getPhotos } = require('./photo.controller')
const router = express.Router()

router.get('/', getPhotos)

module.exports = router
