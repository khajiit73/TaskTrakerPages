import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskColumn.scss';

interface TaskColumnProps {
  title: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title }) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      <TaskCard taskName="Тут типа таск" />
    </div>
  );
};

export default TaskColumn;