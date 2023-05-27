import { httpService } from './http.service.js'

export const photoService = {
	query,
}

async function query(searchCriteria) {
	try {
		return await httpService.get('photos', searchCriteria)
	} catch (error) {
		console.error('Failed to get photos')
		throw error
	}
}
