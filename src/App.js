import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RootRoutes from './Router';
import './styles/index.scss';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RootRoutes />
    </BrowserRouter>
  );
}

export default App;
