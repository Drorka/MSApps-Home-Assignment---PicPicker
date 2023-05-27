import { httpService } from './http.service.js'

const STORAGE_KEY = 'photo'

export const photoService = {
	query,
}
window.cs = photoService

async function query(category) {
	try {
		return await httpService.get(STORAGE_KEY, category)
	} catch (err) {
		console.error('Failed to get photos (service)')
		throw err
	}
}
