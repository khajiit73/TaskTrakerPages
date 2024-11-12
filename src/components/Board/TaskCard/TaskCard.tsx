import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './TaskCard.scss';

interface TaskCardProps {
  taskId: number;
  taskName: string;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskId, taskName, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: taskId.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.2s ease',
    boxShadow: isDragging ? '0px 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {taskName}
      <div
        className="drag-handle"
        {...listeners}
        {...attributes}
      >
        |||
      </div>
    </div>
  );
};

export default TaskCard;
