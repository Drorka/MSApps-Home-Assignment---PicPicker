import { httpService } from './http.service.js'

const STORAGE_KEY = 'photos'

export const photoService = {
	query,
}
window.cs = photoService

async function query(searchCriteria) {
	try {
		return await httpService.get(STORAGE_KEY, searchCriteria)
	} catch (err) {
		console.error('Failed to get photos (service)')
		throw err
	}
}
