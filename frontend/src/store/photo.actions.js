import { photoService } from '../services/photo.service.js'
import { store } from '../store/store.js'
import { SET_PHOTOS } from './photo.reducer.js'

export async function loadPhotos(filterBy) {
	try {
		const photos = await photoService.query(filterBy)
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
