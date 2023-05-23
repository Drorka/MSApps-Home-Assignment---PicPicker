import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import VisibilityIcon from '@mui/icons-material/Visibility'

export function PhotoDetails({ photo, onToggleModal }) {
	let { downloads, views, collections } = photo

	const formattedDownloads = downloads.toLocaleString('en-US')
	const formattedViews = views.toLocaleString('en-US')
	const formattedCollections = collections.toLocaleString('en-US')

	return (
		<div className="modal-overlay">
			<div className="photo-modal">
				<button onClick={() => onToggleModal('photo')} className="close-modal">
					X
				</button>
				<section className="photo-data">
					<section className="data-numbers">
						<div className="data-group">
							<span>
								<DownloadForOfflineIcon />
							</span>
							<div className="data-sub-group">
								<span>{formattedDownloads}</span>
								<span>Downloads</span>
							</div>
						</div>
						<div className="data-group">
							<VisibilityIcon />
							<div className="data-sub-group">
								<span>{formattedViews}</span>
								<span>Views</span>
							</div>
						</div>
						<div className="data-group">
							<CollectionsBookmarkIcon />
							<div className="data-sub-group">
								<span>{formattedCollections}</span>
								<span>Collections</span>
							</div>
						</div>
					</section>
					<img src={photo.largeImageURL} alt={photo.tags} />
				</section>
			</div>
		</div>
	)
}
