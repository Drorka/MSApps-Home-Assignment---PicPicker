import { useEffect } from 'react'

export function useClickOutside(ref, callback, modalType) {
	function handleClick(e) {
		if (ref.current && !ref.current.contains(e.target)) {
			callback(modalType)
		}
	}
	useEffect(() => {
		document.onmousedown = (ev) => {
			handleClick(ev)
		}
		return () => {
			document.onmousedown = null
		}
	}, [])
}
