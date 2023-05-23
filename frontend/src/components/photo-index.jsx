import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadPhotos } from '../store/photo.actions.js'
import { PhotoList } from './photo-list.jsx'

export function PhotoIndex() {
	const photos = useSelector((storeState) => storeState.photoModule.photos)

	useEffect(() => {
		loadPhotos()
	}, [])

	return (
		<section className="photo-container">
			<PhotoList photos={photos} />
		</section>
	)
}
