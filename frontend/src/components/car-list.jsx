import { CarPreview } from '../cmps/car-preview'

export function CarList({ cars, onRemoveCar, onUpdateCar }) {
	return (
		<ul className="car-list clean-list">
			{cars.map((car) => (
				<li className="car-preview" key={car._id}>
					<CarPreview car={car} />
					<div className="car-preview-actions">
						<button
							onClick={() => {
								onRemoveCar(car._id)
							}}
						>
							x
						</button>
						<button
							onClick={() => {
								onUpdateCar(car)
							}}
						>
							Edit
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}
