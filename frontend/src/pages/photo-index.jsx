import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadPhotos } from '../store/photo.actions.js'
import { PhotoList } from '../components/photo-list.jsx'

export function PhotoIndex() {
	const photos = useSelector((storeState) => storeState.photoModule.photos)

	useEffect(() => {
		loadPhotos()
	}, [])

	return (
		<div className="photo-index">
			<section className="photo-actions">
				<button>Prev</button>
				<button>Categories</button>
				<button>Next</button>
			</section>
			<section className="photo-container">
				<PhotoList photos={photos} />
			</section>
		</div>
	)
}
