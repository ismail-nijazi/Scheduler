import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
	FaAngleDown,
	FaAngleUp,
	FaPlus,
	FaEllipsisV
} from "react-icons/fa";
import { SORTING_OPTIONS } from "../store/slices/tasks";

function SearchHeader({ onSearch, sort, options }) {
	const [search, setSearch] = useState("");
	const [sortOptions, showSortOptions] = useState(false);
	const [optionsVisibility, showOptions] = useState(false);

	const onSort = (sortBy)=>{
		showSortOptions(false);
		sort(sortBy);
	}

	return (
		<header className="search-header">
			<div className="row">
				<div>
					<h3 className="title">TASKS {
							options &&
							<button
								className="btn options-btn"
								onClick={() => showOptions(!optionsVisibility)}>
								<FaEllipsisV />
							</button>
						}
						
						{optionsVisibility && <div className="options">{options}</div>}
					</h3>
				</div>
				<div className="search-bar">
					<input
						type="text"
						value={search}
						onChange={(event) => {
							setSearch(event.target.value);
							onSearch(event.target.value.toLowerCase());
						}}
						placeholder="search"
					/>
					<Link
						to="/task/new"
						className="add-btn" 
					>
						<FaPlus size={20} />
					</Link>
				</div>
			</div>
			<div className="row filter">
				<button
					className="btn transparent-btn row"
					onClick={() => showSortOptions(!sortOptions)}
				>
					<span>Sort by</span>
					{!sortOptions ?
						<FaAngleDown size={24} /> :
						<FaAngleUp size={24} />
					}
				</button>
				<div className={sortOptions ? 'options' : 'options hide'}>
					<button
						type="button"
						className="btn transparent-btn"
						onClick={() => onSort(SORTING_OPTIONS.STARTING_DATE)}
					>
						Starting date
					</button>
					<button
						type="button"
						className="btn transparent-btn"
						onClick={() => onSort(SORTING_OPTIONS.PROJECT)}
					>
						Project
					</button>
				</div>
			</div>
		</header>
	)
}

export default SearchHeader;