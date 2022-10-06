import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {
	FaAngleRight,
	FaAngleLeft,
	FaPlus,
	FaSignOutAlt,
	FaCalendarAlt,
} from 'react-icons/fa';
import {BsUiChecks} from "react-icons/bs";
import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { setLogin } from '../store/slices/user';
import { getTasksPerProject } from '../store/slices/tasks';
import Spinner from './Spinner';

function Navbar({ visible, setVisibility }) {
	const [optionsVisible, showOptions] = useState(false);
	const [csvURL, setExportURL] = useState("");
	const [exporting, setExporting] = useState(false);
	const profile = useSelector(state => state.profile);
	const tasksStore = useSelector(state => state.tasks);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
  const navButtonOnClick = () => {
    setVisibility(!visible);
	};

	const exportUserData = () => {
		setExporting(true);
		let csvHeader = [
			"Starting time", 
			"Deadline", 
			"Description", 
			"Estimated duration",
			"Project",
			"Status"
		]
		let csv = csvHeader.join(",") + "\n";
		tasksStore.tasks.forEach(task => {
			const taskProject = tasksStore.usersProjects.find(
				project => project.id == task.project
			);
			let row = [
				task.starting_time,
				task.deadline,
				task.description,
				task.estimated_duration,
				taskProject?.name || "No Project",
				task.status
			];
			csv += `${row.join(',')}\n`;
		});

		setExportURL('data:text/csv;charset=utf-8,' + encodeURI(csv));
		setExporting(false);
	}


	return (
		<>
		{ exporting && 
			<div className="modal">
				<div className="spinner-container">
						<h3 style={{ marginBottom: "1rem" }}>
							Generating data ...
						</h3>
					<Spinner className="spinner-medium" />
				</div>
			</div>
		}
    <nav className={!visible ? 'navbar' : ''}>
      <button
        type="button"
        className="btn primary-btn nav-btn"
        onClick={navButtonOnClick}
      >
        { !visible
          ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
      </button>
      <div className="nav-profile">
        <button
          className="btn transparent-btn profile-btn"
          onClick={() => showOptions(!optionsVisible)}
          type="button"
        >
					<div className="profile-image">
						<h4>{profile.user?.email?.slice(0, 2).toUpperCase()}
						</h4>
					</div>
        </button>
				<span>{profile.user.email}</span>
				<div className={optionsVisible ? 'options' : 'options hide'}>
					<NavLink
						to={`/profile`}
            onClick={() => {
              showOptions(false);
            }}
						className="btn nav-link"
          >
            Profile
					</NavLink>
					<a
						href={csvURL}
            onClick={exportUserData}
						className="btn nav-link"
						target="_blank"
						rel="noreferrer"
						download={`scheduler_export.csv`}
						disabled={exporting}
          >
            Export
					</a>
          {/* <button
            type="button"
            className="btn transparent-btn"
          >
            Settings
          </button> */}
        </div>
      </div>
      <div className="links">
        <NavLink to="/timeline" className="nav-link">
          <FaCalendarAlt /> <span>Timeline</span>
        </NavLink>
        <NavLink to="/tasks" className="nav-link">
          <BsUiChecks /> <span>Tasks</span>
        </NavLink>
      </div>
			<div className="links ">
				<NavLink to="/project/new" className="nav-link project-btn">
					<span>Projects</span>
					<FaPlus className="add-icon" size={15}/>
				</NavLink>
				{
					tasksStore.usersProjects?.map(project => 
						<NavLink
							to={`/project/${project.id}`}
							onClick={() => getTasksPerProject(dispatch ,project)}
							className="nav-link sub-link"
							key={project.id}
						>
							<span
								className="project-color"
							style={
								{ backgroundColor: project.color }
							}></span>
							{project.name}
						</NavLink>
					)
				}
			</div>
			<div className="footer">
				<div className="links">
					<button
						className="btn nav-link logout"
						onClick={() => signOut(auth).then(() => {
							dispatch(setLogin(false));
							navigate("/");
						})}>
						<FaSignOutAlt />logout
					</button>
				</div>
				<div className="logo">
					<span className="text">scheduler</span>
					<div className="cover"></div>
				</div>
			</div>
			</nav>
		</>
  );
}

export default Navbar;
