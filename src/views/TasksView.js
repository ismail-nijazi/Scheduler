import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import moment from "moment";
import { sortTasks } from '../store/slices/tasks';
import Task from '../components/Task';
import SearchHeader from '../components/SearchHeader';

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

function TasksView() {
	const [tasks, setTasks] = useState(data);
	const dispatch = useDispatch();

	const onSearch = (searchPhrase) => {
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
				sort={(sortBy) => setTasks(sortTasks(tasks, sortBy))} />
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