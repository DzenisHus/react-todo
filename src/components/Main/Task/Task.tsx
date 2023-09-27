import React, { useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalContent = (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center cursor-pointer"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2	left-1/2 translate-y-[-50%] translate-x-[-50%] bg-white p-4 rounded shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </>
  );

  return isOpen ? ReactDOM.createPortal(modalContent, document.body) : null;
};

interface TaskProps {
  task: {
    id: string;
    title: string;
    status: string;
  };

  onEditTask: (id: string, title: string, status: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEditTask }) => {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setTitle(task.title);
    setStatus(task.status);
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    onEditTask(task.id, title, status);
    setIsModalOpen(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Modal Content</h2>
        <input type="text" value={title} onChange={handleTitleChange} />
        <select value={status} onChange={handleStatusChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleCloseModal}>Cancel</button>
      </Modal>

      <div className="task" data-task-id={task.id}>
        <div className="task-title">{task.title}</div>
        <div className="task-status">{task.status}</div>
        <button onClick={handleOpenModal}>Edit</button>
      </div>
    </>
  );
};

export default Task;
