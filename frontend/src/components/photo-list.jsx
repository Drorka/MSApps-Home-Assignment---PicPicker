import { PhotoPreview } from './photo-preview'

export function PhotoList({ photos, onPhoto }) {
	return (
		<ul className="photo-list clean-list">
			{photos.map((photo) => (
				<li
					onClick={() => onPhoto(photo.id)}
					className="photo-preview"
					key={photo.id}
				>
					<PhotoPreview photo={photo} />
				</li>
			))}
		</ul>
	)
}
