import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import tasksReducer from './slices/tasks';

export default configureStore({
  reducer: {
    profile: userReducer,
    tasks: tasksReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
