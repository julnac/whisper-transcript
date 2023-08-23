import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

import Home from "./pages/Home.js";
import Download from "./pages/Download.js";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/whisper-transcript" element={<Home />} />
        <Route path="/whisper-transcript/download" element={<Download />} />
      </Routes>
    </Router>
  );
}

export default App;
