import React from 'react';
import './TaskDetailsModal.scss';
import { Task } from '../../../store/slices/boardSlice';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose }) => (
  <div className="task-details-modal">
    <div className="modal-content">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Created At:</strong> {task.createdAt}</p>
      <p><strong>Board ID:</strong> {task.boardId}</p>
      <p><strong>Status ID:</strong> {task.statusId}</p>
      <p><strong>Assignee ID:</strong> {task.assigneeId}</p>
    </div>
  </div>
);

export default TaskDetailsModal;
