import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profile';

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});
