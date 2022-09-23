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

export const SORTING_OPTIONS = {
	STARTING_DATE: 0,
	PROJECT: 1
}

export const sortTasks = (sortBy, tasks) => {
	const tasksCopy = [...tasks];
	switch (sortBy) {
		case SORTING_OPTIONS.STARTING_DATE:
			tasksCopy.sort((taskA, taskB) =>
					new Date(taskA.starting_time) -
					new Date(taskB.starting_time)
			);
			break;
		case SORTING_OPTIONS.PROJECT:
			tasksCopy.sort((taskA, taskB) =>
				taskA.category_id - taskB.category_id
			);
			break;
		default:
			tasksCopy.sort((taskA, taskB) =>
					new Date(taskA.starting_time) -
					new Date(taskB.starting_time)
			);
	}
	
	return tasksCopy;
}

export default tasksSlice.reducer;
