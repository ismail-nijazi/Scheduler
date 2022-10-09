import { createSlice } from '@reduxjs/toolkit';
import { projects, tasks } from '../../services/database';
import { auth } from '../../firebase';
import { Timestamp } from 'firebase/firestore';
import { statusColors } from '../../styles/config/colors';
import moment from 'moment';

const initialState = {
  newTaskPage: false,
  selectedWeek: moment().startOf('isoWeek').toDate(),
  selectedTask: null,
  usersProjects: [],
  tasks: [],
  tasksPerProject: {
    project: null,
    tasks: []
  },
  loading: false,
  statuses: []
};

export const STATUSES = {
  NOT_STARTED: {
    value: 0,
    text: 'Not Started'
  },
  ON_GOING: {
    value: 1,
    text: 'On Going'
  },
  COMPELTED: {
    value: 2,
    text: 'Compeleted'
  },
  CANCELED: {
    value: 3,
    text: 'Canceled'
  },
  EXPIRED: {
    value: 4,
    text: 'Expired'
  }
};

export const getStatus = (status) => {
  switch (status) {
    case STATUSES.NOT_STARTED.value:
      return {
        color: statusColors.NOT_STARTED,
        text: STATUSES.NOT_STARTED.text
      };
    case STATUSES.ON_GOING.value:
      return {
        color: statusColors.ON_GOING,
        text: STATUSES.ON_GOING.text
      };
    case STATUSES.COMPELTED.value:
      return {
        color: statusColors.COMPELTED,
        text: STATUSES.COMPELTED.text
      };
    case STATUSES.CANCELED.value:
      return {
        color: statusColors.CANCELED,
        text: STATUSES.CANCELED.text
      };
    case STATUSES.EXPIRED.value:
      return {
        color: statusColors.EXPIRED,
        text: STATUSES.EXPIRED.text
      };
    default:
      return {
        color: statusColors.NOT_STARTED,
        text: STATUSES.NOT_STARTED.text
      };
  }
};

export const SELECTED_PROJECT_KEY = 'scheduler-selected-project';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showNewTaskPage: (state, action) => {
      state.newTaskPage = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTasksPerProject: (state, action) => {
      state.tasksPerProject = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProjects: (state, action) => {
      state.usersProjects = action.payload;
    },
    setSelectedWeek: (state, action) => {
      state.selectedWeek = action.payload;
    },
    setStatuses: (state, action) => {
      state.statuses = action.payload;
    }
  }
});

export const {
  showNewTaskPage,
  setSelectedTask,
  setTasksPerProject,
  setSelectedWeek,
  setStatuses
} = tasksSlice.actions;

export const formatTask = (task) => {
  const taskStartTime = new moment(task.starting_time.toDate());
  const taskDeadline = new moment(task.deadline.toDate());
  const now = new moment();
  let status = task.status;

  if (
    task.status !== STATUSES.EXPIRED.value &&
    task.status !== STATUSES.CANCELED.value &&
    task.status !== STATUSES.COMPELTED.value
  ) {
    if (now >= taskStartTime && now <= taskDeadline) {
      status = STATUSES.ON_GOING.value;
    } else if (now > taskDeadline && task.status !== STATUSES.COMPELTED.value) {
      status = STATUSES.EXPIRED.value;
    } else if (now < taskStartTime) {
      status = STATUSES.NOT_STARTED.value;
    }
  }

  return {
    ...task,
    starting_time: taskStartTime,
    deadline: taskDeadline,
    status: status
  };
};

export const SORTING_OPTIONS = {
  STARTING_DATE: 0,
  STATUS: 1
};

export const sortTasks = (sortBy, tasks) => {
  const tasksCopy = [...tasks];
  switch (sortBy) {
    case SORTING_OPTIONS.STARTING_DATE:
      tasksCopy.sort(
        (taskA, taskB) => new Date(taskA.starting_time) - new Date(taskB.starting_time)
      );
      break;
    case SORTING_OPTIONS.STATUS:
      tasksCopy.sort((taskA, taskB) => taskA.status - taskB.status);
      break;
    default:
      tasksCopy.sort(
        (taskA, taskB) => new Date(taskA.starting_time) - new Date(taskB.starting_time)
      );
  }

  return tasksCopy;
};

export const getTasks = async (dispatch) => {
  dispatch(tasksSlice.actions.setLoading(true));
  const fetchedTasks = await tasks.getUsersData();
  const formatedTasks = fetchedTasks.map((task) => formatTask(task));
  dispatch(tasksSlice.actions.setTasks(formatedTasks));
  dispatch(tasksSlice.actions.setLoading(false));
};

export const createTask = async (dispatch, data) => {
  const startingDate = Timestamp.fromDate(data.starting_time.toDate());
  const deadline = Timestamp.fromDate(data.deadline.toDate());
  const newTasks = {
    ...data,
    user: auth.currentUser.uid,
    starting_time: startingDate,
    deadline: deadline
  };
  if (data.id) {
    await tasks.create(newTasks, data.id);
  } else {
    await tasks.create(newTasks);
  }
};

export const getTasksPerProject = async (dispatch, project) => {
  dispatch(tasksSlice.actions.setLoading(true));
  const userTasks = await tasks.getTasksPerProject(project.id);
  dispatch(
    tasksSlice.actions.setTasksPerProject({
      project: project,
      tasks: userTasks.map((task) => formatTask(task))
    })
  );
  localStorage.setItem(SELECTED_PROJECT_KEY, JSON.stringify(project));
  dispatch(tasksSlice.actions.setLoading(false));
};

export const getProjects = async (dispatch) => {
  dispatch(tasksSlice.actions.setLoading(true));
  const usersProjects = await projects.getUsersData();
  dispatch(tasksSlice.actions.setProjects(usersProjects));
  dispatch(tasksSlice.actions.setLoading(false));
};

export const setTheTaskCompeleted = (dispatch, task) => {
  let actualDuration = 0;
  if (task.starting_time < new moment()) {
    actualDuration = Math.floor(Math.abs(new moment() - task.starting_time) / 3600000);
  }
  return createTask(dispatch, {
    ...task,
    status: STATUSES.COMPELTED.value,
    actual_duration: actualDuration
  });
};

export const isTaskInSelectedWeek = (task, startOfWeek, endOfWeek) => {
  const taskStartTime = new Date(task.starting_time);
  const taskEndTime = new Date(task.deadline);

  if (taskStartTime >= startOfWeek && taskStartTime <= endOfWeek) {
    return true;
  }
  if (
    taskStartTime <= startOfWeek &&
    (taskEndTime >= endOfWeek || taskEndTime >= startOfWeek)
  ) {
    return true;
  }
  return false;
};

export const calculateRemainedCapacity = (tasksList, newTask, startOfWeek) => {
  const endOfWeek = new moment(startOfWeek).endOf('isoWeek').toDate();
  const tasksInSameWeek = tasksList.filter((task) => {
    return isTaskInSelectedWeek(task, startOfWeek, endOfWeek) && task.id !== newTask.id;
  });
  const sumEstimatedDuration = tasksInSameWeek.reduce((total, task) => {
    return total + parseInt(task.estimated_duration);
  }, 0);
  return sumEstimatedDuration;
};

export const initUserData = async (dispatch) => {
  const selectedProject = JSON.parse(localStorage.getItem(SELECTED_PROJECT_KEY));
  getTasks(dispatch);
  getProjects(dispatch);
  if (selectedProject) {
    getTasksPerProject(dispatch, selectedProject);
  }
};

export default tasksSlice.reducer;
