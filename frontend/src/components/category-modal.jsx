import { useState, useEffect, useRef } from 'react'
import { useClickOutside } from '../customHooks/is-clicked-outside'

export function CategoryModal({
	categories,
	onToggleModal,
	onCategoryChoice,
	refDataBtn,
	currentCategory,
}) {
	const modalRef = useRef(null)
	const [modalStyle, setModalStyle] = useState(false)
	const [modalHeight, setModalHeight] = useState()

	useEffect(() => {
		setModalStyle(true)
		setModalHeight(modalRef.current.getBoundingClientRect().height)
	}, [modalStyle])

	useClickOutside(modalRef, onToggleModal, 'category')

	// Position the modal based on the button position
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

	function isSelected(category) {
		if (currentCategory === category) {
			return 'selected'
		} else {
			return ''
		}
	}

	return (
		<div className="modal-overlay">
			<section
				className="modal-wrapper"
				style={getModalPos(refDataBtn)}
				ref={modalRef}
			>
				<div className="category-modal">
					<ul className="clean-list category-list">
						{categories.map((category) => (
							<li
								onClick={() => onCategoryChoice(category)}
								className={`category-item ${isSelected(category)}`}
								key={category}
							>
								{category}
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	)
}
