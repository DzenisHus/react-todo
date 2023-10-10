import React, { useEffect, useState } from "react";
import Board from "./Board/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { dataTasks } from "../../Data/data-tasks.json";
import { dataColumns } from "../../Data/data-columns.json";

export interface Task {
  id: string;
  title: string;
  status: string;
}

export interface Column {
  id: string;
  type: string;
  title: string;
  taskIds: string[];
}

const tasksDefault: Task[] = dataTasks;
const columnsDefault: Column[] = dataColumns;

const Main: React.FC = () => {
  const [tasks, setTasks] = useState(tasksDefault);

  const handleTaskEdit = (
    id: string,
    title: string,
    status: string,
    closestTask: any,
    overlayPosition: string
  ) => {
    setTasks((prevTasks) => {
      let updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title,
            status,
          };
        }
        return task;
      });

      console.log(updatedTasks, "updatedTasks");

      // return updatedTasks if don't need to move the task;
      if (!closestTask) return updatedTasks;

      const currentIndex = prevTasks.findIndex((task) => task.id === id);
      const closestIndex = prevTasks.findIndex(
        (task) => task.id === closestTask.id
      );

      const [currentTask] = updatedTasks.splice(currentIndex, 1); // Remove the item from the original position

      if (overlayPosition === "top") {
        updatedTasks.splice(closestIndex - 1, 0, currentTask);
      } else {
        updatedTasks.splice(closestIndex + 1, 0, currentTask);
      }

      return updatedTasks;
    });
  };

  return (
    <main className="flex flex-col container mx-auto p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Main Content</h2>
      <DndProvider backend={HTML5Backend}>
        <Board
          columns={columnsDefault}
          tasks={tasks}
          onEditTask={handleTaskEdit}
        />
      </DndProvider>
    </main>
  );
};

export default Main;
