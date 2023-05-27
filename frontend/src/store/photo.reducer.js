export const SET_PHOTOS = 'SET_PHOTOS'

const initialState = {
	photos: [],
	totalHits: 0,
}

export function photoReducer(state = initialState, action) {
	var newState = state
	switch (action.type) {
		case SET_PHOTOS:
			newState = {
				...state,
				photos: action.photos,
				totalHits: action.totalHits,
			}
			break
		default:
	}
	return newState
}
