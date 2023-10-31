import React from "react";
import { useDrop } from "react-dnd";
import "./../overlay.scss";

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
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item: { id: string; title: string }) => {
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
      className={`h-24 w-100 overlay ${overlayPosition} ${
        isOver ? "hover-overlay" : ""
      }`}
    >
      <div className="overlay-wrapper"></div>
    </div>
  );
};

export default Column;
