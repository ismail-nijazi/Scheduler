import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { setLogin,setUser } from './store/slices/user';
import RootRoutes, { AuthRoutes } from './Router';
import { auth } from "./firebase";
import './styles/index.scss';
import ProfileView from './views/ProfileView';

function App() {
	const profile = useSelector(state => state.profile);
	const dispatch = useDispatch();

	auth.onAuthStateChanged(function (user) {
		if (user) {
			dispatch(setLogin(true));
			dispatch(setUser(user));
		}
	});


  return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<BrowserRouter>
					{profile.isLoggedIn ?
						<>
							<RootRoutes />
							<ProfileView />
						</> :
						<AuthRoutes />
					}
				</BrowserRouter>
			</LocalizationProvider>
    </div>
  );
}

export default App;
