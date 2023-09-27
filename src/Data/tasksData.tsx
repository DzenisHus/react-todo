export interface Task {
  id: string;
  title: string;
  status: string;
}

const tasksData: Task[] = [
  {
    id: "task-1",
    title: "Task 1",
    status: "To Do",
  },
  {
    id: "task-2",
    title: "Task 2",
    status: "To Do",
  },
  {
    id: "task-3",
    title: "Task 3",
    status: "To Do",
  },
  {
    id: "task-4",
    title: "Task 4",
    status: "In Progress",
  },
  {
    id: "task-5",
    title: "Task 5",
    status: "In Progress",
  },
  {
    id: "task-6",
    title: "Task 6",
    status: "Done",
  },
];

export default tasksData;
