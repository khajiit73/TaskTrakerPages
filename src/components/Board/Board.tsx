import React from 'react';
import TaskColumn from './TaskColumn/TaskColumn';
import './Board.scss';

interface Task {
  id: number;
  name: string;
}

const Board: React.FC = () => {
  // Define tasks for each column as arrays
  const todoTasks: Task[] = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
  ];

  const inProgressTasks: Task[] = [
    { id: 3, name: 'Task 3' },
    { id: 4, name: 'Task 4' },
  ];

  const doneTasks: Task[] = [
    { id: 5, name: 'Task 5' },
    { id: 6, name: 'Task 6' },
  ];

  return (
    <div className="board">
      <TaskColumn title="To do" tasks={todoTasks} />
      <TaskColumn title="In progress" tasks={inProgressTasks} />
      <TaskColumn title="Done" tasks={doneTasks} />
    </div>
  );
};

export default Board;
