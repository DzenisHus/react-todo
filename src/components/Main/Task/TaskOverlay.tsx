import React from "react";
import { useDrop } from "react-dnd";

interface ColumnProps {
  column: {
    id: string;
    type: string;
    title: string;
    taskIds: string[];
  };
  task: {
    id: string;
    title: string;
    status: string;
  };

  onEditTask: (
    id: string,
    title: string,
    status: string,
    closestTask: any,
    overlayPosition: string
  ) => void;

  overlayPosition: string;
}

const Column: React.FC<ColumnProps> = ({
  column,
  task,
  onEditTask,
  overlayPosition,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item: { id: string; title: string }, monitor) => {
        onEditTask(item.id, item.title, column.type, task.id, overlayPosition);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [column]
  );

  return (
    <div
      ref={drop}
      data-overlay-position={overlayPosition}
      className={`h-24 w-100 ${isOver ? "bg-red-500" : "bg-white"}`}
    ></div>
  );
};

export default Column;
