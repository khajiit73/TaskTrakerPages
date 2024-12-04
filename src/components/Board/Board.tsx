import React, { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn/TaskColumn";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard/TaskCard";
import TaskDetailsModal from "./TaskDetailsModal/TaskDetailsModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards, Task } from "../../store/slices/boardSlice";
import { RootState } from "../../store";
import axios from "axios";
import "./Board.scss";

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const API_BASE_URL = "http://18.188.183.157:5000/api";

const Board: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { boards, loading, error } = useSelector(
    (state: RootState) => state.board
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/board`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
        });

        const boardData = response.data;

        const columnsData: Column[] = [
          {
            id: "1",
            title: "To do",
            tasks: boardData.flatMap((b: any) =>
              b.tasks.filter((t: any) => t.statusId === 1)
            ),
          },
          {
            id: "2",
            title: "In progress",
            tasks: boardData.flatMap((b: any) =>
              b.tasks.filter((t: any) => t.statusId === 2)
            ),
          },
          {
            id: "3",
            title: "Done",
            tasks: boardData.flatMap((b: any) =>
              b.tasks.filter((t: any) => t.statusId === 3)
            ),
          },
        ];

        setColumns(columnsData);
      } catch (err) {
        console.error("Error fetching boards:", err);
      }
    };

    fetchData();
  }, [token]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(Number(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !token) return;

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((column) =>
        column.tasks.some((task) => task.id === Number(active.id))
      );
      const destinationColumn = prevColumns.find(
        (column) => column.id === over.id
      );

      if (!sourceColumn || !destinationColumn) return prevColumns;

      const task = sourceColumn.tasks.find(
        (task) => task.id === Number(active.id)
      );
      if (task && sourceColumn !== destinationColumn) {
        const updatedTask = { ...task, statusId: Number(destinationColumn.id) };

        // Optimistically update the state
        const updatedColumns = prevColumns.map((column) => {
          if (column === sourceColumn) {
            return {
              ...column,
              tasks: column.tasks.filter((t) => t.id !== task.id),
            };
          } else if (column === destinationColumn) {
            return { ...column, tasks: [...column.tasks, updatedTask] };
          }
          return column;
        });

        setColumns(updatedColumns);

        // Send API update
        axios
          .put(`${API_BASE_URL}/task-items/${task.id}`, updatedTask, {
            headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
          })
          .catch((err) => {
            console.error("Failed to update task:", err);
            // Revert optimistic update on error
            setColumns(prevColumns);
          });

        return updatedColumns;
      }

      return prevColumns;
    });
  };

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
  };

  const closeModal = () => setSelectedTask(null);

  if (loading) return <div>Loading...</div>;
  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error?.message || "An unknown error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={`board ${selectedTask ? "modal-open" : ""}`}>
        {columns.map((column) => (
          <SortableContext
            key={column.id}
            items={column.tasks.map((task) => task.id.toString())}
          >
            <TaskColumn
              columnId={column.id}
              title={column.title}
              tasks={column.tasks}
              onCardClick={handleCardClick}
            />
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeId ? (
          <TaskCard
            taskId={activeId}
            taskName={
              columns
                .flatMap((column) => column.tasks)
                .find((task) => task.id === activeId)?.title || ""
            }
            onClick={() => {}}
          />
        ) : null}
      </DragOverlay>

      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={closeModal} />
      )}
    </DndContext>
  );
};

export default Board;
