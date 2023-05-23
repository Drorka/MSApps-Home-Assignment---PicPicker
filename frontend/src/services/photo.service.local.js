import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'photo'

export const photoService = {
	query,
	getById,
	save,
	remove,
	getEmptyPhoto,
}
window.cs = photoService

async function query(filterBy = { txt: '', price: 0 }) {
	var photos = await storageService.query(STORAGE_KEY)
	if (filterBy.txt) {
		const regex = new RegExp(filterBy.txt, 'i')
		photos = photos.filter(
			(photo) => regex.test(photo.vendor) || regex.test(photo.description)
		)
	}
	if (filterBy.price) {
		photos = photos.filter((photo) => photo.price <= filterBy.price)
	}
	return photos
}

function getById(photoId) {
	return storageService.get(STORAGE_KEY, photoId)
}

async function remove(photoId) {
	// throw new Error('Nope')
	await storageService.remove(STORAGE_KEY, photoId)
}

async function save(photo) {
	var savedPhoto
	if (photo._id) {
		savedPhoto = await storageService.put(STORAGE_KEY, photo)
	} else {
		savedPhoto = await storageService.post(STORAGE_KEY, photo)
	}
	return savedPhoto
}

function getEmptyPhoto() {
	return {
		vendor: 'Susita-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1000, 9000),
	}
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
