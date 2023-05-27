export function PhotoPreview({ photo }) {
	return <img src={photo.webformatURL} alt={photo.tags} className="preview" />
}
