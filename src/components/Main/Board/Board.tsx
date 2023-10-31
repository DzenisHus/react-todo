import React from "react";
import Column from "../Column/Column";

interface BoardProps {
  columns: {
    id: string;
    type: string;
    title: string;
    taskIds: string[];
  }[];
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

const Board: React.FC<BoardProps> = ({ columns, tasks, onEditTask }) => {
  return (
    <div className="board flex flex-row gap-4 justify-between h-full overflow-auto">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={tasks}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default Board;
