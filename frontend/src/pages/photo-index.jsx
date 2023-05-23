import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadPhotos, prevPhotos, nextPhotos } from '../store/photo.actions.js'
import { PhotoList } from '../components/photo-list.jsx'

export function PhotoIndex() {
	const photos = useSelector((storeState) => storeState.photoModule.photos)

	useEffect(() => {
		loadPhotos()
	}, [])

	function onPrev() {
		console.log('hi prev')
		prevPhotos()
	}

	function onNext() {
		console.log('hi prev')
		nextPhotos()
	}

	return (
		<div className="photo-index">
			<section className="photo-actions">
				<button onClick={onPrev}>Prev</button>
				<button>Categories</button>
				<button onClick={onNext}>Next</button>
			</section>
			<section className="photo-container">
				<PhotoList photos={photos} />
			</section>
		</div>
	)
}
