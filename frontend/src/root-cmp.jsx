import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './components/app-header'
import { HomePage } from './pages/home-page.jsx'

export function RootCmp() {
	return (
		<div>
			<AppHeader />
			<main>
				<Routes>
					<Route key="/" exact={true} element={<HomePage />} path="/" />
				</Routes>
			</main>
		</div>
	)
}
