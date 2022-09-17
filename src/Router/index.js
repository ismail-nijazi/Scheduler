import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TimelineView from '../views/TimelineView';
import TasksView from '../views/TasksView';
import EditTasksView from "../views/EditTaskView";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/timeline" />} />
      <Route path="/timeline" element={<TimelineView />} />
			<Route path="/tasks" element={<TasksView />}/>
			<Route path="/task/new" element={<EditTasksView />}/>
			<Route path="/task/:id" element={<EditTasksView />}/>
    </Routes>
  );
}

export default RootRoutes;
