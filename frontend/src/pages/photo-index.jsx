import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadPhotos } from '../store/photo.actions.js'
import { PhotoList } from '../components/photo-list.jsx'
import { PhotoDetails } from '../components/photo-details.jsx'

export function PhotoIndex() {
	const photos = useSelector((storeState) => storeState.photoModule.photos)
	const [photo, setPhoto] = useState({})
	const [filterBy, setFilterBy] = useState({ category: 'dogs', pageNumber: 1 })
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
	const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
	const categories = ['Animals', 'Dogs', 'Cats', 'Sport', 'Work', 'Clowns']

	useEffect(() => {
		loadPhotos(filterBy)
	}, [filterBy])

	function onToggleModal(modalType) {
		switch (modalType) {
			case 'category':
				setIsCategoryModalOpen(!isCategoryModalOpen)
				break
			case 'photo':
				setIsPhotoModalOpen(!isPhotoModalOpen)
				break

			default:
				break
		}
	}

	function onToggleCategoryModal() {
		setIsCategoryModalOpen(!isCategoryModalOpen)
	}

	function onCategoryChoice(categoryChoice) {
		console.log(categoryChoice)
		setFilterBy((prevFilter) => ({ ...prevFilter, category: categoryChoice }))
		setIsCategoryModalOpen(false)
	}

	function onPageChange(diff) {
		if (filterBy.pageNumber === 1 && diff === -1) return
		// if (filterBy.pageNumber === 5 && diff === +1) return
		setFilterBy((prevFilter) => ({
			...prevFilter,
			pageNumber: prevFilter.pageNumber + diff,
		}))
	}

	function onPhoto(photoId) {
		console.log('herro photo', photoId)
		const currentPhoto = photos.find((photo) => photo.id === photoId)
		setPhoto(currentPhoto)
		setIsPhotoModalOpen(true)
	}

	return (
		<div className="photo-index">
			<section className="photo-actions">
				<button onClick={() => onPageChange(-1)}>Prev</button>
				<button onClick={() => onToggleModal('category')}>Categories</button>
				{/* <button onClick={onToggleCategoryModal}>Categories</button> */}
				<button onClick={() => onPageChange(+1)}>Next</button>
			</section>
			<section className="photo-container">
				<PhotoList photos={photos} onPhoto={onPhoto} />
			</section>
			{isCategoryModalOpen && (
				<div className="modal-overlay">
					<div className="category-modal">
						<button onClick={onToggleCategoryModal} className="close-modal">
							X
						</button>
						<span>Select Category:</span>
						<ul className="clean-list category-list">
							{categories.map((cat) => (
								<li
									onClick={() => onCategoryChoice(cat)}
									className="category-item"
									key={cat}
								>
									{cat}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
			{
				isPhotoModalOpen && (
					<PhotoDetails photo={photo} onToggleModal={onToggleModal} />
				)
				// (
				// 	<div className="modal-overlay">
				// 		<div className="photo-modal">
				// 			<button
				// 				onClick={() => onToggleModal('photo')}
				// 				className="close-modal"
				// 			>
				// 				X
				// 			</button>
				// 			<span>Picture Data</span>
				// 		</div>
				// 	</div>
				// )
			}
			<span className="page-number">{filterBy.pageNumber}</span>
		</div>
	)
}
