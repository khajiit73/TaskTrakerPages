import React from 'react';
import './TaskCard.scss';

interface TaskCardProps {
  taskName: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskName }) => {
  return (
    <div className="task-card">
      <p>{taskName}</p>
    </div>
  );
};

export default TaskCard;