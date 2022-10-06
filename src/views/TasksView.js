import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { sortTasks } from '../store/slices/tasks';
import Task from '../components/Task';
import SearchHeader from '../components/SearchHeader';
import Spinner from '../components/Spinner';

function TasksView() {
	const tasksStore = useSelector(state => state.tasks)
	const [tasks, setTasks] = useState(tasksStore.tasks);
	const [typingTimeout, setTypingTimeout] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setTasks(tasksStore.tasks);
	}, [tasksStore.tasks]);


	const search = (searchPhrase) => {
		setTypingTimeout(setTimeout(() => {
			const filteredTasks = tasksStore.tasks.filter((task) => {
				if (
					task.description.toLowerCase().includes(searchPhrase)
						// ||task.category_id.toLowerCase().includes(searchPhrase)
					) {
						return true;
					}
						return false;
				}
			);
			console.log(filteredTasks.length)
			setTasks(filteredTasks);
			setLoading(false);
		}, 1000))
	}

	const onSearch = (searchPhrase) => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
		if (!loading) {
			setLoading(true);
		}
		search(searchPhrase);
	}

	return (
		<div className="page-container tasks-view">
			<SearchHeader
				onSearch={onSearch}
				title="Tasks"
				sort={(sortBy) => setTasks(sortTasks(sortBy,tasks))}
				newTaskRoute="/task/new"
			/>
			{tasksStore.loading || loading ?
				<main className="spinner-container">
					<Spinner className="spinner-medium"/>
				</main> :
				<main>
					{ tasks.length > 0 ? 
						tasks.map((task, index) => <Task task={task} key={index} />) :
						<div className="no-tasks">
							<img src={require("../assets/images/no-tasks.png")} />
							<span>No tasks found...</span>
						</div>
					}
				</main>
			}
			
		</div>
	)
}

export default TasksView