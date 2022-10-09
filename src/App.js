import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { setLoading, setLogin, setUser, setUserCapacity } from './store/slices/user';
import RootRoutes, { AuthRoutes } from './Router';
import { auth } from './firebase';
import { users } from './services/database';
import './styles/index.scss';
import { initUserData } from './store/slices/tasks';

function App() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  auth.onAuthStateChanged(async function (user) {
    if (user) {
      if (!profile.loading) {
        dispatch(setLoading(true));
      }
      initUserData(dispatch, user);
      const userInfo = await users.getOne(user.uid);
      dispatch(setUserCapacity(userInfo.capacity));
      dispatch(setUser(user));
      dispatch(setLogin(true));
    }
  });

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {profile.isLoggedIn ? (
          <>
            <RootRoutes />
          </>
        ) : (
          <AuthRoutes />
        )}
      </LocalizationProvider>
    </div>
  );
}

export default App;
