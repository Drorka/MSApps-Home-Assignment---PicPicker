import { useState, useEffect, useRef } from 'react'
import { useClickOutside } from '../customHooks/is-clicked-outside'

import CloseIcon from '@mui/icons-material/Close'

export function CategoryModal({
	categories,
	onToggleModal,
	onCategoryChoice,
	refDataBtn,
}) {
	const modalRef = useRef(null)
	const [modalStyle, setModalStyle] = useState(false)
	const [modalHeight, setModalHeight] = useState()

	useEffect(() => {
		setModalStyle(true)
		setModalHeight(modalRef.current.getBoundingClientRect().height)
	}, [modalStyle])

	useClickOutside(modalRef, onToggleModal, 'category')

	function getModalPos(refDataBtn) {
		const rect = refDataBtn.current.getBoundingClientRect()

		let topModal = rect.height + 20
		let bottomModal = ''
		let leftModal = rect.left
		let rightModal = rect.right
		let position = 'absolute'

		if (window.innerHeight < rect.top + modalHeight) {
			topModal = ''
			bottomModal = 10
		}

		if (window.innerWidth < rect.left + 304) {
			leftModal = ''
			rightModal = 20
		}

		let modalPos = {
			bottom: bottomModal,
			top: topModal,
			left: leftModal,
			right: rightModal,
			position: position,
		}

		return modalPos
	}

	return (
		<section
			className="modal-wrapper"
			style={getModalPos(refDataBtn)}
			ref={modalRef}
		>
			<div className="category-modal">
				{/* <CloseIcon
					onClick={() => onToggleModal('category')}
					className="close-modal"
				/> */}
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
		</section>
	)
}
