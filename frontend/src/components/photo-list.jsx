import { Grow } from '@mui/material'
import { PhotoPreview } from './photo-preview'

export function PhotoList({ photos, onPhoto }) {
	return (
		<ul className="photo-list clean-list">
			{photos.map((photo) => (
				<Grow in={true} timeout={500} appear={true} key={photo.id}>
					<li
						onClick={() => onPhoto(photo.id)}
						className="photo-preview"
						key={photo.id}
					>
						<PhotoPreview photo={photo} />
					</li>
				</Grow>
			))}
		</ul>
	)
}
