import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Space from './components/Space.js'
import Home from './pages/Home.js'
import './App.css';

function App() {
  return (
    <div className="canvasRef">
    <Space />
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </div>
      </div>
  );
}

export default App;
