import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.js' 
import Space from './components/Space.js'
import Home from './pages/Home.js'
import Projects from './pages/Projects.js'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Contact from './pages/Contact.js'
import './App.css';

function App() {
  return (
    <div className="canvasRef">
    <Space />
    <div className="content">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" 
        element={
        <GoogleReCaptchaProvider reCaptchaKey="6Lds8xAtAAAAAPuts1VUOhxr1p3Bn2L7cGGXmw2o">
        <Contact />
        </GoogleReCaptchaProvider>
        }/> 
      </Routes>
      </div>
      </div>
  );
}

export default App;
