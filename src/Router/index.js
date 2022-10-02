import React,{useState, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TimelineView from '../views/TimelineView';
import TasksView from '../views/TasksView';
import EditTasksView from "../views/EditTaskView";
import AuthView from "../views/AuthView/AuthView";
import Navbar from '../components/Navbar';
import NewProjectView from '../views/NewProjectView';
import ProjectView from '../views/ProjectView';
import ProfileView from '../views/ProfileView';
import TimelineMobileView from '../views/TimelineMobile';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<AuthView />} />
			<Route path="/sign_up" element={<AuthView />} />
			<Route path="/reset_password" element={<AuthView />} />
			<Route path="*" element={<AuthView />} />
		</Routes>
	);
}

function RootRoutes() {
	const [navVisible, setNavVisibility] = useState(true);
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const isSmallDevice = windowDimensions.width < 800;
	
	useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	return (
		<>
			<Navbar
				visible={navVisible}
				setVisibility={setNavVisibility}
			/>
			<div className={navVisible ? 'page with_navbar_open' : 'page'}>
				<Routes>
					<Route path="/" element={<Navigate to="/timeline" />} />
					<Route path="/timeline" element={
						isSmallDevice ?
							<TimelineMobileView /> :
							<TimelineView />}
					/>
					<Route path="/tasks" element={<TasksView />}/>
					<Route path="/task/new" element={<EditTasksView />}/>
					<Route path="/task/:id" element={<EditTasksView />} />
					<Route path="/project/new-task" element={<EditTasksView project/>} />
					<Route path="/project/new" element={<NewProjectView />} />
					<Route path="/project/edit" element={<NewProjectView />} />
					<Route path="/project/:id" element={<ProjectView />} />
					<Route path="/profile" element={<ProfileView/>}/>
					<Route path="*" element={
							isSmallDevice ?
								<TimelineMobileView /> :
								<TimelineView />} />
					</Routes>
			</div>
		</>
  );
}

export default RootRoutes;
export {AuthRoutes};
