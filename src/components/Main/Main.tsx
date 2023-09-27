import React, { useState } from 'react';
import Board from './Board/Board';
import tasksData from '../../Data/tasksData.tsx';

const Main: React.FC = () => {
  const [tasks, setTasks] = useState(tasksData);

  const handleTaskEdit = (id: string, title: string, status: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title,
          status,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const statuses = Array.from(new Set(tasks.map((task) => task.status)));

  const columns = statuses.map((status) => ({
    id: `column-${status}`,
    title: status,
    taskIds: tasks.filter((task) => task.status === status).map((task) => task.id),
  }));

  return (
    <main className="flex flex-col container mx-auto p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Main Content</h2>
      <Board columns={columns} tasks={tasks} onEditTask={handleTaskEdit} />
    </main>
  );
};

export default Main;