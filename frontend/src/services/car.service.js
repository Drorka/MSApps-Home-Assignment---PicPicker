import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'car'

export const carService = {
	query,
	getById,
	save,
	remove,
	getEmptyCar,
}
window.cs = carService

async function query(filterBy = { txt: '', price: 0 }) {
	try {
		return await httpService.get(STORAGE_KEY, filterBy)
	} catch (err) {
		console.log('Failed to get cars (service)')
		throw err
	}
}

async function getById(carId) {
	try {
		return await httpService.get(`car/${carId}`)
	} catch (err) {
		console.log('Failed to get car (service)')
		throw err
	}
}

async function remove(carId) {
	try {
		return await httpService.delete(`car/${carId}`)
	} catch (err) {
		console.log('Failed to remove car (service)')
		throw err
	}
}

async function save(car) {
	var savedCar
	try {
		if (car._id) {
			savedCar = await httpService.put(`car/${car._id}`, car)
		} else {
			savedCar = await httpService.post('car', car)
		}
		return savedCar
	} catch (err) {
		console.log('Failed to save car (service)')
		throw err
	}
}

function getEmptyCar() {
	return {
		vendor: 'Susita-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1000, 9000),
	}
}
