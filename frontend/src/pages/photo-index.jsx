import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadPhotos } from '../store/photo.actions.js'
import { PhotoList } from '../components/photo-list.jsx'
import { PhotoDetails } from '../components/photo-details.jsx'
import { CategoryModal } from '../components/category-modal.jsx'
import { PhotosActions } from '../components/photos-actions.jsx'
import Pagination from '@mui/material/Pagination'
import Loader from '../assets/img/loader.svg'
import { Toaster } from 'react-hot-toast'

export function PhotoIndex() {
	const photos = useSelector((storeState) => storeState.photoModule.photos)
	const totalHits = useSelector(
		(storeState) => storeState.photoModule.totalHits
	)
	const isLoading = useSelector(
		(storeState) => storeState.systemModule.isLoading
	)
	const [photo, setPhoto] = useState({})
	const [filterBy, setFilterBy] = useState({
		category: 'backgrounds',
		pageNumber: 1,
		order: 'popular',
	})
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
	const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
	const categories = [
		'backgrounds',
		'fashion',
		'nature',
		'science',
		'education',
		'feelings',
		'health',
		'people',
		'religion',
		'places',
		'animals',
		'industry',
		'computer',
		'food',
		'sports',
		'transportation',
		'travel',
		'buildings',
		'business',
		'music',
	]

	useEffect(() => {
		loadPhotos(filterBy)
	}, [filterBy])

	const totalPages = Math.trunc(totalHits / 9)

	// for modal
	const categoryBtn = useRef()
	const refDataBtn = categoryBtn

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

	function onSort({ target }) {
		let { value, name: field } = target
		setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

	// Users can navigate between pages by using the 'Prev' & 'Next' buttons, or by selecting a specific page.
	// Prev & Next buttons send the function a value of -1 or +1 accordingly.
	// If one of those values is sent, the function updates the Filter by adding or subtracting 1 from the page number, thus creating a new data call.
	// Selecting a specific page sends the event to the function.
	// The function turns the button text into a number, and updates the filter by changing the page number.
	function onPageChange(pageAction) {
		if (pageAction === 1 || pageAction === -1) {
			if (filterBy.pageNumber === 1 && pageAction === -1) return
			setFilterBy((prevFilter) => ({
				...prevFilter,
				pageNumber: prevFilter.pageNumber + pageAction,
			}))
		} else {
			let selectedPage = +pageAction.target.innerText
			setFilterBy((prevFilter) => ({
				...prevFilter,
				pageNumber: selectedPage,
			}))
		}
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
			<Toaster />
			<PhotosActions
				onPageChange={onPageChange}
				onToggleModal={onToggleModal}
				onSort={onSort}
				categoryBtn={categoryBtn}
				isCategoryModalOpen={isCategoryModalOpen}
			/>
			<section className="photos-container">
				<PhotoList photos={photos} onPhoto={onPhoto} />
				{/* <Grow>
					<PhotoList photos={photos} onPhoto={onPhoto} />
				</Grow> */}
			</section>
			{isCategoryModalOpen && (
				<div className="modal-overlay">
					<CategoryModal
						refDataBtn={refDataBtn}
						categories={categories}
						onToggleModal={onToggleModal}
						onCategoryChoice={onCategoryChoice}
						currentCategory={filterBy.category}
					/>
				</div>
			)}
			{isPhotoModalOpen && (
				<div className="modal-overlay">
					<PhotoDetails photo={photo} onToggleModal={onToggleModal} />
				</div>
			)}
			<Pagination
				count={totalPages}
				defaultPage={1}
				page={filterBy.pageNumber}
				onChange={(event) => onPageChange(event)}
				hideNextButton={true}
				hidePrevButton={true}
				siblingCount={1}
				boundaryCount={1}
				className="pagination"
			/>
		</div>
	)
}
