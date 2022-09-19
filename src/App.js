import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import RootRoutes,{AuthRoutes} from './Router';
import './styles/index.scss';
import ProfileView from './views/ProfileView';

function App() {
	const profile = useSelector(state => state.profile);
	
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
