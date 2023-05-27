import { photoService } from '../services/photo.service.js'
import { store } from '../store/store.js'
import { SET_PHOTOS } from './photo.reducer.js'
import { toast } from 'react-hot-toast'

export async function loadPhotos(searchCriteria) {
	try {
		const { photos, totalHits } = await photoService.query(searchCriteria)
		store.dispatch({
			type: SET_PHOTOS,
			photos,
			totalHits,
		})
	} catch (err) {
		toast.error('Something went wrong, please try again later')
	}
}
