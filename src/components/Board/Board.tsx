import React, { useState } from 'react';
import TaskColumn from './TaskColumn/TaskColumn';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import TaskCard from './TaskCard/TaskCard'; // Import TaskCard for DragOverlay
import './Board.scss';

interface Task {
  id: number;
  name: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const Board: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To do', tasks: [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }] },
    { id: 'inProgress', title: 'In progress', tasks: [{ id: 3, name: 'Task 3' }, { id: 4, name: 'Task 4' }] },
    { id: 'done', title: 'Done', tasks: [{ id: 5, name: 'Task 5' }, { id: 6, name: 'Task 6' }] },
  ]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(Number(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((column) =>
        column.tasks.some((task) => task.id === Number(active.id))
      );
      const destinationColumn = prevColumns.find((column) => column.id === over.id || column.tasks.some((task) => task.id === Number(over.id)));

      if (!sourceColumn || !destinationColumn) return prevColumns;

      const oldIndex = sourceColumn.tasks.findIndex((task) => task.id === Number(active.id));
      const newIndex = destinationColumn.tasks.findIndex((task) => task.id === Number(over.id));

      // Moving within the same column
      if (sourceColumn === destinationColumn && oldIndex !== newIndex) {
        const updatedTasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex);
        return prevColumns.map((column) =>
          column.id === sourceColumn.id ? { ...column, tasks: updatedTasks } : column
        );
      }
      return prevColumns;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null); // Reset the activeId when drag ends

    if (!over) return;

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((column) =>
        column.tasks.some((task) => task.id === Number(active.id))
      );
      const destinationColumn = prevColumns.find((column) => column.id === over.id || column.tasks.some((task) => task.id === Number(over.id)));

      if (!sourceColumn || !destinationColumn) return prevColumns;

      // Moving within the same column
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
        // Moving between columns
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

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="board">
        {columns.map((column) => (
          <SortableContext key={column.id} items={column.tasks.map((task) => task.id.toString())}>
            <TaskColumn columnId={column.id} title={column.title} tasks={column.tasks} />
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeId ? (
          <TaskCard
            taskId={activeId}
            taskName={columns.flatMap((column) => column.tasks).find((task) => task.id === activeId)?.name || ''}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
