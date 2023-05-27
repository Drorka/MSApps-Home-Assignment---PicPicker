import React from 'react'
import { Button, Stack } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export function PhotosActions({
	onPageChange,
	onToggleModal,
	onSort,
	categoryBtn,
	isCategoryModalOpen,
}) {
	const categoryButtonDirection = isCategoryModalOpen ? (
		<ExpandLessIcon />
	) : (
		<ExpandMoreIcon />
	)

	return (
		<section className="photos-actions">
			<Stack spacing={2} direction="row" className="actions-container">
				<Button
					onClick={() => onPageChange(-1)}
					variant="contained"
					startIcon={<ArrowBackIosNewRoundedIcon />}
					className="page-btn"
				>
					Prev
				</Button>
				<Button
					onClick={() => onToggleModal('category')}
					ref={categoryBtn}
					variant="contained"
					endIcon={categoryButtonDirection}
					className="category-btn"
				>
					Categories
				</Button>

				<FormControl sx={{ m: 2, minWidth: 120 }} size="small">
					<InputLabel id="sort-select-label">Sort By</InputLabel>
					<Select
						labelId="sort-select-label"
						id="sort-select"
						label="Sort By"
						name="order"
						onChange={onSort}
					>
						<MenuItem value="popular">Popularity</MenuItem>
						<MenuItem value="latest">Date</MenuItem>
					</Select>
				</FormControl>

				<Button
					onClick={() => onPageChange(+1)}
					variant="contained"
					endIcon={<ArrowForwardIosRoundedIcon />}
					className="page-btn"
				>
					Next
				</Button>
			</Stack>
		</section>
	)
}
