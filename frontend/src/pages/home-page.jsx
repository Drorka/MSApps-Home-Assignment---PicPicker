import React from 'react'
import { PhotoIndex } from '../components/photo-index'

export function HomePage() {
	return (
		<section className="home-page">
			<h1>Welcome to PicPicker!</h1>
			<section>
				<section className="top-btns">
					<button>Prev</button>
					<button>Categories</button>
					<button>Next</button>
				</section>
				<PhotoIndex />
			</section>
		</section>
	)
}
