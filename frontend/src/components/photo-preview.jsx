export function PhotoPreview({ photo }) {
	return <img src={photo.previewURL} alt="photo" className="preview" />
}
