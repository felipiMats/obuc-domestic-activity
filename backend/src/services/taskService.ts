import { Task, createTask, updateTask, getTasks, getTaskById, deleteTask } from '../models/taskModel';

export const addTask = async (task: Task) => {
  await createTask(task);
};

export const modifyTask = async (id: number, task: Task) => {
  await updateTask(id, task);
};

export const fetchTasks = async (status?: string) => {
  return await getTasks(status);
};

export const fetchTaskById = async (id: number) => {
  return await getTaskById(id);
};

export const removeTask = async (id: number) => {
  await deleteTask(id);
};
