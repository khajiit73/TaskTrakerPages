
import React from 'react';
import TaskColumn from './TaskColumn/TaskColumn';
import './Board.scss';

const Board: React.FC = () => {
  return (
    <div className="board">
      <TaskColumn title="Тут типа колонка ту ду" />
      <TaskColumn title="Тут типа колонка ін прогресс" />
      <TaskColumn title="Тут типа колонка дан" />
    </div>
  );
};

export default Board;
