import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { useDroppable } from '@dnd-kit/core';
import './TaskColumn.scss';

interface Task {
  id: number;
  name: string;
}

interface TaskColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnId, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div className="task-column" ref={setNodeRef}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} taskId={task.id} taskName={task.name} />
      ))}
    </div>
  );
};

export default TaskColumn;
