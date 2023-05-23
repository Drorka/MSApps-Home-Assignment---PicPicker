import { pixabayService } from '../services/pixabay.service'
// import { photoService } from '../services/photo.service.local.js'
import { photoService } from '../services/photo.service.js'
import { store } from '../store/store.js'
import { SET_PHOTOS } from './photo.reducer.js'

export async function loadPhotos() {
	try {
		// const photos = await pixabayService.query('random', 2)
		const category = { categoryName: 'random' }
		const photos = await photoService.query(category)
		console.log('Photos from DB:', photos)
		store.dispatch({
			type: SET_PHOTOS,
			photos,
		})
	} catch (err) {
		console.log('Cannot load photos', err)
		throw err
	}
}

export async function prevPhotos() {
	console.log('herro action prev')
}

export async function nextPhotos() {
	console.log('herro action next')
}
