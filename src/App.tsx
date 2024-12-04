import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import TopBar from './components/TopBar/TopBar';
import Board from './components/Board/Board';
import AssignedTasks from './components/AssignedTasks/AssignedTasks';
import Login from './pages/Login/Login';
import Boards from './pages/Boards/Boards';
import './styles/App.scss';
import Register from './pages/Register/Register';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router basename="/TaskTrakerPages">
      <div className="app">
        {isAuthenticated && <TopBar />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/boards" replace /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/boards"
            element={isAuthenticated ? <Boards /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/board/:id"
            element={isAuthenticated ? <Board /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/assigned"
            element={isAuthenticated ? <AssignedTasks /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
