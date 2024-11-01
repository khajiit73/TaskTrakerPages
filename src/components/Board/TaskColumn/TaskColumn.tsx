import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskColumn.scss';

interface Task {
  id: number;
  name: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[]; // Receive tasks as a prop
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} taskName={task.name} />
      ))}
    </div>
  );
};

export default TaskColumn;
