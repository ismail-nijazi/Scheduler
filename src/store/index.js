import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profile';
import tasksReducer from './slices/tasks';

export default configureStore({
  reducer: {
		profile: profileReducer,
		tasks: tasksReducer
  },
});
