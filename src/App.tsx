import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar';
import Board from './components/Board/Board';
import AssignedTasks from './components/AssignedTasks/AssignedTasks';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <Routes>
          <Route path="/" element={<Navigate to="/board" replace />} />
          <Route path="/board" element={<Board />} />
          <Route path="/assigned" element={<AssignedTasks />} />
        </Routes>
      </div>
    </Router>
  );
}; 

export default App;
