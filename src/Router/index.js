import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TimelineView from '../views/TimelineView';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/timeline" />} />
      <Route path="/timeline" element={<TimelineView />} />
      <Route path="/favorites" />
    </Routes>
  );
}

export default RootRoutes;
