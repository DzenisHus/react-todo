import React from "react";
import Task from "../Task/Task";
import TaskOverlay from "../Task/TaskOverlay";
import { useDrop } from "react-dnd";

interface ColumnProps {
  column: {
    id: string;
    type: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    id: string;
    title: string;
    status: string;
  }[];

  onEditTask: (
    id: string,
    title: string,
    status: string,
    closestTask: object,
    overlayPosition: string
  ) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onEditTask }) => {
  const columnTasks = tasks.filter((task) => {
    if (column.id === task.status) {
      return task;
    }
  });

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item: any, monitor) => {
        onEditTask(item.id, item.title, column.type, item, "before");
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [column]
  );

  if (columnTasks.length === 0) {
    return (
      <div className="column items-center justify-center bg-purple-500 bg-slate-300	h-100 shadow-lg p-8 rounded-md">
        <h2>{column.title}</h2>
        <div
          ref={drop}
          className={`h-24 w-100 ${isOver ? "bg-red-500" : "bg-white"}`}
        ></div>
      </div>
    );
  }

  return (
    <div className="column items-center justify-center bg-purple-500 bg-slate-300 h-100 shadow-lg p-8 rounded-md">
      <h2>{column.title}</h2>
      {columnTasks.map((task) => (
        <div key={task.id}>
          <TaskOverlay
            task={task}
            column={column}
            onEditTask={onEditTask}
            overlayPosition={"top"}
          />
          <Task task={task} onEditTask={onEditTask} />
          <TaskOverlay
            task={task}
            column={column}
            onEditTask={onEditTask}
            overlayPosition={"bottom"}
          />
        </div>
      ))}

      {columnTasks.length > 0 ? "Release to drop" : "Drag a box here"}
    </div>
  );
};

export default Column;
