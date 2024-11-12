import React, { useState } from 'react';
import TaskColumn from './TaskColumn/TaskColumn';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import TaskCard from './TaskCard/TaskCard';
import TaskDetailsModal from './TaskDetailsModal/TaskDetailsModal';
import { tasksData, TaskItem } from '../../helpers/taskData';
import './Board.scss';

interface Column {
  id: string;
  title: string;
  tasks: TaskItem[];
}

const Board: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To do', tasks: tasksData.filter(task => task.statusId === 1) },
    { id: 'inProgress', title: 'In progress', tasks: tasksData.filter(task => task.statusId === 2) },
    { id: 'done', title: 'Done', tasks: tasksData.filter(task => task.statusId === 3) },
  ]);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(Number(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((column) =>
        column.tasks.some((task) => task.id === Number(active.id))
      );
      const destinationColumn = prevColumns.find((column) => column.id === over.id || column.tasks.some((task) => task.id === Number(over.id)));

      if (!sourceColumn || !destinationColumn) return prevColumns;

      if (sourceColumn === destinationColumn) {
        const oldIndex = sourceColumn.tasks.findIndex((task) => task.id === Number(active.id));
        const newIndex = sourceColumn.tasks.findIndex((task) => task.id === Number(over.id));

        if (oldIndex !== newIndex) {
          const updatedTasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex);
          return prevColumns.map((column) =>
            column.id === sourceColumn.id ? { ...column, tasks: updatedTasks } : column
          );
        }
      } else {
        const task = sourceColumn.tasks.find((task) => task.id === Number(active.id));
        if (task) {
          return prevColumns.map((column) => {
            if (column === sourceColumn) {
              return { ...column, tasks: column.tasks.filter((t) => t.id !== task.id) };
            } else if (column === destinationColumn) {
              return { ...column, tasks: [...column.tasks, task] };
            }
            return column;
          });
        }
      }

      return prevColumns;
    });
  };

  const handleCardClick = (task: TaskItem) => {
    setSelectedTask(task);
  };

  const closeModal = () => setSelectedTask(null);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={`board ${selectedTask ? 'modal-open' : ''}`}>
        {columns.map((column) => (
          <SortableContext key={column.id} items={column.tasks.map((task) => task.id.toString())}>
            <TaskColumn columnId={column.id} title={column.title} tasks={column.tasks} onCardClick={handleCardClick} />
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeId ? (
          <TaskCard
            taskId={activeId}
            taskName={columns.flatMap((column) => column.tasks).find((task) => task.id === activeId)?.title || ''}
            onClick={() => {}}
          />
        ) : null}
      </DragOverlay>

      {selectedTask && <TaskDetailsModal task={selectedTask} onClose={closeModal} />}
    </DndContext>
  );
};

export default Board;
