import { createStore, combineReducers } from 'redux'

import { photoReducer } from './photo.reducer.js'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
	photoModule: photoReducer,
	systemModule: systemReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
	: undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
	console.log('**** Store state changed: ****')
	console.log('storeState:\n', store.getState())
	console.log('*******************************')
})
