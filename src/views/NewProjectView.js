import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { Select, MenuItem, Alert} from '@mui/material';
import { projects } from '../services/database';
import { auth } from '../firebase';
import Spinner from '../components/Spinner';
import { getProjects, setTasksPerProject } from '../store/slices/tasks';
import projectColors,{colors} from '../styles/config/colors';
import styles from '../styles/config/material_ui';

function NewProjectView() {
	const navigate = useNavigate();
	const tasksStore = useSelector(state => state.tasks);
	const selectedProject = tasksStore.tasksPerProject.project;
	const isNewProject = useLocation().pathname.includes('new');
	const [newProject, setProject] = useState({
		name: isNewProject ? "" :selectedProject.name,
		color: isNewProject ? "" :selectedProject.color,
	})
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const validate = () => {
		if (!newProject.name) {
			setError("You have to give the project a title!")
			return false;
		}
		return true;
	}

	const createProject = async () => {
		if (validate()) {
			setLoading(true);
			if (isNewProject) {
				await projects.create({
					name: newProject.name,
					color: newProject.color,
					user: auth.currentUser.uid
				});
			} else {
				await projects.create({
					name: newProject.name,
					color: newProject.color,
					user: auth.currentUser.uid
				}, selectedProject.id);
				dispatch(setTasksPerProject({
					...tasksStore.tasksPerProject,
					project: {...selectedProject, ...newProject}
				}));
			}

			setLoading(false);
			navigate(-1);
			getProjects(dispatch);		
		} 		
	}

	return (
		<div className='modal'>
      <div className="newProject">
        <div className="head">
          <span className="title">{isNewProject ? "Add a new " : "Update "} project</span>
          <button
            type="button"
            className="btn transparent-btn close-btn"
            onClick={() => navigate(-1)}>
            <FaTimes size={26} />
          </button>
        </div>
				<div className="content">
					<div className="row">
						{error && <Alert 
							className="alert" 
							severity="error">{error}</Alert>}
					</div>
					<div className="row">
            <div className="col">
              <span>Title</span>
              <input
                className="input"
                type="text"
                name="title"
								value={newProject.name}
								placeholder="Title"
                onChange={(event) =>setProject({...newProject, name:event.target.value})}
              />
            </div>
					</div>
					<div className="row">
						<div className="col">
							<span>Color</span>
              <Select
                labelId="task-category"
                id="task-category-select"
                value={newProject.color || colors.defaultProject}
                label="Project"
                onChange={(event) =>
                  setProject({
                    ...newProject,
                    color: event.target.value
                  })
                }
								className="select">
								<MenuItem 
									sx={styles.menuItem} 
									value={colors.defaultProject}
								>
                  <div
										className="color-option"
										style={{ 
											backgroundColor: colors.defaultProject}}
									/>
                </MenuItem>
								{projectColors.map((color) =>
									<MenuItem
										sx={styles.menuItem}
										value={color}
										key={color}
									>
										<div
											className="color-option"
											style={{ 
												backgroundColor: color}}
										/>
									</MenuItem>
								)}
              </Select>
            </div>
					</div>
					<div className="row footer">
						<div className="col">
							<button
								type="button"
								className="btn primary-btn"
								onClick={createProject}
							>
								{isNewProject ? "Add":"Update"}
								{loading && <Spinner className="spinner-small"/>}
							</button>
						</div>
					</div>
				</div>
      </div>
    </div>
	)
}

export default NewProjectView;