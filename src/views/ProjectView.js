import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { sortTasks,getProjects } from '../store/slices/tasks';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import SearchHeader from '../components/SearchHeader';
import Task from '../components/Task'
import PopupQuestion from '../components/PopupQuestion';
import { projects } from "../services/database";

function ProjectView() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const tasksStore = useSelector(state => state.tasks);
 	const [tasks, setTasks] = useState(tasksStore.tasksPerProject.tasks);
	const [deleteConfirm, showConfirmation] = useState(false);

	useEffect(() => {
		setTasks(tasksStore.tasksPerProject.tasks);
	},[tasksStore.tasksPerProject])
	
	const onSearch = (event) => {
		const searchPhrase = event.target.value.toLowerCase();
		const filteredTasks = tasksStore.tasksPerProject.tasks.filter((task) => {
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

	const renderOptions = () => {
		return (
			<>
				<button
					type="button"
					className="btn option"
					onClick={() => navigate("/project/edit")}
				>
				Edit				
			</button>
			<button
				type="button"
				className="btn option"
				onClick={() => showConfirmation(true)}
			>
				Delete			
			</button>
		</>)
	}

	return (
		<div className="page-container tasks-view">
			<PopupQuestion
				title={"Delete task"}
				alert={
					<span
						className="warning"
					>
						All tasks in this project will be removed!
					</span>}
				text="Are you sure you want to delet this project?"
				visible={deleteConfirm}
				onClose={() => showConfirmation(false)}
				confirm={async () => {
					await projects.remove(tasksStore.tasksPerProject.project.id);
					getProjects(dispatch);	
					navigate("/tasks");
					}
				}
				cancle={() => showConfirmation(false)}
			/>
			<SearchHeader
				title={tasksStore.tasksPerProject?.project?.name || "Tasks"}
				onSearch={onSearch}
				sort={(sortBy) => setTasks(sortTasks(tasks, sortBy))}
				options={renderOptions()}
				newTaskRoute="/project/new-task"
			/>
			{tasksStore.loading ?
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

export default ProjectView;