import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadPhotos } from '../store/photo.actions.js'
import { PhotoList } from '../components/photo-list.jsx'
import { PhotoDetails } from '../components/photo-details.jsx'
import Loader from '../assets/img/loader.svg'
import { CategoryModal } from '../components/category-modal.jsx'

export function PhotoIndex() {
	const photos = useSelector((storeState) => storeState.photoModule.photos)
	const isLoading = useSelector(
		(storeState) => storeState.systemModule.isLoading
	)
	const [photo, setPhoto] = useState({})
	const [filterBy, setFilterBy] = useState({
		category: 'dogs',
		pageNumber: 1,
		order: 'popular',
	})
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
	const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
	const categories = ['Animals', 'Dogs', 'Cats', 'Sport', 'Work', 'Clowns']

	useEffect(() => {
		loadPhotos(filterBy)
	}, [filterBy])

	// for modal
	const categoryBtn = useRef()
	const refDataBtn = categoryBtn
	console.log('refDataBtn', refDataBtn)

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

	function onCategoryChoice(categoryChoice) {
		setFilterBy((prevFilter) => ({ ...prevFilter, category: categoryChoice }))
		setIsCategoryModalOpen(false)
	}

	function onPageChange(diff) {
		if (filterBy.pageNumber === 1 && diff === -1) return
		setFilterBy((prevFilter) => ({
			...prevFilter,
			pageNumber: prevFilter.pageNumber + diff,
		}))
	}

	function onSort({ target }) {
		let { value, name: field } = target
		console.log(value)
		setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

	function onPhoto(photoId) {
		const currentPhoto = photos.find((photo) => photo.id === photoId)
		setPhoto(currentPhoto)
		setIsPhotoModalOpen(true)
	}

	if (isLoading)
		return (
			<div className="loader-wrapper">
				<img className="loader" src={Loader} alt="loader" />
			</div>
		)

	return (
		<div className="photo-index">
			<section className="photo-actions">
				<button onClick={() => onPageChange(-1)}>Prev</button>
				<button onClick={() => onToggleModal('category')} ref={categoryBtn}>
					Categories
				</button>
				<select onChange={onSort} name="order" className="sorting">
					<option value="popular">Popularity</option>
					<option value="latest">Date</option>
				</select>
				<button onClick={() => onPageChange(+1)}>Next</button>
			</section>
			<section className="photo-container">
				<PhotoList photos={photos} onPhoto={onPhoto} />
			</section>
			{isCategoryModalOpen && (
				<div className="modal-overlay">
					<CategoryModal
						refDataBtn={refDataBtn}
						categories={categories}
						onToggleModal={onToggleModal}
						onCategoryChoice={onCategoryChoice}
					/>
				</div>
			)}
			{isPhotoModalOpen && (
				<div className="modal-overlay">
					<PhotoDetails photo={photo} onToggleModal={onToggleModal} />
				</div>
			)}
			<span className="page-number">{filterBy.pageNumber}</span>
		</div>
	)
}
