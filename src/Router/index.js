import React from 'react';
import { Routes, Route } from 'react-router-dom';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/timeline" />
      <Route path="/favorites" />
    </Routes>
  );
}

export default RootRoutes;
