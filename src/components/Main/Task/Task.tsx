import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { useDrag } from "react-dnd";

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
      <div className="fixed top-1/2	left-1/2 translate-y-[-50%] translate-x-[-50%] bg-white p-4 rounded shadow-lg flex flex-col text-slate-200 max-w-md w-11/12 bg-zinc-900">
        <div className="flex justify-end close-icon">
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

  onEditTask: (
    id: string,
    title: string,
    status: string,
    closestTask: object,
    overlayPosition: string
  ) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEditTask }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CARD",
      item: task,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

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
    onEditTask(task.id, title, status, {}, "");
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
        <h2 className="mb-4 text-lg	">Change Task</h2>
        <input type="text" value={title} onChange={handleTitleChange} />
        <select value={status} onChange={handleStatusChange}>
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="actions-tollbar mt-2 flex gap-2.5">
          <button className="primary" onClick={handleSaveClick}>
            Save
          </button>
          <button className="primary" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </Modal>

      <div
        className="task bg-zinc-900 hover:bg-zinc-800 p-4 text-neutral-100 rounded-md cursor-grab	transition-all"
        data-task-id={task.id}
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="task-title mb-2">{task.title}</div>
        <div className="task-status">{task.status}</div>
        <button onClick={handleOpenModal}>
          <BsFillPencilFill />
        </button>
      </div>
    </>
  );
};

export default Task;
