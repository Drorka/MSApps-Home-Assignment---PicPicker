import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AppHeader } from './components/app-header'
import { PhotoIndex } from './pages/photo-index'

export function RootCmp() {
	return (
		<div>
			<AppHeader />
			<main className="main-container">
				<Routes>
					<Route key="/" exact={true} element={<PhotoIndex />} path="/" />
				</Routes>
			</main>
		</div>
	)
}
