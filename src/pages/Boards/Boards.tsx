import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { fetchBoards, createBoard } from '../../store/slices/boardSlice';
import './Boards.scss';

const Boards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { boards, loading, error } = useSelector((state: RootState) => state.board);

  const [isModalOpen, setModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      dispatch(createBoard(newBoardName)).then(() => {
        setNewBoardName('');
        setModalOpen(false);
      });
    }
  };

  const handleBoardClick = (id: number) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="boards-page">
      <h1>Boards</h1>
      {loading && <p>Loading...</p>}
      {/* Render error message if error exists */}
      {error && (
        <p style={{ color: 'red' }}>
          {typeof error === 'string' ? error : error.message || 'An unknown error occurred'}
        </p>
      )}

      <div className="boards-grid">
        {boards.map((board) => (
          <div key={board.id} className="board-card" onClick={() => handleBoardClick(board.id)}>
            <h3>{board.name}</h3>
          </div>
        ))}
        <div className="board-card create-board" onClick={() => setModalOpen(true)}>
          <h3>+ Create New Board</h3>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Board</h2>
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name"
            />
            <div className="modal-actions">
              <button onClick={handleCreateBoard}>Create</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;
