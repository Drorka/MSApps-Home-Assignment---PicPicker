import { useRef } from 'react'
import { useClickOutside } from '../customHooks/is-clicked-outside'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'

export function PhotoDetails({ photo, onToggleModal }) {
	let { downloads, views, collections } = photo
	const formattedDownloads = downloads.toLocaleString('en-US')
	const formattedViews = views.toLocaleString('en-US')
	const formattedCollections = collections.toLocaleString('en-US')
	const modalRef = useRef(null)

	useClickOutside(modalRef, onToggleModal, 'photo')

	return (
		<div className="photo-modal" ref={modalRef}>
			<CloseIcon
				onClick={() => onToggleModal('photo')}
				className="close-modal"
			/>
			<section className="photo-data">
				<section className="data-numbers">
					<div className="data-group">
						<span className="data-icon">
							<DownloadForOfflineIcon />
						</span>
						<div className="data-sub-group">
							<span className="data-number">{formattedDownloads}</span>
							<span className="data-title">Downloads</span>
						</div>
					</div>
					<div className="data-group">
						<span className="data-icon">
							<VisibilityIcon />
						</span>
						<div className="data-sub-group">
							<span className="data-number">{formattedViews}</span>
							<span className="data-title">Views</span>
						</div>
					</div>
					<div className="data-group">
						<span className="data-icon">
							<CollectionsBookmarkIcon />
						</span>
						<div className="data-sub-group">
							<span className="data-number">{formattedCollections}</span>
							<span className="data-title">Collections</span>
						</div>
					</div>
				</section>
				<img src={photo.largeImageURL} alt={photo.tags} />
			</section>
		</div>
	)
}
