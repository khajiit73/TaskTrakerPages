import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.scss';

const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <div className="logo">Тут назва нашої хуїні</div>
      <nav>
        <Link to="/board">Типа дошки</Link>
        <Link to="/assigned">Типа таски, заасайнені до тебе</Link>
      </nav>
      <div className="profile">Profile</div>
    </div>
  );
};

export default TopBar;