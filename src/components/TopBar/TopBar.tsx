import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './TopBar.scss';

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div className="logo">Taskify</div>
      <nav>
        <Link to="/boards">Boards</Link>
        <Link to="/assigned">Your tasks</Link>
      </nav>
      <div className="profile" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default TopBar;
