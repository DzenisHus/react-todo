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

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item: any) => {
        onEditTask(item.id, item.title, column.type, item, "before");
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [column]
  );

  console.log(columnTasks, "columnTasks");

  if (columnTasks.length === 0) {
    return (
      <div className="column-wrapper min-w-250 w-full flex flex-col rounded-md overflow-hidden">
        <h2 className="bg-slate-400 p-2 bg-zinc-900 text-slate-50	">
          {column.title}
        </h2>
        <div className="column flex flex-col items-auto justify-center p-2 bg-zinc-600 shadow-lg ">
          <p className="text-error mt-3 text-base	text-gray-200">
            Nothing to display here yet.
          </p>

          <div
            ref={drop}
            className={`h-24 w-100 overlay ${isOver ? "hover-overlay" : ""}`}
          >
            <div className="overlay-wrapper"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="column-wrapper min-w-250 w-full flex flex-col rounded-md overflow-hidden">
      <h2 className="bg-slate-400 p-2 bg-zinc-900 text-slate-50	">
        {column.title}
      </h2>
      <div className="column flex flex-col items-auto justify-center p-2 bg-zinc-600 shadow-lg ">
        {columnTasks.map((task) => (
          <div className="task-wrapper" key={task.id}>
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
      </div>
    </div>
  );
};

export default Column;
