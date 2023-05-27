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
	const [searchCriteria, setSearchCriteria] = useState({
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
		loadPhotos(searchCriteria)
	}, [searchCriteria])

	const totalPages = Math.ceil(totalHits / 9)

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
		setSearchCriteria((prevCriteria) => ({
			...prevCriteria,
			category: categoryChoice,
		}))
		setIsCategoryModalOpen(false)
	}

	function onSort({ target }) {
		let { value, name: field } = target
		setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [field]: value }))
	}

	function onPageChange(selectedPage) {
		setSearchCriteria((prevCriteria) => ({
			...prevCriteria,
			pageNumber: selectedPage,
		}))
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
				currentPage={searchCriteria.pageNumber}
				totalPages={totalPages}
				onToggleModal={onToggleModal}
				onSort={onSort}
				categoryBtn={categoryBtn}
				isCategoryModalOpen={isCategoryModalOpen}
			/>
			<section className="photos-container">
				<PhotoList photos={photos} onPhoto={onPhoto} />
			</section>
			{isCategoryModalOpen && (
				<CategoryModal
					refDataBtn={refDataBtn}
					categories={categories}
					onToggleModal={onToggleModal}
					onCategoryChoice={onCategoryChoice}
					currentCategory={searchCriteria.category}
				/>
			)}
			{isPhotoModalOpen && (
				<PhotoDetails photo={photo} onToggleModal={onToggleModal} />
			)}
			<Pagination
				count={totalPages}
				defaultPage={1}
				page={searchCriteria.pageNumber}
				onChange={(event, value) => onPageChange(value)}
				hideNextButton={true}
				hidePrevButton={true}
				siblingCount={1}
				boundaryCount={1}
				className="pagination"
			/>
		</div>
	)
}
