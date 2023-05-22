import { Fragment } from 'react'

export function CarPreview({ car }) {
	return (
		<Fragment>
			<h4>{car.vendor}</h4>
			<p>
				Price: <span>${car.price.toLocaleString()}</span>
			</p>
			<p>
				Owner: <span>{car.owner && car.owner.fullname}</span>
			</p>
		</Fragment>
	)
}
