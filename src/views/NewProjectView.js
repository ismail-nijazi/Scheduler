import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { projects } from '../services/database';
import { auth } from '../firebase';
import Spinner from '../components/Spinner';
import { getProjects, setTasksPerProject } from '../store/slices/tasks';

function NewProjectView() {
	const navigate = useNavigate();
	const tasksStore = useSelector(state => state.tasks);
	const selectedProject = tasksStore.tasksPerProject.project;
	const isNewProject = useLocation().pathname.includes('new');
	const [title, setTitle] = useState(
		isNewProject ? "" : selectedProject.name);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const createProject = async () => {
		setLoading(true);
		if (isNewProject) {
			await projects.create({
				name: title,
				user: auth.currentUser.uid
			});
		} else {
			await projects.create({
				name: title,
				user: auth.currentUser.uid
			}, selectedProject.id);
			dispatch(setTasksPerProject({
				...tasksStore.tasksPerProject,
				project: {...selectedProject, name: title}
			}));
		}

		setLoading(false);
		navigate(-1);
		getProjects(dispatch);					
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
            <div className="col">
              <span>Title</span>
              <input
                className="input"
                type="text"
                name="title"
								value={title}
								placeholder="Title"
                onChange={(event) =>setTitle(event.target.value)}
              />
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