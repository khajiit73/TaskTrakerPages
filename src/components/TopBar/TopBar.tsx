import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.scss';

const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <div className="logo">Taskify </div>
      <nav>
        <Link to="/board">Board</Link>
        <Link to="/assigned">Your tasks</Link>
      </nav>
      <div className="profile">Profile</div>
    </div>
  );
};

export default TopBar;