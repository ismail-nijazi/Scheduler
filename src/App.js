import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import RootRoutes from './Router';
import './styles/index.scss';
import Navbar from './components/Navbar';
import ProfileView from './views/ProfileView';

function App() {
  const [navVisible, setNavVisibility] = useState(false);
  return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<BrowserRouter>
					<Navbar
						visible={navVisible}
						setVisibility={setNavVisibility}
					/>
					<ProfileView />
					<div className={navVisible ? 'page with_navbar_open' : 'page'}>
						<RootRoutes />
					</div>
				</BrowserRouter>
			</LocalizationProvider>
    </div>
  );
}

export default App;
