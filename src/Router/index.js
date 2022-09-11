import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TimelineView from '../views/TimelineView';

function RootRoutes() {
  return (
    <Routes>
		  <Route path="/timeline" element={<TimelineView/>} />
      <Route path="/favorites" />
    </Routes>
  );
}

export default RootRoutes;
