import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Select, MenuItem,Alert} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FaTimes,FaTrashAlt,FaCheck } from 'react-icons/fa';
import styles from '../styles/config/material_ui';
import moment from 'moment';
import {
	createTask, 
	getStatus, 
	getTasks, 
	getTasksPerProject, 
	setTheTaskCompeleted, 
	STATUSES} from '../store/slices/tasks';
import PopupQuestion from '../components/PopupQuestion';
import { tasks } from '../services/database';
import Spinner from '../components/Spinner';

const INITIAL_TASK = {
  description: '',
  project: "No Project",
  starting_time: new moment(),
  deadline: new moment(),
	estimated_duration: 1,
	status: 0,
};

function EditTaskView({project}) {	
	const taskStore = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const isNewTask = useLocation().pathname.includes('new');
	const [error, setError] = useState("");
	const [newTask, setTask] = useState(
		isNewTask ? INITIAL_TASK : taskStore.selectedTask
	);
	const [confirmation, showConfirmation] = useState(false);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const status = getStatus(newTask.status);

	useEffect(() => {
		if (isNewTask && project) {
			setTask({ ...newTask, project: taskStore.tasksPerProject.project.id });
		}
	}, []);

	const setAsCompeletd = () => {
		setTheTaskCompeleted(dispatch, newTask).then(() => setTask(
			{ ...newTask, status: STATUSES.COMPELTED.value })
		);
		if (taskStore.tasksPerProject?.project) {
			getTasksPerProject(dispatch, taskStore.tasksPerProject?.project);
		}
	}
	
	const validateTask = () => {
		if (!newTask.description) {
			setError("You have to add a description!");
			return false;
		}
		else if (newTask.deadline <= newTask.starting_time) {
			setError("The deadline should be after starting time!");
			return false;
		}
		return true;
	}

	const submit = async () => {
		if (validateTask()) {
			setLoading(true);
			await createTask(dispatch, newTask);
			setLoading(false);
			navigate(-1);
		}
	}

  return (
		<div className='modal'>
			<PopupQuestion
				title={"Delete task"}
				text="Are you sure you want to delet this task?"
				visible={confirmation}
				onClose={() => showConfirmation(false)}
				confirm={async () => {
					await tasks.remove(taskStore.selectedTask.id);
						getTasks(dispatch);
						navigate(-1);
					}
				}
				cancle={() => showConfirmation(false)}
			/>
      <div className="edit-task">
        <div className="head">
					<span
						className="title">{isNewTask ? 'Add a new' : 'Update the'}
						task
					</span>
					<div>
						<button
							type='button'
							onClick={setAsCompeletd}
							className='btn transparent-btn'
						>
							<FaCheck />
						</button>
						<button
							type='button'
							onClick={() => showConfirmation(true)}
							className='btn transparent-btn'
						>
							<FaTrashAlt />
						</button>
						    <button
							type="button"
							className="btn transparent-btn"
							onClick={() => navigate(-1)}>
            <FaTimes fontSize={"1.2rem"}/>
          </button>
					</div>
         
        </div>
				<div className="content">
					<div className='row'>
						<div className="status">
						<span className="status-text">{ status.text }</span>
						<span className="status-indicator" style={
							{
								backgroundColor: status.color
							}}>
						</span>
					</div>
					</div>
					<div className="row">
						{error && <Alert className="col" severity="error">{error}</Alert>}
					</div>
          <div className="row">
            <div className="col">
              <label htmlFor="description">Description</label>
              <textarea
                value={newTask.description}
                onChange={(event) =>
                  setTask({
                    ...newTask,
                    description: event.target.value
                  })
                }
                name="description"
                id="description"
                placeholder="Description"
                rows={6}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label id="task-category">Project</label>
              <Select
                labelId="task-category"
                id="task-category-select"
                value={newTask.project || "No Project"}
                label="Project"
                onChange={(event) =>
                  setTask({
                    ...newTask,
                    project: event.target.value
                  })
                }
                className="select">
                <MenuItem sx={styles.menuItem} value={"No Project"}>
                  No Project
                </MenuItem>
								{taskStore.usersProjects.map((project) =>
									<MenuItem
										sx={styles.menuItem}
										value={project.id}
										key={project.id}
									>
										{project.name}
									</MenuItem>
								)}
              </Select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Start date</span>
              <DateTimePicker
                value={newTask.starting_time}
                onChange={(newValue) =>
                  setTask({
                    ...newTask,
                    starting_time: newValue
                  })
                }
                renderInput={(params) => <TextField {...params} />}
                className="date-picker"
              />
            </div>
            <div className="col">
              <span>Deadline</span>
              <DateTimePicker
                value={newTask.deadline}
                onChange={(newValue) =>
                  setTask({
                    ...newTask,
                    deadline: newValue
                  })
                }
                renderInput={(params) => <TextField {...params} />}
                className="date-picker"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Duration(hours)</span>
              <input
                className="input"
                type="number"
                name="duration"
                id="duration"
                value={newTask.estimated_duration}
                onChange={(event) =>
                  setTask({
                    ...newTask,
                    estimated_duration: event.target.value
                  })
                }
              />
            </div>
          </div>
          <div className="row footer">
            <div className="col">
							<button
								type="button"
								className="btn primary-btn"
								onClick={submit}
							>
								{isNewTask ? 'Add' : 'Update'}
								{loading && <Spinner className="spinner-small"/>}
              </button>
						</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskView;
