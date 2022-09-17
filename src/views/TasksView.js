import React,{useState} from 'react'
import {
	FaAngleDown, FaAngleUp,FaPlus
} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import Task from '../components/Task';

const data = [
  {
    id: 1,
    description: 'Orem ipsum dolor sit amet, consectetur adipiscing elit.',
    category_id: 0,
    starting_time: moment('2022-09-013 14:00:00'),
    deadline: moment('2022-09-18 14:00:00'),
    estimated_duration: 5,
		actual_duration: 8,
		status: 1,
  },
  {
    id: 2,
    description: 'Morbi id finibus augue, nec tristique elit,',
    category_id: 1,
    starting_time: moment('2022-010-09 14:00:00'),
    deadline: moment('2022-10-19 14:00:00'),
    estimated_duration: 5,
		actual_duration: 8,
		status: 2,
  },
  {
    id: 3,
    description: 'Vivamus et accumsan tortor, vel dictum eli',
    category_id: 1,
    starting_time: moment('2022-09-12 15:00:00'),
    deadline: moment('2022-09-23 15:00:00'),
    estimated_duration: 5,
		actual_duration: 8,
		status: 3,
  },
];

const SORTING_OPTIONS = {
	STARTING_DATE: 0,
	PROJECT: 1
}

function TasksView() {
	const [search, setSearch] = useState("");
	const [sortOptions, showSortOptions] = useState(false);
	const [sortedBy, setSort] = useState(SORTING_OPTIONS.STARTING_DATE)
	const [tasks, setTasks] = useState(data);
	const dispatch = useDispatch();

	const onSearch = (event) => {
		const searchPhrase = event.target.value.toLowerCase();
		setSearch(event.target.value);
		const filteredTasks = data.filter((task) => {
			if (
				task.description.toLowerCase().includes(searchPhrase) ||
				task.category.toLowerCase().includes(searchPhrase)
			) {
				return true;
			}
			return false;
		});
		setTasks(filteredTasks);
	}

	const sortTasks = (sortBy) => {
		showSortOptions(false);
		const tasksCopy = [...tasks];
		switch (sortBy) {
			case SORTING_OPTIONS.STARTING_DATE:
				tasksCopy.sort((taskA, taskB) =>
						new Date(taskA.starting_time) -
						new Date(taskB.starting_time)
				);
				setSort(SORTING_OPTIONS.STARTING_DATE)
				break;
			case SORTING_OPTIONS.PROJECT:
				tasksCopy.sort((taskA, taskB) =>
					taskA.category.localeCompare(taskB.category)
				);
				setSort(SORTING_OPTIONS.STARTING_DATE)
		}

		setTasks(tasksCopy);
	}

	return (
		<div className="page-container tasks-view">
			<header>
				<div className="row">
					<div>
						<h3 className="title">TASKS</h3>
					</div>
					
					<div className="search-bar">
						<input
							type="text"
							value={search}
							onChange={onSearch}
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
							onClick={() => {
								sortTasks(SORTING_OPTIONS.STARTING_DATE);
							}}
						>
							Starting date
						</button>
						<button
							type="button"
							className="btn transparent-btn"
							onClick={() => {
								sortTasks(SORTING_OPTIONS.PROJECT);
							}}
						>
							Project
						</button>
					</div>
				</div>
			</header>
			<main>
				{ tasks.length > 0 ? 
					tasks.map(task => <Task task={task} key={task.id} />) :
					<div className="no-tasks">
						<img src={require("../assets/images/no-tasks.png")} />
						<span>No tasks found...</span>
					</div>
				}
			</main>
		</div>
	)
}

export default TasksView