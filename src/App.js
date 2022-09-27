import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { setLogin,setUser } from './store/slices/user';
import RootRoutes, { AuthRoutes } from './Router';
import { auth } from "./firebase";
import './styles/index.scss';
import ProfileView from './views/ProfileView';
import {
	getProjects, 
	getTasks, 
	getTasksPerProject, 
	SELECTED_PROJECT_KEY,
	setStatuses
} from './store/slices/tasks';
import { status } from './services/database';

function App() {
	const profile = useSelector(state => state.profile);
	const dispatch = useDispatch();

	auth.onAuthStateChanged(function (user) {
		if (user) {
			dispatch(setLogin(true));
			const selectedProject = JSON.parse(
				localStorage.getItem(SELECTED_PROJECT_KEY)
			);
			getTasks(dispatch);
			getProjects(dispatch);
			status.getAll().then(
				statuses => dispatch(setStatuses(statuses))
			);
			if (selectedProject) {
				getTasksPerProject(dispatch,selectedProject);
			}
			dispatch(setUser(user));
		}
	});

  return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterMoment}>
					{profile.isLoggedIn ?
						<>
							<RootRoutes />
							<ProfileView />
						</> :
						<AuthRoutes />
					}
			</LocalizationProvider>
    </div>
  );
}

export default App;
