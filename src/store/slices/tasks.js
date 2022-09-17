import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	newTaskPage: false,
	selectedTask: {}
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showNewTaskPage: (state, action) => {
      state.newTaskPage = action.payload;
		},
		setSelectedTask(state, action) {
			state.selectedTask = action.payload;
		}
  },
});

export const {
	showNewTaskPage,
	setSelectedTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
