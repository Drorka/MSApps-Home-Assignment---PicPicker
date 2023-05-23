import { PhotoPreview } from './photo-preview'

export function PhotoList({ photos }) {
	return (
		<ul className="photo-list clean-list">
			{photos.map((photo) => (
				<li className="photo-preview" key={photo._id}>
					<PhotoPreview photo={photo} />
				</li>
			))}
		</ul>
	)
}
