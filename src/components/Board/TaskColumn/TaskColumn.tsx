import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "../../../store/slices/boardSlice";
import "./TaskColumn.scss";

interface TaskColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
  onCardClick: (task: Task) => void; 
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  columnId,
  title,
  tasks,
  onCardClick,
}) => {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div className="task-column" ref={setNodeRef}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          taskId={task.id}
          taskName={task.title}
          onClick={() => onCardClick(task)}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
