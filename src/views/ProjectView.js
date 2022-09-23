import React, { useState } from 'react';
import { sortTasks } from '../store/slices/tasks';
import moment from "moment";
import SearchHeader from '../components/SearchHeader';
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
    category_id: 2,
    starting_time: moment('2022-09-12 15:00:00'),
    deadline: moment('2022-09-23 15:00:00'),
    estimated_duration: 5,
		actual_duration: 8,
		status: 3,
  },
];


function ProjectView() {
	const [tasks, setTasks] = useState(data);
	const options = ["Edit", "Delete"];
	
	const onSearch = (event) => {
		const searchPhrase = event.target.value.toLowerCase();
		const filteredTasks = data.filter((task) => {
			if (
				task.description.toLowerCase().includes(searchPhrase)
				// ||task.category_id.toLowerCase().includes(searchPhrase)
			) {
				return true;
			}
			return false;
		});
		setTasks(filteredTasks);
	}


	return (
		<div className="page-container tasks-view">
			<SearchHeader
				onSearch={onSearch}
				sort={(sortBy) => setTasks(sortTasks(tasks, sortBy))}
				options={
					options.map((option, index) =>
						<button type="button" className="btn option" key={index}>
							{option}
						</button>)
				}
			/>
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

export default ProjectView;