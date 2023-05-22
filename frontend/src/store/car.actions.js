// import { carService } from '../services/car.service.local.js'
import { carService } from '../services/car.service.js'
import { store } from '../store/store.js'
import { ADD_CAR, REMOVE_CAR, SET_CARS, UPDATE_CAR } from './car.reducer.js'

// Action Creators:
export function getActionRemoveCar(carId) {
	return {
		type: REMOVE_CAR,
		carId,
	}
}
export function getActionAddCar(car) {
	return {
		type: ADD_CAR,
		car,
	}
}
export function getActionUpdateCar(car) {
	return {
		type: UPDATE_CAR,
		car,
	}
}

export async function loadCars() {
	try {
		const cars = await carService.query()
		console.log('Cars from DB:', cars)
		store.dispatch({
			type: SET_CARS,
			cars,
		})
	} catch (err) {
		console.log('Cannot load cars', err)
		throw err
	}
}

export async function removeCar(carId) {
	try {
		await carService.remove(carId)
		store.dispatch(getActionRemoveCar(carId))
	} catch (err) {
		console.log('Cannot remove car', err)
		throw err
	}
}

export async function addCar(car) {
	try {
		const savedCar = await carService.save(car)
		console.log('Added Car', savedCar)
		store.dispatch(getActionAddCar(savedCar))
		return savedCar
	} catch (err) {
		console.log('Cannot add car', err)
		throw err
	}
}

export function updateCar(car) {
	return carService
		.save(car)
		.then((savedCar) => {
			console.log('Updated Car:', savedCar)
			store.dispatch(getActionUpdateCar(savedCar))
			return savedCar
		})
		.catch((err) => {
			console.log('Cannot save car', err)
			throw err
		})
}
