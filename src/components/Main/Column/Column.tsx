import React from "react";
import Task from "../Task/Task";

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    id: string;
    title: string;
    status: string;
  }[];

  onEditTask: (id: string, title: string, status: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onEditTask }) => {
  const columnTasks = tasks.filter((task) => column.taskIds.includes(task.id));

  return (
    <div className="column items-center justify-center bg-purple-500 bg-slate-300	h-100 shadow-lg p-8 rounded-md">
      <h2>{column.title}</h2>
      {columnTasks.map((task) => (
        <Task key={task.id} task={task} onEditTask={onEditTask} />
      ))}
    </div>
  );
};

export default Column;
